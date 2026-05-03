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
  title: "Virtual and In-Home Physiotherapy in Ottawa | Virtual Physio.ca",
  description:
    "Virtual and in-home physiotherapy care for pain relief, rehabilitation and confident movement.",
  metadataBase: new URL("https://virtualphysio.ca"),
  openGraph: {
    title: "Virtual Physio.ca",
    description:
      "Book virtual physiotherapy, in-home treatment in Ottawa and guided recovery plans.",
    type: "website",
    url: "https://virtualphysio.ca",
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
