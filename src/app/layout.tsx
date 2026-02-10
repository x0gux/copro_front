import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import MobileBlocker from "@/components/MobileBlocker";
import EmotionRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "CoPro Dashboard",
  description: "Copro Status Monitoring and Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <EmotionRegistry>
          <MobileBlocker>
            <Header />
            <main style={{ paddingTop: '110px', height: '100vh', width: '100vw', overflow: 'auto' }}>
              {children}
            </main>
          </MobileBlocker>
        </EmotionRegistry>
      </body>
    </html>
  );
}
