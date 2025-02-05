import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Award Winning Website",
  description: "Created with the help of Frontend Tribe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
