import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Four Horsemen Fantasy World Cup",
  description: "Live fantasy World Cup leaderboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav
          style={{
            backgroundColor: "#111",
            borderBottom: "2px solid gold",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "gold",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            🏆 Four Horsemen Fantasy World Cup
          </div>

          <div
            style={{
              display: "flex",
              gap: "24px",
            }}
          >
            <a
              href="/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Leaderboard
            </a>

            <a
              href="/countries"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Countries
            </a>

            <a
              href="/matches"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Matches
            </a>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
