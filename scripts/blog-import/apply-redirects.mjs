/* Put the generated redirects into the site's .htaccess (replaces the old "0c" blanket rule or a previous generated block).
   node scripts/blog-import/apply-redirects.mjs */
import fs from 'fs';

const block = fs.readFileSync('blog-import-out/redirects.htaccess', 'utf8').replace(/\r\n/g, '\n').trimEnd();
const raw = fs.readFileSync('.htaccess', 'utf8');
const crlf = raw.includes('\r\n');
let s = raw.replace(/\r\n/g, '\n');
const start = s.indexOf('    # >>> wordpress-blog-redirects');
const endMark = '    # <<< wordpress-blog-redirects';
if (start >= 0) {
  const end = s.indexOf(endMark, start) + endMark.length;
  s = s.slice(0, start) + block + s.slice(end);
} else {
  const old = '    RewriteRule ^blog(/.*)?$ /blogs/ [R=301,L]';
  if (!s.includes(old)) throw new Error('old 0c rule not found');
  s = s.replace(old, block);
}
fs.writeFileSync('.htaccess', crlf ? s.replace(/\n/g, '\r\n') : s);
console.log('.htaccess updated');
