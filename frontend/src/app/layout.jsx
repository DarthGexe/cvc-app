import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CVC Data Processor",
  description: "An app to process data from League of Kingdoms CVC",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="container mx-auto px-4">
            <header className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <img
                  src="/logo.png"
                  alt="League of Kingdoms Logo"
                  width={180}
                  height={37}
                  className="dark:filter "
                />
                <h1 className="text-2xl font-bold">CVC Data Processor</h1>
              </div>
              <ModeToggle />
            </header>
            <main className="py-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



{/*import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "cvc data processor",
  description: "An app to process data from league of kingdoms CVC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <center>
          <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/logo.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
          </center>
        {children}
      </body>
    </html>
  );
}*/}
