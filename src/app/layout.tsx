import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fluxium",
  description: "Two engineers. Six years of shipping code. Zero fluff. From healthcare platforms to AI integrations, we build digital solutions that scale.",
  keywords: ["software agency", "web development", "mobile apps", "AI integration", "healthcare tech", "React", "Node.js", "Next.js"],
  authors: [{ name: "Fluxium" }],
  creator: "Fluxium",
  publisher: "Fluxium",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fluxium.dev",
    title: "Fluxium",
    description: "Two engineers. Six years of shipping code. Zero fluff.",
    siteName: "Fluxium",
    images: [
      {
        url: "https://res.cloudinary.com/dizbrnm2l/image/upload/v1752674061/Fluxium-logo_hb7vp8.png",
        width: 1200,
        height: 630,
        alt: "Fluxium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluxium",
    description: "Two engineers. Six years of shipping code. Zero fluff.",
    images: ["https://res.cloudinary.com/dizbrnm2l/image/upload/v1752674061/Fluxium-logo_hb7vp8.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-space-void text-white min-h-screen" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
