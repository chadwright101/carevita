import type { Metadata } from "next";

import { Raleway } from "next/font/google";
import Script from "next/script";
import classNames from "classnames";

const ralewaySansSerif = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

import "@/_styles/globals.css";
import Header from "@/_components/navigation/header";
import Footer from "@/_components/navigation/footer";
import RecaptchaProvider from "@/_components/providers/recaptcha-provider";
import { getFacilityNavigation } from "@/_actions/facilities-actions";
import { getSessionUserId } from "@/_lib/auth-utils";
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOGO,
  SITE_DESCRIPTION,
} from "@/_lib/utils/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Home - CareVita",
  description:
    "CareVita was founded in 2018 with the main purpose of breathing new life into the Retirement Management Sector.",
  keywords:
    "CareVita, Retirement, retirement home, frail care, elderly care, caregiving, nursing, nursing services, supporting services, catering services, retirement estate",
  openGraph: {
    description:
      "CareVita was founded in 2018 with the main purpose of breathing new life into the Retirement Management Sector.",
    type: "website",
    locale: "en_ZA",
    siteName: "CareVita",
    images: [
      {
        url: "/assets/media/the-crescent/9U7A6283.jpg",
      },
      {
        url: "/assets/media/eastlands/9U7A4326-HDR.jpg",
      },
      {
        url: "/assets/media/parsonage-street/DJI_0514.jpg",
      },
    ],
  },
  other: {
    "facebook-domain-verification": "m2bh2tsg7f7wsnxeou4akbund5fdcd",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [facilities, userId] = await Promise.all([
    getFacilityNavigation(),
    getSessionUserId(),
  ]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${SITE_LOGO}`,
    description: SITE_DESCRIPTION,
  };

  return (
    <html lang="en">
      <body className={classNames(ralewaySansSerif.className, "antialiased")}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MVVC8T54"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MVVC8T54');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <RecaptchaProvider>
          <Header facilities={facilities} isLoggedIn={!!userId} />
          {children}
          <Footer isLoggedIn={!!userId} />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
