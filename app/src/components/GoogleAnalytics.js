import Head from 'next/head';

const GoogleAnalyticsScript = () => (
  <Head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-37TGZ3H0PC"></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-37TGZ3H0PC');
        `
      }}
    />
  </Head>
);

export default GoogleAnalyticsScript;