"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import OverflowText from "../OverflowText";
import { doSpace } from "@/app/utils/getSpaceImage";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TestimonialSwiper = ({ data }) => {
  // Replace testimonialsData with your actual testimonial data
  const testimonialsData = [
    { id: 1, name: "John Doe", comment: "Great service, highly recommended." },
    { id: 2, name: "Jane Smith", comment: "Amazing experience with the team!" },
    // Add more testimonials as needed
  ];
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={3}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {data?.map((item) => (
        <SwiperSlide key={`testimonial-${item?.name}`}>
          <div className="team-item">
            <img
              className="img-fluid w-100"
              src={item?.path ? item.path : "/img/default-avatar.jpg"}
              width={330}
              height={330}
              style={{ objectFit: "contain" }}
              alt={`testimonial-image-${item?.name}`}
            />
            <div
              className="bg-light text-center p-4"
              style={{ minHeight: 250 }}
            >
              <h5 className="mb-3">{item?.name}</h5>
              <p className="mb-2">{item?.job}</p>
              <hr />
              <p className="mb-2">
                <OverflowText text={item?.body} textLen={70} />
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSwiper;
