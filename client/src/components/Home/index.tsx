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
  const [homePageAllDynamicData, setHomePageAllDynamicData] = useState();
  const BaseUrl =
    "http://localhost:1337/api/home-page?locale=hi&populate[product_section][populate][products][populate][1]=product_images&populate[category_section][populate][0]=categories&populate[hero_banners][populate][0]=cover_images&populate[hero_banners][populate][1]=button&populate[hero_banners][populate][2]=available_offer&populate[advertising_banner][populate][0]=images&populate[advertising_banner][populate][1]=button&populate[advertising_banner][populate][3]=available_offer";

  const getApiData = async () => {
    try {
      const responseData = await axios.get(BaseUrl);
      console.log("API Response Data", responseData);
      setHomePageAllDynamicData(responseData.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);
  console.log("homePageAllDynamicData", homePageAllDynamicData);

  return (
    <main>
      <Hero heroBannerData={homePageAllDynamicData?.hero_banners} />
      <Categories category_section={homePageAllDynamicData?.category_section} />
      <NewArrival />
      <PromoBanner />
      <BestSeller />
      <CounDown />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
