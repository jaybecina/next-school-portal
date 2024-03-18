"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllCourse,
  fetchCourseDetails,
} from "../redux/features/courses/courseSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup/index.jsx";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchCourse } from "../services/courseService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import Details from "../components/Details/index.jsx";
import CustomTable from "../components/CustomTable/index.jsx";
import subjectUnenrolledColumnHeaders from "./utils/subjectUnenrolledColumnHeaders.js";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const CourseDetailsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [courseInfo, setCourseInfo] = useState(null);
  const [subjectsList, setSubjectsList] = useState(null);
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

  const headers = subjectUnenrolledColumnHeaders();

  const {
    courseDetails,
    courseIsError,
    courseIsSuccess,
    courseIsLoading,
    courseMessage,
  } = useSelector((state) => state.courses);

  useEffect(() => {
    // handleGetCourseAll();

    dispatch(fetchAllCourse());
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
      if (courseDetails?.data) {
        getDetailsData = courseDetails?.data?.data;
      } else {
        const courseDetailsLocSto = JSON.parse(
          localStorage.getItem("courseDetails")
        );
        getDetailsData = courseDetailsLocSto;
      }
      setCourseInfo(getDetailsData);
    }

    return () => {
      mounted = false;
    };
  }, [courseDetails]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (courseInfo?.subjects) {
        setSubjectsList(courseInfo?.subjects);
      }
    }

    return () => {
      mounted = false;
    };
  }, [courseInfo]);

  console.log("courseInfo: ", courseInfo);

  return (
    <div>
      <Jumbotron
        hasSearchInput={false}
        title="Course Details"
        // subtitle="Detailed Information of this Course"
      />
      <div className="d-flex flex-col justify-content-center align-items-center">
        {courseInfo ? <Details data={courseInfo} /> : <NoRecord />}
      </div>
      <div className="d-flex flex-col justify-content-center align-items-center px-4">
        {subjectsList?.length > 0 ? (
          <CustomTable columnHeaders={headers} data={subjectsList} />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default CourseDetailsPage;
