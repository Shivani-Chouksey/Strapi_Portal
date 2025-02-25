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
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    pageCount: 1,
    pageSize: 6,
    total: 0,
  });
  const pageSize = 6;
  // `https://content.guardianapis.com/search?api-key=80b13bdf-05aa-41f4-9735-5c8281295a57&page-size=${pageSize}&page=${page}`

  const getAllNews = async () => {
    try {
      const allNews = await axios.get(
        `http://localhost:1337/api/news-lists?populate=images&pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:asc`
      );
      console.log("allNews", allNews);

      if (allNews.status === 200) {
        setNewsList(allNews.data.data);
        setPaginationInfo(allNews.data.meta.pagination);
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
                  <h2 className="font-medium text-dark text-lg sm:text-xl ease-out duration-200 mb-4 ">
                    Type - {news.sectionName}
                  </h2>
                  <span className="flex  items-center gap-3 mb-2.5">
                    <Link
                      target="_blank"
                      href={news.url}
                      className="text-custom-sm  text-sm ease-out duration-200 hover:text-blue"
                    >
                      {news.title}
                    </Link>

                    {/* <!-- divider --> */}
                    <span className="block w-px h-4 bg-gray-4"></span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-15">
            <div className="bg-white shadow-1 rounded-md p-2">
              <ul className="flex items-center">
                {/* Previous Button */}
                <li>
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-2 rounded-md hover:bg-gray-300 disabled:text-gray-400"
                  >
                    Prev
                  </button>
                </li>

                {/* Page Number */}
                <li>
                  <span className="px-3 py-2">
                    Page {paginationInfo.page} of {paginationInfo.pageCount}
                  </span>
                </li>

                {/* Next Button */}
                <li>
                  <button
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(prev + 1, paginationInfo.pageCount)
                      )
                    }
                    disabled={page === paginationInfo.pageCount}
                    className="px-3 py-2 rounded-md hover:bg-gray-300 disabled:text-gray-400"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newslist;
