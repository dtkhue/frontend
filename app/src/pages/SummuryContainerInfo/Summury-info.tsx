import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Head from "next/head";
import SummaryContainer  from "@/components/SummuryContainer/SummuryContainer";
export default function SummaryInfo(): any {
    const router = useRouter();
    const ticker = router.query.ticker;
    const keywords = ticker
        ? [
            `${ticker} stock price`,
            `${ticker} market cap`,
            `${ticker} financials`,
            `${ticker} earnings`,
            `${ticker} stock analysis`,
            `${ticker} trading`,
        ]
        : [];
    return (
        <>
            <Head>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-37TGZ3H0PC"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-37TGZ3H0PC');
          `,
                    }}
                />
                <meta
                    name="description"
                    content={`View detailed stock information for ${ticker} on Nessight.com. Get the latest stock price, financials, earnings, and more.`}
                />
                <title>Stock Dashboard for {ticker}</title>
                <link rel="icon" sizes="1280x1024" href="/IconOnly_Transparent.png" />
                <link
                    rel="shortcut icon"
                    sizes="1280x1024"
                    href="/IconOnly_Transparent.png"
                />
                <meta name="keywords" content={keywords.join(", ")} />
            </Head>
            <Box>
                <SummaryContainer id={1} />
            </Box>
        </>
    );
}
