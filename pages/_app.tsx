import Footer from "@/components/navigation/footer";
import Header from "@/components/navigation/header";
import WindowWidthListener from "@/components/utils/window-width-listeners";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WindowWidthListener>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </WindowWidthListener>
    </>
  );
}
