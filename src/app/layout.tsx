import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Criação de Conteúdo com IA — Crie 30 Dias de Conteúdo em 2 Horas | Maestros da IA",
  description: "Sistema completo de 14 aulas para automatizar sua criação de conteúdo com IA. De 20h/semana para 2h. Usado por +500 alunos.",
  openGraph: {
    title: "Criação de Conteúdo com IA — Crie 30 Dias de Conteúdo em 2 Horas | Maestros da IA",
    description: "Sistema completo de 14 aulas para automatizar sua criação de conteúdo com IA. De 20h/semana para 2h. Usado por +500 alunos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1207609257732261');
            fbq('track', 'PageView');
            fbq('track', 'ViewContent');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1207609257732261&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)]">{children}</body>
    </html>
  );
}
