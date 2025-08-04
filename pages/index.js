import { useState, useEffect } from "react";
import Head from "next/head";
import LoadingScreen from "@/components/Homepage/LoadingScreen";
import HeroSection from "@/components/Homepage/HeroSection";
import Layout from "@/components/Layout/Layout";
import AboutUsSection from "@/components/Homepage/AboutSection";
import ServicesSection from "@/components/Homepage/ServiceSection";
import FAQSection from "@/components/Homepage/FaqSection";
import FlagsSection from "@/components/Homepage/FlagSection";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loading animation duration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Handle hash navigation when coming from other pages
  useEffect(() => {
    if (!loading && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [loading]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
    <Layout>


      <Head>
        <title>EssploreAboard - Study Abroad Excellence</title>
        <meta
          name="description"
          content="Your trusted partner for study abroad programs worldwide. Expert guidance for university selection, visa assistance, and international education."
        />
        <meta
          name="keywords"
          content="study abroad, international education, university selection, visa guidance, student counseling"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph tags for social media */}
        <meta
          property="og:title"
          content="EssploreAboard - Study Abroad Excellence"
        />
        <meta
          property="og:description"
          content="Your trusted partner for study abroad programs worldwide"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://essploreaboard.com" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="EssploreAboard - Study Abroad Excellence"
        />
        <meta
          name="twitter:description"
          content="Your trusted partner for study abroad programs worldwide"
        />
      </Head>

      {/* All Homepage Sections */}
      <HeroSection />
      <FlagsSection/>
      <AboutUsSection/>
      <ServicesSection/>
      <FAQSection/>
          </Layout>
    </>
  );
}
