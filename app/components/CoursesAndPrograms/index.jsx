"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllCurriculum,
  fetchCurriculumDetails,
} from "../../redux/features/curricula/curriculumSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner/index.jsx";
import Jumbotron from "../Jumbotron/index.jsx";
import { getSearchCurriculum } from "../../services/curriculumService.js";
import NoRecord from "../NoRecord/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const CoursesAndPrograms = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [curriculumList, setCurriculumList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickCurriculumPurposeData, setOnClickCurriculumPurposeData] =
    useState({
      redirect: "true",
      selectedId: null,
    });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    curricula,
    curriculumDetails,
    curriculumIsError,
    curriculumIsSuccess,
    curriculumIsLoading,
    curriculumMessage,
  } = useSelector((state) => state.curricula);

  useEffect(() => {
    // handleGetCurriculumAll();

    dispatch(fetchAllCurriculum());
  }, []);

  // useEffect(() => {
  //   if (!user?.user) {
  //     toast.error("Unauthorized access");

  //     redirect("/");
  //   }
  // }, [user]);

  useEffect(() => {
    let mounted = true;
    const { redirect, selectedId } = onClickCurriculumPurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchCurriculumDetails id: ", selectedId);
      dispatch(
        fetchCurriculumDetails(onClickCurriculumPurposeData?.selectedId)
      );
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickCurriculumPurposeData]);

  useEffect(() => {
    let mounted = true;
    if (curriculumDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "curriculumDetails",
        JSON.stringify(curriculumDetails?.data?.data)
      );

      router.push("/courses-and-programs-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [curriculumDetails]);

  useEffect(() => {
    const fetchCurriculumSearch = async (searchData) => {
      const response = await getSearchCurriculum(
        searchData?.keyword,
        searchData?.field
      );

      setCurriculumList(response?.data?.data);

      console.log("fetchCurriculumSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchCurriculumSearch(searchData);
    } else if (
      curricula?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setCurriculumList(curricula?.data?.data);
    } else {
      setCurriculumList([]);
    }
  }, [searchData, curricula]);

  if (curriculumIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "body", "author"];

  return (
    <div className="container-fluid bg-image px-0 py-5">
      <div className="row mx-0 justify-content-center pt-5">
        <div className="col-lg-6">
          <div className="section-title text-center position-relative mb-4">
            <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
              Our Courses
            </h6>
            <h1 className="display-4">Checkout New Releases Of Our Courses</h1>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        {curriculumList?.length > 0 ? (
          <CardGroup
            useImageDefault="https://photoshopstar.com/tutorials/36/03big.jpg"
            data={curriculumList}
            itemsPerPage={8}
            onClickPurposeData={onClickCurriculumPurposeData}
            setOnClickPurposeData={setOnClickCurriculumPurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default CoursesAndPrograms;
