import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BlogPage from "@/components/pages/Blog";

export async function generateMetadata() {
  return {
    title: "Blog Page",
    description: "Explore our latest blogs.",
    openGraph: {
      title: "All Blogs", // Title when shared on social media
      description: "Explore our latest blogs.", // Description for better engagement
    },
  };
}

const BlogGrid = async () => {
  return <BlogPage />;
};

export default BlogGrid;
