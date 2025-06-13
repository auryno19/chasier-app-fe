import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Asap } from "next/font/google";
import "../globals.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import { ThemeProvider } from "../context/themeContext";
import Backdrop from "@/components/backdrop";
import { ToastProvider } from "../context/toastContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const asap = Asap({
  variable: "--font-asap",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "Dashboard | %s",
    default: "Dashboard",
  },
  description: "Chasier Application Dashboard by Auryno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${asap.variable} antialiased`}>
        <ThemeProvider>
          <ToastProvider>
            <Backdrop />
            <div className="flex p-3 flex-row gap-2">
              <Sidebar />
              <div className="flex flex-col w-full gap-2">
                <Navbar />
                <div className="px-6 py-4 w-full h-[85.5vh] text-slate-600 bg-sky-50 rounded-lg overflow-y-auto">
                  {children}
                </div>
              </div>
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
