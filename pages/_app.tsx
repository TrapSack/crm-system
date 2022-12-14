import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { resetServerContext } from "react-beautiful-dnd-next";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "@/config/styles/global";
import theme from "@/config/styles/theme";
import { ModalProvider } from "@/features/context/ModalContext";
import { wrapper } from "@/features/Redux/store";
import { Navbar } from "@/src/components";
import NotificationModal from "@/src/modal/NotificationModal";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  resetServerContext();

  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <GlobalStyles />
        <NextNProgress
          color={theme.colors.mainColor3}
          options={{ showSpinner: true }}
        />
        <div style={{ visibility: !mounted ? "hidden" : "visible" }}>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ModalProvider>
      <NotificationModal />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
