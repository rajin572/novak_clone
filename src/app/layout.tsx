import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


export const clashDisplay = localFont({
  src: [
    {
      path: "./fonts/ClashDisplay-Extralight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/ClashDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Novak",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${clashDisplay.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}