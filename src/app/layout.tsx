import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";

// Font principale : Space Grotesk
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "700"], // poids que tu veux utiliser
  preload: true,
});

// Font monospace : JetBrains Mono pour code
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
  preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
