"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllTestimonial,
  fetchTestimonialDetails,
} from "../redux/features/testimonials/testimonialSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup/index.jsx";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchTestimonial } from "../services/testimonialService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const TestimonialDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [testimonialInfo, setTestimonialInfo] = useState(null);
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

  // useEffect(() => {
  //   if (!user?.user) {
  //     toast.error("Unauthorized access");

  //     redirect("/");
  //   }
  // }, [user]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      let getDetailsData = null;
      if (testimonialDetails?.data) {
        getDetailsData = testimonialDetails?.data?.data;
      } else {
        const testimonialDetailsLocSto = JSON.parse(
          localStorage.getItem("testimonialDetails")
        );
        getDetailsData = testimonialDetailsLocSto;
      }
      setTestimonialInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [testimonialDetails]);

  return (
    <div>
      <Jumbotron
        hasSearchInput={false}
        title="Testimonial Details"
        // subtitle="Detailed Information of this Testimonial"
      />
      <div className="d-flex justify-content-center align-items-center">
        {testimonialInfo ? <Details data={testimonialInfo} /> : <NoRecord />}
      </div>
    </div>
  );
};

export default TestimonialDetailsPage;
