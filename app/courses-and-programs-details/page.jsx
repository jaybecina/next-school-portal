"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllCurriculum,
  fetchCurriculumDetails,
} from "../redux/features/curricula/curriculumSlice.js";
import {
  fetchAllCourse,
  fetchCourseDetails,
} from "../redux/features/courses/courseSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchCurriculum } from "../services/curriculumService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const CoursesAndProgramsDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [curriculumInfo, setCurriculumInfo] = useState(null);
  const [coursesList, setCoursesList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickCoursePurposeData, setOnClickCoursePurposeData] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    curriculumDetails,
    curriculumIsError,
    curriculumIsSuccess,
    curriculumIsLoading,
    curriculumMessage,
  } = useSelector((state) => state.curricula);

  const {
    courseDetails,
    courseIsError,
    courseIsSuccess,
    courseIsLoading,
    courseMessage,
  } = useSelector((state) => state.courses);

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
    const { redirect, selectedId } = onClickCoursePurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchCourseDetails id: ", selectedId);
      dispatch(fetchCourseDetails(onClickCoursePurposeData?.selectedId));
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickCoursePurposeData]);

  useEffect(() => {
    let mounted = true;
    if (courseDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "courseDetails",
        JSON.stringify(courseDetails?.data?.data)
      );

      router.push("/course-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [courseDetails]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      let getDetailsData = null;
      if (curriculumDetails?.data) {
        getDetailsData = curriculumDetails?.data?.data;
      } else {
        const curriculumDetailsLocSto = JSON.parse(
          localStorage.getItem("curriculumDetails")
        );
        getDetailsData = curriculumDetailsLocSto;
      }
      setCurriculumInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [curriculumDetails]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (curriculumInfo?.courses) {
        setCoursesList(curriculumInfo?.courses);
      }
    }

    return () => {
      mounted = false;
    };
  }, [curriculumInfo]);

  return (
    <div>
      <Jumbotron
        title="Curriculum Details"
        // subtitle="Detailed Information of this Curriculum"
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {curriculumInfo ? <Details data={curriculumInfo} /> : <NoRecord />}
      </div>
      <div className="d-flex justify-content-center align-items-center">
        {coursesList?.length > 0 ? (
          <CardGroup
            useImageDefault="https://photoshopstar.com/tutorials/36/03big.jpg"
            data={coursesList}
            itemsPerPage={8}
            onClickPurposeData={onClickCoursePurposeData}
            setOnClickPurposeData={setOnClickCoursePurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default CoursesAndProgramsDetailsPage;
