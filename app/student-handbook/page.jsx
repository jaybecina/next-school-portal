"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllStudentHandbook,
  fetchStudentHandbookDetails,
} from "../redux/features/studentHandbooks/studentHandbookSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchStudentHandbook } from "../services/studentHandbookService.js";
import NoRecord from "../components/NoRecord/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const StudentHandbookPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [studentHandbookList, setStudentHandbookList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [
    onClickStudentHandbookPurposeData,
    setOnClickStudentHandbookPurposeData,
  ] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    studentHandbooks,
    studentHandbookDetails,
    studentHandbookIsError,
    studentHandbookIsSuccess,
    studentHandbookIsLoading,
    studentHandbookMessage,
  } = useSelector((state) => state.studentHandbooks);

  useEffect(() => {
    // handleGetStudentHandbookAll();

    dispatch(fetchAllStudentHandbook());
  }, []);

  //   useEffect(() => {
  //     if (!user?.user) {
  //       toast.error("Unauthorized access");

  //       redirect("/");
  //     }
  //   }, [user]);

  useEffect(() => {
    let mounted = true;
    const { redirect, selectedId } = onClickStudentHandbookPurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchStudentHandbookDetails id: ", selectedId);
      dispatch(
        fetchStudentHandbookDetails(
          onClickStudentHandbookPurposeData?.selectedId
        )
      );
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickStudentHandbookPurposeData]);

  useEffect(() => {
    let mounted = true;
    if (studentHandbookDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "studentHandbookDetails",
        JSON.stringify(studentHandbookDetails?.data?.data)
      );

      router.push("/student-handbook-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [studentHandbookDetails]);

  useEffect(() => {
    const fetchStudentHandbookSearch = async (searchData) => {
      const response = await getSearchStudentHandbook(
        searchData?.keyword,
        searchData?.field
      );

      setStudentHandbookList(response?.data?.data);

      console.log("fetchStudentHandbookSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchStudentHandbookSearch(searchData);
    } else if (
      studentHandbooks?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setStudentHandbookList(studentHandbooks?.data?.data);
    } else {
      setStudentHandbookList([]);
    }
  }, [searchData, studentHandbooks]);

  if (studentHandbookIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "desc", "content"];

  return (
    <div>
      <Jumbotron
        title="Student Handbook"
        // subtitle="Showcasing the Moments from Our StudentHandbook"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {studentHandbookList?.length > 0 ? (
          <CardGroup
            useImageDefault="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png"
            data={studentHandbookList}
            itemsPerPage={8}
            onClickPurposeData={onClickStudentHandbookPurposeData}
            setOnClickPurposeData={setOnClickStudentHandbookPurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default StudentHandbookPage;
