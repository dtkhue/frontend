import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Box from "@mui/material/Box";

import Head from "next/head";
import TickerCard from "@/components/TickerCard/TickerCard";
import { ButtonDownload } from "@/components/Button/ButtonDownload";

export default function TickerDashboard(): any {
  const ticker = "AAPL";
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
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          paddingTop: { xs: "56px", md: "100px" },
          paddingBottom: { xs: "56px", md: "100px" },
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "960px" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              mb: 5,
            }}
          >
            <SearchBar />
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "100%", maxWidth: "600px" }}>
              <TickerCard ticker={ticker} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
