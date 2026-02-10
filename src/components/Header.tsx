'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <HeaderContainer>
      <Nav>
        <Brand>CoPro</Brand>
        <Tabs>
          <TabLink href="/monitoring" active={pathname === '/monitoring'}>
            모니터링
          </TabLink>
          <TabLink href="/" active={pathname === '/'}>
            대시보드
          </TabLink>
          <ActiveIndicator 
            atDashboard={pathname === '/'} 
          />
        </Tabs>
      </Nav>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 480px;
  height: 50px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 32px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  position: relative;
`;

const Brand = styled.div`
  font-size: 20px;
  font-weight: 200;
  color: #ffffff;
`;

const Tabs = styled.div`
  display: flex;
  gap: 16px;
  position: relative;
  height: 100%;
  align-items: center;
`;

const TabLink = styled(Link)<{ active?: boolean }>`
  font-size: 16px;
  font-weight: 200;
  color: #ffffff;
  z-index: 2;
  width: 130px;
  text-align: center;
  line-height: 50px;
  transition: color 0.3s ease;
`;

const ActiveIndicator = styled.div<{ atDashboard?: boolean }>`
  position: absolute;
  top: 2px;
  bottom: 2px;
  width: 160px;
  background: #00827f;
  border-radius: 23px;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.atDashboard ? 'translateX(146px)' : 'translateX(-14px)'};
`;
