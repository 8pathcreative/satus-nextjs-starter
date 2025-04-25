import React, { useEffect, useState } from 'react';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import type { PropsWithChildren } from 'react'
import { ReactTempus } from 'tempus/react'
import { GSAP } from '~/components/gsap'
import { RealViewport } from '~/components/real-viewport'
import { OrchestraTools } from '~/orchestra'
import AppData from '~/package.json'
import { themes } from '~/styles/colors'
import { fontsClassName } from '~/styles/fonts'

import '~/styles/css/index.css'

const APP_NAME = AppData.name
const APP_DEFAULT_TITLE = 'Satūs'
const APP_TITLE_TEMPLATE = '%s - Satūs'
const APP_DESCRIPTION = AppData.description
const APP_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' // Added fallback URL

const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || false
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || false

export const metadata: Metadata = {
  metadataBase: new URL(`${APP_BASE_URL}`),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',

    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: APP_BASE_URL,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: APP_DEFAULT_TITLE,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  authors: [
    { name: 'darkroom.engineering', url: 'https://darkroom.engineering' },
  ],
  other: {
    'fb:app_id': process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
  },
}

export const viewport: Viewport = {
  themeColor: themes.red.primary,
  colorScheme: 'normal',
}

export default function Layout({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <html
      lang="en"
      dir="ltr"
      className={fontsClassName}
      suppressHydrationWarning
      data-theme={theme}
    >
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <body>
        {/* Theme Toggle Button */}
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 50,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 24,
            color: 'var(--color-text, #222)'
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <RealViewport />
        {children}
        <OrchestraTools />
        <GSAP />
        {/* @ts-expect-error - TODO: Fix in tempus */}
        <ReactTempus patch />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
