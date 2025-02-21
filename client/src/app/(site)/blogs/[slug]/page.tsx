import BlogDetails from "@/components/BlogDetails";
import React from "react";

import { Metadata } from "next";

type BlogDetailsPageProps = {
  params: { slug: string }; // Adjust the key based on your dynamic route
};

// Dynamic metadata function
export async function generateMetadata({ params }) {
  return {
    title: `Blog Details: ${params.slug} `,
    description: `Read more about ${params.slug} in our NextCommerce Template Blog.`,
  };
}

const BlogDetailsPage = ({ params }) => {
  return (
    <main>
      <BlogDetails params={params} />
    </main>
  );
};

export default BlogDetailsPage;
