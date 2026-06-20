import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DQueue Bot Manager',
  description: 'Manage and monitor DQueue Bots',
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
