"use client";
// If used in Pages Router, is no need to add this line
import React, { useState } from "react";
import BannerSlide from "./components/BannerSlide";
import Jumbotron from "./components/Jumbotron";
import Courses from "./components/CoursesAndPrograms";
import { imageData } from "./lib/coursesFakeData";
import ContactUs from "./components/ContactUs";
import CoursesAndPrograms from "./components/CoursesAndPrograms";
import AboutHomePage from "./components/AboutHomePage";
import TestimonialHomePage from "./components/TestimonialHomePage";
import MapEmbed from "./components/MapEmbed";

// export const metadata = {
//   title: "Home Page",
//   description: "Generated by create next app",
// };

const slides = [
  {
    image:
      "https://images.pexels.com/photos/5212653/pexels-photo-5212653.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Slide 1 Title",
    subtitle: "Slide 1 Subtitle",
    applyButtonText: "Apply Now",
    contactButtonText: "Contact Us",
  },
  {
    image:
      "https://images.pexels.com/photos/6238107/pexels-photo-6238107.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Slide 2 Title",
    subtitle: "Slide 2 Subtitle",
    applyButtonText: "Apply Now",
    contactButtonText: "Contact Us",
  },
  {
    image:
      "https://images.pexels.com/photos/5554303/pexels-photo-5554303.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Slide 3 Title",
    subtitle: "Slide 3 Subtitle",
    applyButtonText: "Apply Now",
    contactButtonText: "Contact Us",
  },
  {
    image:
      "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Slide 4 Title",
    subtitle: "Slide 4 Subtitle",
    applyButtonText: "Apply Now",
    contactButtonText: "Contact Us",
  },
];

const dropdownSearchArr = ["all", "title", "desc", "start_date"];

const HomePage = () => {
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });

  return (
    <div className="App">
      <Jumbotron
        title="KLL Portal"
        // subtitle="Your Gateway to Academic Excellence,
        // Important Deadlines, and Events"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={false}
      />
      <BannerSlide slides={slides} />
      <AboutHomePage />
      <CoursesAndPrograms />
      {/* Team End */}
      {/* Testimonial Start */}
      <TestimonialHomePage />
      {/* Testimonial Start */}
      {/* Contact Start */}
      <ContactUs />
      {/* Contact End */}
    </div>
  );
};

export default HomePage;
