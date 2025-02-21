import BlogDetails from "@/components/BlogDetails";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Blog Details Page for NextCommerce Template",
  // other metadata
};

const BlogDetailsPage = ({ params }) => {
  return (
    <main>
      <BlogDetails params={params} />
    </main>
  );
};

export default BlogDetailsPage;
