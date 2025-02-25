import React from "react";
import { Metadata } from "next";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export async function generateMetadata({ params }) {
  const response = await axios.get(
    `http://localhost:1337/api/blogs?populate[author_detail][populate]=profile_image&populate[cover_images]=true&populate[tags]=true&filters[slug][$eq]=${params.slug}`
  );

  const blog = response.data.data[0];

  return {
    title: blog?.title || "Blog Details",
    description:
      blog?.content?.substring(0, 160) || "Read the latest blog post.",
    openGraph: {
      title: blog?.title,
      description: blog?.content?.substring(0, 160),
      images: [
        {
          url: blog?.cover_images ? blog?.cover_images[0].url : "",
          width: 1200,
          height: 630,
          alt: blog?.title,
        },
      ],
      type: "article",
    },
  };
}

const BlogDetails = async ({ params }) => {
  const response = await axios.get(
    `http://localhost:1337/api/blogs?populate[author_detail][populate]=profile_image&populate[cover_images]=true&populate[tags]=true&filters[slug][$eq]=${params.slug}`
  );
  const blogDetail = response.data.data[0];
  const createdDate = new Date(blogDetail?.createdAt);

  return (
    <>
      <Breadcrumb title={"Blog Details"} pages={["blog details"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[750px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="rounded-[10px] overflow-hidden mb-7.5">
            <Image
              className="rounded-[10px]"
              src={
                blogDetail?.cover_images ? blogDetail?.cover_images[0].url : ""
              }
              alt="details"
              width={750}
              height={477}
            />
          </div>

          <div>
            <span className="flex items-center gap-3 mb-4">
              <a href="#" className="ease-out duration-200 hover:text-blue">
                {createdDate.toISOString().replace("T", " ").split(".")[0]}
              </a>
              <span className="block w-px h-4 bg-gray-4"></span>
              {/* <a href="#" className="ease-out duration-200 hover:text-blue">
                300k Views
              </a> */}
            </span>

            <h2 className="font-medium text-dark text-xl lg:text-2xl xl:text-custom-4xl mb-4">
              {blogDetail?.title}
            </h2>
            <p className="mb-6">{blogDetail?.content}</p>
          </div>
          <div className="rounded-xl bg-white pt-7.5 pb-6 px-4 sm:px-7.5 my-7.5">
            <p className="italic text-dark text-center">
              ‘‘Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod incididunt utionals labore et dolore magna aliqua quis
              fermentum,,
            </p>

            <a
              href="#"
              className="flex items-center justify-center gap-3 mt-5.5"
            >
              <div className="flex w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={
                    blogDetail?.author_detail
                      ? blogDetail?.author_detail?.profile_image.url
                      : ""
                  }
                  alt="user"
                  width={48}
                  height={48}
                />
              </div>

              <div>
                <h4 className="text-dark text-custom-sm">
                  {blogDetail?.author_detail?.username}
                </h4>
                <p className="text-custom-xs">
                  {" "}
                  {blogDetail?.author_detail?.role}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
