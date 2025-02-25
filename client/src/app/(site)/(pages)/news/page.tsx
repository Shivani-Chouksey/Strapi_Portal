import React from "react";

import { Metadata } from "next";
import Newslist from "@/components/pages/News";
export const metadata: Metadata = {
  title: "All News | Stapi Portal",
  description: "This is All News | Stapi Portal",
};

const News = () => {
  return (
    <main>
      <Newslist />
    </main>
  );
};

export default News;
