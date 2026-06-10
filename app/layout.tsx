import type { Metadata } from "next";

import { Raleway } from "next/font/google";
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <RecaptchaProvider>
          <Header facilities={facilities} isLoggedIn={!!userId} />
          {children}
          <Footer />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
