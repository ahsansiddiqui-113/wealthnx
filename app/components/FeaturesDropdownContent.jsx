'use client';

import Link from 'next/link';
import styles from './TopBar.module.css';
import { featureMenuGroups as groups } from '@/app/features/featureRegistry';

export default function FeaturesDropdownContent({ onClose }) {
  return <div className={styles.megaMenuContent}>
    <Link href="/features/" className={styles.megaAll} onClick={onClose}>View all features <span aria-hidden="true">→</span></Link>
    {groups.map((group) => <section className={styles.megaGroup} key={group.title} aria-label={group.title}>
      <div className={styles.megaSectionHeading}><span>{group.title}</span></div>
      <div className={styles.megaItems}>
        {group.items.map((item) => <Link href={item.href} key={item.slug} className={styles.megaItem} onClick={onClose}>
          <span className={styles.megaIcon} aria-hidden="true"><img src={item.icon} alt="" /></span>
          <span className={styles.megaItemCopy}>{item.label}</span>
        </Link>)}
      </div>
    </section>)}
  </div>;
}
