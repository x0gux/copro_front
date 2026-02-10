'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <StyledCard className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

const CardHeader = styled.div`
  padding: 18px 24px;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
`;

const CardContent = styled.div`
  flex: 1;
  padding: 0 24px 24px 24px;
  display: flex;
  flex-direction: column;
`;
