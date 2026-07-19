export const metadata = {
  title: 'About BuyUnrepped | Nashville Broker Kayla Brown',
  description: 'BuyUnrepped was founded by Kayla Brown, a licensed Nashville Principal Broker trusted since 2017 who has guided 185+ transactions from contract to close. Learn how we help Tennessee buyers purchase homes without a traditional buyer\'s agent.',
  openGraph: {
    title: 'About BuyUnrepped | Nashville Broker Kayla Brown',
    description: 'Founded by a Nashville Principal Broker with 9+ years of experience. Learn how BuyUnrepped helps Tennessee buyers purchase homes on their own terms.',
    url: 'https://www.buyunrepped.com/about',
    images: [
      {
        url: 'https://www.buyunrepped.com/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'BuyUnrepped - Home Buying Built for the Buyer',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.buyunrepped.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
