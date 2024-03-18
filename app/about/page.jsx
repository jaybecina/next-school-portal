"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllAbout,
  fetchAboutDetails,
} from "../redux/features/abouts/aboutSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import About from "../components/About";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchAbout } from "../services/aboutService.js";
import NoRecord from "../components/NoRecord/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const AboutPage = () => {
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
      <Jumbotron
        title="About Us"
        // subtitle="Showcasing the Moments from Our About"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={false}
      />
      <div className="d-flex justify-content-center align-items-center">
        {aboutList?.length > 0 ? (
          // <CardGroup
          //   data={aboutList}
          //   itemsPerPage={8}
          //   onClickPurposeData={onClickAboutPurposeData}
          //   setOnClickPurposeData={setOnClickAboutPurposeData}
          // />
          <About data={aboutList[0]} />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default AboutPage;
