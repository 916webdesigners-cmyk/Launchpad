import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaunchPad — Your Entire Website Build. One Intelligent Workflow.",
  description:
    "Tell us about your project. We'll generate a step-by-step workflow, skill guides, and markdown files tailored specifically to how you build.",
  keywords: ["web development", "workflow", "website builder", "developer tools", "LaunchPad"],
  openGraph: {
    title: "LaunchPad — One Intelligent Workflow",
    description: "Automate the heavy lifting from wireframe to deployment.",
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
      <body>{children}</body>
    </html>
  );
}
