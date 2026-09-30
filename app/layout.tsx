
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JPP Casino Royal",
  description:
    "JPP Casino Royal — The Last Dance. Aqui é a sério: aposta-se células hepáticas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  );
}