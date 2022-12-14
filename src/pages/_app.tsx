import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '@/theme';
import createEmotionCache from '@/createEmotionCache';
import Head from 'next/head';
import React from 'react';
import { Layout } from '@/components/Layout';
import { red } from '@mui/material/colors';
import { TableDensityProvider } from '@/contexts/TableDensity';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppProps | any) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
    responsiveFontSizes(createTheme({
        palette: {
          mode,
          ...(mode === "light"
          ? // light 
          {
            primary: {
              main: '#ff4400',
            },
            secondary: {
              main: '#19857b',
            },
            error: {
              main: red.A400,
            },
          }
          : //dark
          {
            primary: {
              main: '#ff4400',
            },
            secondary: {
              main: '#19857b',
            },
            error: {
              main: red.A400,
            },
          }
        )},
        // components: {
        //   MuiButton: {
        //     variants: [
        //       {
        //         props: { variant: 'contained' },
        //         style: {
        //           background: #ff4400,
        //         }
        //       }
        //     ],
        //   }
        // }
      })),
    [mode],
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <TableDensityProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </TableDensityProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>  
  )
}

import { withTRPC } from "@trpc/next";
import type { AppRouter } from "@/backend/router";

function getBaseUrl() {
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);