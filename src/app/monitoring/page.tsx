'use client';

import styled from '@emotion/styled';
import useSWR from 'swr';
import { getMonitoring } from '@/api/monitoring';
import Card from '@/components/Card';
import { Eye, Settings } from 'lucide-react';



export default function Monitoring() {

  const { data, error, isLoading } = useSWR('get-monitoring', getMonitoring, {
    refreshInterval: 5000
  });

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingText>데이터를 불러오는 중...</LoadingText>
      </LoadingWrapper>
    );
  }

  const monitoringData = Array.isArray(data) ? data[0] : data;

  console.log(monitoringData)

  return (
    <MonitoringContainer>
      <TitleSection>
        <h1>수조 실시간 모니터링</h1>
        <p>현장 카메라와 센서 데이터를 통해 수조의 상태를 실시간으로 확인합니다.</p>
      </TitleSection>

      <Grid>

        <LiveViewWrapper>
        {/* Live Video View */}
        <LiveView title="Live View">
          <VideoArea>
            <VideoOverlay>
              <RecDot />
              <span style={{ fontSize: '12px', fontWeight: '300' }}>REC / LIVE CAM 01</span>
            </VideoOverlay>
            <Eye size={48} color="rgba(255,255,255,0.1)" />
            <span style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '200' }}>
              2026.02.10 20:18:45
            </span>
          </VideoArea>
        </LiveView>

        {/* Detailed Sensors */}
        <SensorGrid>

          <SensorItem>
            <SensorLabel>조도</SensorLabel>
            <SensorValue>2.5<SensorUnit>cds</SensorUnit></SensorValue>
          </SensorItem>
        </SensorGrid>

      </LiveViewWrapper>

        {/* Action Controls */}
        <Controls title="실시간 제어">
          <ControlButtons>
            <Btn primary>스크린샷 촬영</Btn>
            <Btn>녹화 시작</Btn>
            <Btn>피딩 모드</Btn>
            <Btn>긴급 중지</Btn>
            <Btn style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={16} /> 설정
            </Btn>
          </ControlButtons>
        </Controls>
      </Grid>
    </MonitoringContainer>
  );
}

const MonitoringContainer = styled.div`
  padding: 40px 60px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
`;

const TitleSection = styled.div`
  margin-bottom: 32px;

  h1 {
    font-size: 32px;
    font-weight: 200;
    color: #ffffff;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 300;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-direction : column;
  gap: 24px;
  flex: 1;
`;

const LiveViewWrapper = styled.div`
  flex : 1;
  display : flex;
  flex-direction : row;
  gap : 24px;
  `

const LiveView = styled(Card)`
  width : 100%;
  height : 60vh;
`;

const VideoArea = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(4px);
`;

const RecDot = styled.div`
  width: 10px;
  height: 10px;
  background: #ef4444;
  border-radius: 50%;
  animation: blink 1s infinite;

  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0.3; }
    100% { opacity: 1; }
  }
`;

const SensorGrid = styled.div`
  width : 30%;
  height : 60vh;
`;

const SensorItem = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease;

  width : 100%;
  height : 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const SensorLabel = styled.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
  font-weight: 300;
`;

const SensorValue = styled.span`
  font-size: 24px;
  font-weight: 200;
  color: #ffffff;
`;

const SensorUnit = styled.span`
  font-size: 14px;
  opacity: 0.5;
  margin-left: 2px;
`;

const Controls = styled(Card)`
  grid-column: span 12;
  margin-top: 24px;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px 0;
`;

const Btn = styled.button<{ primary?: boolean }>`
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.primary ? '#00827f' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.primary ? '#00827f' : 'rgba(255, 255, 255, 0.1)'};
  color: #ffffff;

  &:hover {
    background: ${props => props.primary ? '#00a5a2' : 'rgba(255, 255, 255, 0.1)'};
  }
`;



const LoadingWrapper = styled.div`
  display: flex;
  height: calc(100vh - 110px);
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 300;
`;