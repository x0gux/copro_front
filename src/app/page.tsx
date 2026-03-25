'use client';

import useSWR from 'swr';
import styled from '@emotion/styled';
import { getStatus } from '@/api/dashboard';
import MonitoringCard from '../components/dashboard/MonitoringCard';

export default function Home() {
  const { data, error, isLoading } = useSWR('get-status', getStatus, {
    refreshInterval: 5000
  });

  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingText>데이터를 불러오는 중...</LoadingText>
      </LoadingWrapper>
    );
  }

  const statusData = Array.isArray(data) ? data[0] : data;

  return (
    <DashboardContainer>
      <Grid>
        <MonitoringCard 
          title="LED상태" 
          status={statusData?.led == 1 ? '작동중' : '정지'} 
        />
        <MonitoringCard 
          title="AI 판단 상태" 
          status={statusData?.ai == 1 ? '건강' : '백탁현상발생'} 
        />
        <MonitoringCard 
          title="칼슘 분사 상태" 
          status={statusData?.cal == 1 ? '분사중' : '미분사'} 
        />
      </Grid>

      <SecondGrid>

        <MonitoringCard 
          title="LED 값" 
          value={statusData?.led_val || '82'} 
          unit="%"
        />
        <MonitoringCard 
          title="남아있는 칼슘량" 
          value={statusData?.lux_val || '1200'} 
          unit="lux"
        />
        </SecondGrid>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  gap : 24px;
  padding: 40px 60px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 32px;
  flex: 1;
`;

const SecondGrid = styled.div`
  flex : 1 ;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap : 32px;
  
`

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
