"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BlogItem from "@/components/Blog/BlogItem";
import Link from "next/link";
import Image from "next/image";
const Newslist = () => {
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const totalPage = 5;
  const getAllNews = async () => {
    try {
      const allNews = await axios.get(
        `https://content.guardianapis.com/search?api-key=80b13bdf-05aa-41f4-9735-5c8281295a57&page-size=${pageSize}&page=${page}`
      );
      //   console.log("allNews", allNews);

      if (allNews.status === 200) {
        setNewsList(allNews.data.response.results);
      }
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  };

  useEffect(() => {
    getAllNews();
  }, [page]);

  return (
    <>
      <Breadcrumb
        title={`Total News - ${newsList.length}`}
        pages={["News List"]}
      />{" "}
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-7.5">
            {/* <!-- blog item --> */}
            {newsList.map((news, key) => (
              <div
                key={key}
                className="shadow-1 bg-white rounded-xl px-4 sm:px-5 pt-5 pb-4"
              >
                <div className="mt-5.5">
                  <span className="flex  items-center gap-3 mb-2.5">
                    <Link
                      href={news.webUrl}
                      className="text-custom-sm  text-sm ease-out duration-200 hover:text-blue"
                    >
                      {news.webTitle}
                    </Link>

                    {/* <!-- divider --> */}
                    <span className="block w-px h-4 bg-gray-4"></span>
                  </span>

                  <h2 className="font-medium text-dark text-lg sm:text-xl ease-out duration-200 mb-4 ">
                    News Type - {news.sectionName}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* <!-- Blog Pagination Start --> */}
          <div className="flex justify-center mt-15">
            <div className="bg-white shadow-1 rounded-md p-2">
              <ul className="flex items-center">
                <li>
                  <button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                    id="paginationLeft"
                    aria-label="button for pagination left"
                    type="button"
                    className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px disabled:text-gray-4"
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.1782 16.1156C12.0095 16.1156 11.8407 16.0594 11.7282 15.9187L5.37197 9.45C5.11885 9.19687 5.11885 8.80312 5.37197 8.55L11.7282 2.08125C11.9813 1.82812 12.3751 1.82812 12.6282 2.08125C12.8813 2.33437 12.8813 2.72812 12.6282 2.98125L6.72197 9L12.6563 15.0187C12.9095 15.2719 12.9095 15.6656 12.6563 15.9187C12.4876 16.0312 12.347 16.1156 12.1782 16.1156Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
                  >
                    {page}
                  </a>
                </li>

                <li>
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === totalPage}
                    id="paginationLeft"
                    aria-label="button for pagination left"
                    type="button"
                    className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-blue disabled:text-gray-4"
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.82197 16.1156C5.65322 16.1156 5.5126 16.0594 5.37197 15.9469C5.11885 15.6937 5.11885 15.3 5.37197 15.0469L11.2782 9L5.37197 2.98125C5.11885 2.72812 5.11885 2.33437 5.37197 2.08125C5.6251 1.82812 6.01885 1.82812 6.27197 2.08125L12.6282 8.55C12.8813 8.80312 12.8813 9.19687 12.6282 9.45L6.27197 15.9187C6.15947 16.0312 5.99072 16.1156 5.82197 16.1156Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- Blog Pagination End --> */}
        </div>
      </section>
    </>
  );
};

export default Newslist;
