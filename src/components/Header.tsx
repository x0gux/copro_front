'use client';

import styles from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.headerContainer}>
      <nav className={styles.nav}>
        <div className={styles.brand}>CoPro</div>
        <div className={styles.tabs}>
          <Link href="/monitoring" className={`${styles.tab} ${pathname === '/monitoring' ? styles.active : ''}`}>
            모니터링
          </Link>
          <Link href="/" className={`${styles.tab} ${pathname === '/' ? styles.active : ''}`}>
            대시보드
          </Link>
          <div className={`${styles.activeIndicator} ${pathname === '/' ? styles.atDashboard : styles.atMonitoring}`} />
        </div>
      </nav>
    </header>
  );
}
