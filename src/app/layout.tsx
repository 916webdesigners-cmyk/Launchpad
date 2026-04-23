import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";

export const metadata: Metadata = {
  title: "LaunchPad — Skip the setup. Build what actually matters.",
  description:
    "A repeatable infrastructure system for technical founders and agencies. Retain total creative freedom without rebuilding the same boilerplates.",
  keywords: ["web development", "infrastructure", "startup tools", "agency boilerplates", "LaunchPad"],
  openGraph: {
    title: "LaunchPad — A repeatable system for launching",
    description: "Don't let rigid site builders box in your creativity. Own your code, push to production in days, and get to revenue faster.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
