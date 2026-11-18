
import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getDesignTheme } from './theme/theme.ts'
import { useAppSelector } from './hooks/ReduxHooks.ts'
import { Provider } from 'react-redux'
import { store } from './Store.ts'
import "./i18n.ts"
import { useTranslation } from 'react-i18next'
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
// @ts-expect-error stylis does not provide type declarations
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { BrowserRouter } from "react-router-dom";

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
const cacheLtr = createCache({
  key: 'muiltr',
});
export function MainRoot() {
  const { i18n } = useTranslation()
  const mode = useAppSelector((state) => state.theme.mode)
  const isRtl = i18n.language?.startsWith('fa');
  const langDir = isRtl ? 'rtl' : 'ltr';
  const theme = useMemo(() => getDesignTheme(mode, langDir), [mode, langDir])
  return (
    <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MainRoot />
    </Provider>
  </StrictMode>,
);