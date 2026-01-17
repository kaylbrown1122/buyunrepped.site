import './globals.css';
import { Inter, Merriweather } from 'next/font/google';
import { WaitlistProvider } from './components/WaitlistModal';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather'
});

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
      <body className={`${inter.variable} ${merriweather.variable} font-sans`} suppressHydrationWarning>
        <WaitlistProvider>
          {children}
        </WaitlistProvider>
      </body>
    </html>
  );
}
