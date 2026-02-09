import Card from '@/components/Card';
import styles from './page.module.css';
import { Activity, Thermometer, Droplets, Zap, Waves, ActivitySquare } from 'lucide-react';

export default function Home() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.grid}>
        {/* Environment Sensor Summary - Large Span */}
        <Card title="환경센서 요약" className={styles.sensorSummary}>
          <div className={styles.chartPlaceholder}>
             {/* Simple visual representation for now as per instructions to focus on grid */}
             <div className={styles.legend}>
                <span className={styles.legendItem}><span className={styles.dot} style={{ backgroundColor: '#6366f1' }}></span> 조도</span>
                <span className={styles.legendItem}><span className={styles.dot} style={{ backgroundColor: '#10b981' }}></span> 염도</span>
                <span className={styles.legendItem}><span className={styles.dot} style={{ backgroundColor: '#ef4444' }}></span> 수온</span>
             </div>
             <div className={styles.graphContainer}>
                {/* SVG Graph for visual fidelity */}
                <svg width="100%" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
                  <path d="M0,80 L100,120 L200,60 L300,150 L400,130 L500,110" stroke="#6366f1" fill="none" strokeWidth="2" />
                  <path d="M0,150 L100,140 L200,130 L300,125 L400,120 L500,80" stroke="#10b981" fill="none" strokeWidth="2" />
                  <path d="M0,130 L100,145 L200,140 L300,110 L400,115 L500,160" stroke="#ef4444" fill="none" strokeWidth="2" />
                </svg>
                <div className={styles.xAxis}>
                  <span>0h</span><span>3h</span><span>6h</span><span>9h</span><span>12h</span><span>15h</span>
                </div>
             </div>
          </div>
        </Card>

        {/* Coral Health Status - Vertical List */}
        <Card title="산호건강 상태" className={styles.healthStatus}>
          <div className={styles.statusList}>
            <div className={styles.statusItem}>PM 10:24 현재 산호건강 - 정상</div>
            <div className={styles.statusItem}>PM 10:24 현재 산호건강 - 정상</div>
            <div className={styles.statusItem}>PM 10:24 현재 산호건강 - 정상</div>
          </div>
        </Card>

        {/* LED Management */}
        <Card title="LED 상태관리" className={styles.ledManagement}>
          <div className={styles.ledButtons}>
             <button className={styles.ledButton}>AUTO 관리 켜기</button>
             <button className={styles.ledButton}>LED 끄기</button>
          </div>
        </Card>

        {/* Small Bottom Row Cards */}
        <Card title="산호건강 상태" className={styles.bottomCard}>
          <div className={styles.bigText}>정상</div>
        </Card>

        <Card title="LED동작 상태" className={styles.bottomCard}>
          <div className={styles.bigText}>정상</div>
          <div className={styles.subText}>광량 82%</div>
        </Card>

        <Card title="칼슘 및 나트륨 상태" className={styles.bottomCard}>
          <div className={styles.bigText}>분사(0/1)</div>
        </Card>
      </div>
    </div>
  );
}
