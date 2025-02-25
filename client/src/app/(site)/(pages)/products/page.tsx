import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Product Page | Strapi Portal",
  description: "This is Product Page | Strapi Portal",
  openGraph: {
    title: "Product Page | Strapi Portal",
    description: "This is Product Page | Strapi Portal",
  },
  // other metadata
};

const ShopWithSidebarPage = () => {
  return (
    <main>
      <ShopWithSidebar />
    </main>
  );
};

export default ShopWithSidebarPage;
