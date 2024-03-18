"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllAbout,
  fetchAboutDetails,
} from "../../redux/features/abouts/aboutSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../CardGroup";
import About from "../About";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner/index.jsx";
import Jumbotron from "../Jumbotron/index.jsx";
import { getSearchAbout } from "../../services/aboutService.js";
import NoRecord from "../NoRecord/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const AboutHomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [aboutList, setAboutList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickAboutPurposeData, setOnClickAboutPurposeData] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    abouts,
    aboutDetails,
    aboutIsError,
    aboutIsSuccess,
    aboutIsLoading,
    aboutMessage,
  } = useSelector((state) => state.abouts);

  useEffect(() => {
    // handleGetAboutAll();

    dispatch(fetchAllAbout());
  }, []);

  // useEffect(() => {
  //   if (!user?.user) {
  //     toast.error("Unauthorized access");

  //     redirect("/");
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchAboutSearch = async (searchData) => {
      const response = await getSearchAbout(
        searchData?.keyword,
        searchData?.field
      );

      setAboutList(response?.data?.data);

      console.log("fetchAboutSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchAboutSearch(searchData);
    } else if (
      abouts?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setAboutList(abouts?.data?.data);
    } else {
      setAboutList([]);
    }
  }, [searchData, abouts]);

  if (aboutIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "body"];

  return (
    <div>
      {aboutList?.length > 0 ? (
        <div className="row mx-0 justify-content-center pt-5">
          <div className="col-lg-12">
            <div className="section-title text-center position-relative mb-4">
              <h1 className="display-4">About Us</h1>
              <div className="text-start">
                <About data={aboutList[0]} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoRecord />
      )}
    </div>
  );
};

export default AboutHomePage;
