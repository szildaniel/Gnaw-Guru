import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const switzer = localFont({
  src: [
    {
      path: "../public/fonts/Switzer-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/Switzer-Light.woff2",
      weight: "300",
    },
    {
      path: "../public/fonts/Switzer-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/Switzer-Extralight.woff2",
      weight: "200",
    },
    {
      path: "../public/fonts/Switzer-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
});
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${switzer.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
