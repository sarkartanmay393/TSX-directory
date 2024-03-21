import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Providers } from "./providers";
import Sidebar from "~/components/sidebar/Sidebar";
import { cn } from "~/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TSX Chats",
  description: "Generated by create turbo",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props): JSX.Element {
  return (
    <html lang="en">
      <body className={cn("overflow-hidden", fontSans.className)}>
        <Providers>
          <main className="flex min-h-screen w-screen">
            <Sidebar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}