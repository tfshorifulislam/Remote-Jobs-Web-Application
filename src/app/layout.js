import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weights: ["400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title: "Find your Dream Remote Job | RemoteJobFinder",
  description: "Discover your ideal remote job with RemoteJobFinder. Explore a wide range of remote opportunities across various industries and find the perfect fit for your skills and lifestyle. Start your remote career journey today!",
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="max-w-7xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
