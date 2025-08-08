// D:\web-dev\nextjs-tut\e-commerce\app\layout.js
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Header from './components/Header';
import Footer from './components/Footer';
import AuthProvider from './components/AuthProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StyleSphere | Trendy & Timeless Fashion for Everyone",
  description: "Discover the latest in fashion at StyleSphere. Shop curated collections of men's, women's, and kids' clothing designed for comfort, confidence, and everyday elegance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
