import './globals.css';
import { Inter } from 'next/font/google';
import { WaitlistProvider } from './components/WaitlistModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'BuyUnrepped - Home Buying Built for the Buyer',
  description: 'The complete platform for Tennessee buyers to acquire homes directly from sellers. Save the 3% commission.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        <WaitlistProvider>
          {children}
        </WaitlistProvider>
      </body>
    </html>
  );
}
