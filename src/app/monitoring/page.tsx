'use client';

import styled from '@emotion/styled';
import useSWR from 'swr';
import { useEffect, useRef, useState } from 'react';
import { getMonitoring } from '@/api/monitoring';
import Card from '@/components/Card';

const WS_URLS = [
  'wss://estimates-wrist-yesterday-miles.trycloudflare.com/ws',
  'ws://10.150.3.130:9999/ws',
];

type StreamStatus = 'connecting' | 'connected' | 'failed';

function useVideoStream() {
  const imgRef = useRef<HTMLImageElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<StreamStatus>('connecting');

  useEffect(() => {
    let blobUrl: string | null = null;
    let urlIndex = 0;
    let failCount = 0;

    function connect() {
      const url = WS_URLS[urlIndex % WS_URLS.length];
      setStatus('connecting');

      const ws = new WebSocket(url);
      ws.binaryType = 'blob';
      wsRef.current = ws;

      ws.onopen = () => {
        failCount = 0;
        setStatus('connected');
      };
      ws.onclose = () => {
        failCount++;
        urlIndex++;
        if (failCount >= WS_URLS.length * 2) {
          setStatus('failed');
          setTimeout(() => { failCount = 0; connect(); }, 10000);
        } else {
          setStatus('connecting');
          setTimeout(connect, 3000);
        }
      };
      ws.onerror = () => ws.close();

      ws.onmessage = (e) => {
        if (e.data instanceof Blob) {
          const prev = blobUrl;
          blobUrl = URL.createObjectURL(e.data);
          if (imgRef.current) imgRef.current.src = blobUrl;
          if (prev) URL.revokeObjectURL(prev);
        } else if (typeof e.data === 'string') {
          if (imgRef.current) imgRef.current.src = `data:image/jpeg;base64,${e.data}`;
        }
      };
    }

    connect();

    return () => {
      wsRef.current?.close();
      wsRef.current = null;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  return { imgRef, status };
}

export default function Monitoring() {
  const { data, isLoading } = useSWR('get-monitoring', getMonitoring, {
    refreshInterval: 5000,
  });

  const { imgRef, status } = useVideoStream();

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingText>데이터를 불러오는 중...</LoadingText>
      </LoadingWrapper>
    );
  }

  const monitoringData = Array.isArray(data) ? data[0] : data;
  console.log(monitoringData);

  return (
    <MonitoringContainer>
      <TitleSection>
        <h1>수조 실시간 모니터링</h1>
        <p>현장 카메라와 센서 데이터를 통해 수조의 상태를 실시간으로 확인합니다.</p>
      </TitleSection>

      <Grid>
        <LiveViewWrapper>
          <LiveView title="Live View">
            <VideoArea>
              <VideoOverlay>
                <RecDot $status={status} />
                <span style={{ fontSize: '12px', fontWeight: '300' }}>
                  {status === 'connected' ? 'REC / LIVE CAM 01' : status === 'failed' ? '연결 실패 — 재시도 중...' : '연결 중...'}
                </span>
              </VideoOverlay>
              {status === 'connected' && <VideoFeed ref={imgRef} alt="live feed" />}
              {status !== 'connected' && (
                <NoSignal>
                  {status === 'failed' ? '카메라 신호 없음' : '카메라 연결 중...'}
                </NoSignal>
              )}
            </VideoArea>
          </LiveView>

          <SensorGrid>
            <SensorItem>
              <SensorLabel>조도</SensorLabel>
              <SensorValue>
                2.5<SensorUnit>cds</SensorUnit>
              </SensorValue>
            </SensorItem>
          </SensorGrid>
        </LiveViewWrapper>
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
  flex-direction: column;
  gap: 24px;
  flex: 1;
`;

const LiveViewWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const LiveView = styled(Card)`
  width: 100%;
  height: 60vh;
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

const VideoFeed = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
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
  z-index: 10;
`;

const RecDot = styled.div<{ $status: StreamStatus }>`
  width: 10px;
  height: 10px;
  background: ${({ $status }) =>
    $status === 'connected' ? '#ef4444' : $status === 'failed' ? '#f97316' : '#888'};
  border-radius: 50%;
  animation: ${({ $status }) => ($status === 'connected' ? 'blink 1s infinite' : 'none')};

  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0.3; }
    100% { opacity: 1; }
  }
`;

const NoSignal = styled.div`
  color: rgba(255, 255, 255, 0.25);
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.05em;
`;

const SensorGrid = styled.div`
  width: 30%;
  height: 60vh;
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
  width: 100%;
  height: 100%;

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
