import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"

const font = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bank",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      <Toaster />
      </body>
    </html>
  );
}
