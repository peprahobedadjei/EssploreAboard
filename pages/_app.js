import "@/styles/globals.css";
import { Red_Hat_Display } from 'next/font/google'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-red-hat-display',
})

export default function App({ Component, pageProps }) {
  return (
    <div className={`${redHatDisplay.variable} ${redHatDisplay.className}`}>
      <Component {...pageProps} />
    </div>
  );
}