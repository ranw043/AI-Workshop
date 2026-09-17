import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ran Watari",
  description: "Ran Watari — exchange student at UH Manoa studying linguistics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
