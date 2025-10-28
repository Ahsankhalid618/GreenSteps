import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "GreenSteps - Track Your Eco-Friendly Actions",
  description:
    "Gamify your environmental impact with GreenSteps. Track, earn points, and make a difference for our planet.",
  keywords: [
    "environment",
    "sustainability",
    "eco-friendly",
    "carbon footprint",
    "green living",
  ],
  authors: [{ name: "GreenSteps Team" }],
  creator: "GreenSteps",
  publisher: "GreenSteps",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.ico",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://greensteps.app"),
  openGraph: {
    title: "GreenSteps - Track Your Eco-Friendly Actions",
    description:
      "Gamify your environmental impact with GreenSteps. Track, earn points, and make a difference for our planet.",
    url: "https://greensteps.app",
    siteName: "GreenSteps",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GreenSteps - Eco-Friendly Action Tracking",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenSteps - Track Your Eco-Friendly Actions",
    description:
      "Gamify your environmental impact with GreenSteps. Track, earn points, and make a difference for our planet.",
    images: ["/og-image.png"],
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
