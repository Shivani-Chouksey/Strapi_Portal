"use client";
import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import PromoBanner from "./PromoBanner";
import BestSeller from "./BestSeller";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";
import axios from "axios";

const Home = () => {
  const [homePageAllData, setHomePageAllData] = useState();
  const BaseUrl = "http://localhost:1337/api/home-page?locale=en&populate=deep";

  // "http://localhost:1337/api/home-page?locale=hi&populate[product_section][populate][products][populate][1]=product_images&populate[category_section][populate][categories][populate][0]=cover_image&populate[hero_banners][populate][0]=cover_images&populate[hero_banners][populate][1]=button&populate[hero_banners][populate][2]=available_offer&populate[advertising_banner][populate][0]=images&populate[advertising_banner][populate][1]=button&populate[advertising_banner][populate][3]=available_offer&populate[other_sections][populate]=*";

  const getApiData = async () => {
    try {
      const responseData = await axios.get(BaseUrl);
      console.log("API Response Data", responseData);
      setHomePageAllData(responseData.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);
  console.log("homePageAllDynamicData", homePageAllData);

  return (
    <main>
      <Hero heroBannerData={homePageAllData?.hero_banners} />
      <Categories category_section={homePageAllData?.category_section} />
      <NewArrival product_section={homePageAllData?.product_section} />
      <PromoBanner advertising_banner={homePageAllData?.advertising_banner} />

      {/* <BestSeller /> */}
      {/* <CounDown /> */}
      {homePageAllData?.other_sections?.map((section, index) => {
        switch (section.__component) {
          case "testimonial.testimonial-section":
            return <Testimonials testinomials={section} />;

          default:
            return null; // Skip unknown sections
        }
      })}
      {/* <Newsletter /> */}
    </main>
  );
};

export default Home;
