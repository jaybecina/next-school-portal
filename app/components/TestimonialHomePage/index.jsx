"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllTestimonial,
  fetchTestimonialDetails,
} from "../../redux/features/testimonials/testimonialSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner/index.jsx";
import Jumbotron from "../Jumbotron/index.jsx";
import { getSearchTestimonial } from "../../services/testimonialService.js";
import NoRecord from "../NoRecord/index.jsx";
import TestimonialSwiper from "../TestimonialSwiper/index.jsx";

const TestimonialHomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [testimonialList, setTestimonialList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickTestimonialPurposeData, setOnClickTestimonialPurposeData] =
    useState({
      redirect: "true",
      selectedId: null,
    });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    testimonials,
    testimonialDetails,
    testimonialIsError,
    testimonialIsSuccess,
    testimonialIsLoading,
    testimonialMessage,
  } = useSelector((state) => state.testimonials);

  useEffect(() => {
    // handleGetTestimonialAll();

    dispatch(fetchAllTestimonial());
  }, []);

  //   useEffect(() => {
  //     if (!user?.user) {
  //       toast.error("Unauthorized access");

  //       redirect("/");
  //     }
  //   }, [user]);

  useEffect(() => {
    let mounted = true;
    const { redirect, selectedId } = onClickTestimonialPurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchTestimonialDetails id: ", selectedId);
      dispatch(
        fetchTestimonialDetails(onClickTestimonialPurposeData?.selectedId)
      );
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickTestimonialPurposeData]);

  useEffect(() => {
    let mounted = true;
    if (testimonialDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "testimonialDetails",
        JSON.stringify(testimonialDetails?.data?.data)
      );

      router.push("/testimonial-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [testimonialDetails]);

  useEffect(() => {
    const fetchTestimonialSearch = async (searchData) => {
      const response = await getSearchTestimonial(
        searchData?.keyword,
        searchData?.field
      );

      setTestimonialList(response?.data?.data);

      console.log("fetchTestimonialSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchTestimonialSearch(searchData);
    } else if (
      testimonials?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setTestimonialList(testimonials?.data?.data);
    } else {
      setTestimonialList([]);
    }
  }, [searchData, testimonials]);

  if (testimonialIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "body", "name"];

  return (
    <div className="container-fluid bg-image py-5">
      <div className="container py-5">
        <div className="section-title text-center position-relative mb-5">
          <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
            Testimonial
          </h6>
          <h1 className="display-4">
            Discover What Our Students Have to Say About Their College Journey
          </h1>
        </div>
        <div
          className="owl-carousel team-carousel position-relative"
          style={{ padding: "0 30px" }}
        >
          {testimonialList?.length > 0 && (
            <TestimonialSwiper data={testimonialList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialHomePage;
