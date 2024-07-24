import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MovieFlix",
  description: "A simple movie database",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <NextTopLoader showSpinner={false} speed={250} color="#e4d804" />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
