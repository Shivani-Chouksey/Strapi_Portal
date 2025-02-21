import React from "react";

import { Metadata } from "next";
import Newslist from "@/components/news";
export const metadata: Metadata = {
  title: "News Page | NextCommerce Nextjs E-commerce template",
  description: "This is News Page for NextCommerce Template",
  // other metadata
};

const News = () => {
  return (
    <main>
      <Newslist />
    </main>
  );
};

export default News;
