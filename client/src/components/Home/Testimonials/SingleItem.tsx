import React from "react";
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleItem = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="shadow-testimonial bg-white rounded-[10px] py-7.5 px-4 sm:px-8.5 m-1">
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: testimonial?.rating }, (_, index) => (
          <Image
            key={index}
            src="/images/icons/icon-star.svg"
            alt="star icon"
            width={15}
            height={15}
          />
        ))}
      </div>

      <p className="text-dark mb-6">{testimonial?.content}</p>

      <a href="#" className="flex items-center gap-4">
        <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
          <Image
            src={testimonial?.profile?.profile_image?.url}
            alt="author"
            className="w-12.5 h-12.5 rounded-full overflow-hidden"
            width={50}
            height={50}
          />
        </div>

        <div>
          <h3 className="font-medium text-dark">
            {testimonial?.profile?.username}
          </h3>
          <p className="text-custom-sm">{testimonial?.profile?.role}</p>
        </div>
      </a>
    </div>
  );
};

export default SingleItem;
