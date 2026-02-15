'use client'

import { siteConfig } from "@/config/site";
import Script from "next/script";

export function Analytics() {
    if (process.env.NODE_ENV !== 'production' || !siteConfig.googleAnalyticsId.startsWith('G-')) {
        return null;
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${siteConfig.googleAnalyticsId}', {
                        page_path: window.location.pathname,
                    });
                `,
                }}
            />
        </>
    );
}
