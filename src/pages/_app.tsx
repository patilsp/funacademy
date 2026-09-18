import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { useEffect } from "react";

import { useBoundStore } from "~/hooks/useBoundStore";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const initTheme = useBoundStore((s) => s.initTheme);
  const sessionStatus = useBoundStore((s) => s.sessionStatus);
  const initSession = useBoundStore((s) => s.initSession);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  useEffect(() => {
    if (sessionStatus === "idle") {
      void initSession();
    }
  }, [sessionStatus, initSession]);

  return (
    <>
      <Head>
        <title>Fun Academy</title>
        <meta
          name="description"
          content="Fun Academy — a joyful, premium learning experience for curious young minds."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="manifest" href="/app.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
