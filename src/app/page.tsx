'use client';

import styled from '@emotion/styled';
import Card from '@/components/Card';

export default function Home() {
  return (
    <DashboardContainer>
      <Grid>
        {/* Environment Sensor Summary - Large Span */}
        <SensorSummary title="환경센서 요약">
          <ChartPlaceholder>
             <Legend>
                <LegendItem><Dot style={{ backgroundColor: '#6366f1' }} /> 조도</LegendItem>
                <LegendItem><Dot style={{ backgroundColor: '#10b981' }} /> 염도</LegendItem>
                <LegendItem><Dot style={{ backgroundColor: '#ef4444' }} /> 수온</LegendItem>
             </Legend>
             <GraphContainer>
                <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gradient-blue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,80 Q100,60 200,100 T400,120 T600,80 T800,110" stroke="#6366f1" fill="none" strokeWidth="2.5" />
                  <path d="M0,150 Q120,130 240,140 T480,110 T720,130 T800,120" stroke="#10b981" fill="none" strokeWidth="2.5" />
                  <path d="M0,130 Q150,150 300,120 T600,140 T800,90" stroke="#ef4444" fill="none" strokeWidth="2.5" />
                </svg>
                <XAxis>
                  <span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>24:00</span>
                </XAxis>
             </GraphContainer>
          </ChartPlaceholder>
        </SensorSummary>

        {/* Coral Health Status - Vertical List */}
        <HealthStatus title="상태 로그">
          <StatusList>
            <StatusListItem>
              <StatusTime>PM 10:24</StatusTime>
              <StatusText>현재 산호건강 - 정상 판정</StatusText>
            </StatusListItem>
            <StatusListItem>
              <StatusTime>PM 10:20</StatusTime>
              <StatusText>LED 자동 조절 모드 활성화</StatusText>
            </StatusListItem>
            <StatusListItem>
              <StatusTime>PM 09:45</StatusTime>
              <StatusText>수온 안정화 완료 (25.4°C)</StatusText>
            </StatusListItem>
          </StatusList>
        </HealthStatus>

        {/* LED Management */}
        <LedManagement title="제어 센터">
          <LedButtons>
             <LedButton active>AUTO 모드 ON</LedButton>
             <LedButton>LED 수동 조절</LedButton>
          </LedButtons>
        </LedManagement>

        {/* Small Bottom Row Cards */}
        <BottomCard title="산호 상태">
          <BigValueContainer>
            <StatusBadge>Good</StatusBadge>
            <BigValue>정상</BigValue>
          </BigValueContainer>
        </BottomCard>

        <BottomCard title="LED 출력">
          <BigValueContainer>
            <BigValue>82<Unit>%</Unit></BigValue>
            <SubInfo>조도: 1200 lux</SubInfo>
          </BigValueContainer>
        </BottomCard>

        <BottomCard title="영양염류 분사">
          <BigValueContainer>
            <BigValue>대기</BigValue>
            <SubInfo>다음 분사: 02:00</SubInfo>
          </BigValueContainer>
        </BottomCard>
      </Grid>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  padding: 40px 60px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(160px, auto);
  gap: 24px;
  flex: 1;
`;

const SensorSummary = styled(Card)`
  grid-column: span 8;
  grid-row: span 2;
`;

const HealthStatus = styled(Card)`
  grid-column: span 4;
  grid-row: span 2;
`;

const LedManagement = styled(Card)`
  grid-column: span 3;
  grid-row: span 1;
`;

const BottomCard = styled(Card)`
  grid-column: span 3;
  height: 180px;
`;

const ChartPlaceholder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  margin-top: 10px;
`;

const Legend = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-bottom: 20px;
`;

const LegendItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;

const GraphContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const XAxis = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
  padding: 0 10px;
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 10px;
`;

const StatusListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatusTime = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
`;

const StatusText = styled.span`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const LedButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  justify-content: center;
`;

const LedButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? '#00827f' : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${props => props.active ? '#00827f' : 'rgba(255, 255, 255, 0.1)'};
  color: #ffffff;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    background: ${props => props.active ? '#00a5a2' : 'rgba(0, 130, 127, 0.2)'};
    border-color: #00827f;
  }
`;

const BigValueContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BigValue = styled.div`
  font-size: 40px;
  font-weight: 200;
  color: #ffffff;
  letter-spacing: -1px;
`;

const Unit = styled.span`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 4px;
`;

const SubInfo = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
  font-weight: 300;
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  font-size: 14px;
  font-weight: 400;
`;
