import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { NextAuthProvider } from "@/providers/session-provider";
import { headers } from "next/headers";
import { PusherProvider } from "@/providers/pusher-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextAuthProvider>
          <PusherProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <main className="min-h-screen bg-background">{children}</main>
              <Toaster />
            </ThemeProvider>
          </PusherProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
