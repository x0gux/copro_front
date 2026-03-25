'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface MonitoringCardProps {
  title: string;
  value?: string | number;
  unit?: string;
  status?: string;
  children?: ReactNode;
}

export default function MonitoringCard({ title, value, unit, status, children }: MonitoringCardProps) {
  return (
    <CardContainer>
      <Title>{title}</Title>
      <Content>
        {value !== undefined && (
          <Value>
            {value}
            {unit && <Unit>{unit}</Unit>}
          </Value>
        )}
        {status && <StatusBadge>{status}</StatusBadge>}
        {children}
      </Content>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
  margin-bottom: 20px;
  opacity: 0.8;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Value = styled.div`
  font-size: 36px;
  font-weight: 200;
  color: #ffffff;
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

const Unit = styled.span`
  font-size: 16px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
`;

const StatusBadge = styled.div`
  padding: 6px 16px;
  border-radius: 20px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
`;
