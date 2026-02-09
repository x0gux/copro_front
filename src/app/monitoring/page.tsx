import styles from '../page.module.css';

export default function Monitoring() {
  return (
    <div className={styles.dashboardContainer}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '300' }}>수조 실시간 모니터링</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>실시간 카메라 및 센서 데이터 상세 페이지입니다.</p>
        <div style={{ width: '100%', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>[ 모니터링 라이브 뷰 영역 ]</span>
        </div>
      </div>
    </div>
  );
}
