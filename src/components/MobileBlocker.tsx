'use client';

import { useEffect, useState } from 'react';
import styles from './MobileBlocker.module.css';
import { Smartphone } from 'lucide-react';

export default function MobileBlocker({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Block for width less than 1024px
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.overlay}>
        <div className={styles.content}>
          <Smartphone size={64} color="#00827f" />
          <h1 className={styles.title}>PC에서 접속해주세요</h1>
          <p className={styles.description}>
            CoPro 대시보드는 최상의 경험을 위해 PC 환경에 최적화되어 있습니다.<br />
            모바일 기기에서의 접속은 지원하지 않습니다.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
