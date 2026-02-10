'use client';

import React from 'react';
import styled from '@emotion/styled';
import { Smartphone } from 'lucide-react';

export default function MobileBlocker({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <Overlay>
        <Content>
          <Smartphone size={64} color="#00827f" />
          <Title>PC에서 접속해주세요</Title>
          <Description>
            CoPro 대시보드는 최상의 경험을 위해 PC 환경에 최적화되어 있습니다.<br />
            모바일 기기에서의 접속은 지원하지 않습니다.
          </Description>
        </Content>
      </Overlay>
    );
  }

  return <>{children}</>;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 200;
  color: #ffffff;
`;

const Description = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  line-height: 1.6;
`;
