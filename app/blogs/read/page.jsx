import BlogPostPage from '@/src/page-components/BlogPostPage';

/* Shell for /blogs/<slug>/ (served through blog-post.php, .htaccess rule 4b, which writes the real title, description,
   canonical and JSON-LD into it and sends noindex for unknown posts). The post itself is fetched client-side.
   No robots tag here on purpose: a noindex in the shell would be inherited by every post. /blogs/read/ itself is disallowed in robots.txt. */
export const metadata = {
  title: 'Blog - WealthNX',
};

export default BlogPostPage;
