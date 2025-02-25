import React, { useEffect, useState } from "react";

import axios from "axios";
import Hero from "../Home/Hero";
import Categories from "../Home/Categories";
import NewArrival from "../Home/NewArrivals";
import PromoBanner from "../Home/PromoBanner";
import Testimonials from "../Home/Testimonials";

const Home = async ({ homePageAllData }) => {
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
