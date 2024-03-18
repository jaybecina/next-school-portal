"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllStudentResource,
  fetchStudentResourceDetails,
} from "../redux/features/studentResources/studentResourceSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchStudentResource } from "../services/studentResourceService.js";
import NoRecord from "../components/NoRecord/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const StudentResourcePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [studentResourceList, setStudentResourceList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [
    onClickStudentResourcePurposeData,
    setOnClickStudentResourcePurposeData,
  ] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    studentResources,
    studentResourceDetails,
    studentResourceIsError,
    studentResourceIsSuccess,
    studentResourceIsLoading,
    studentResourceMessage,
  } = useSelector((state) => state.studentResources);

  useEffect(() => {
    // handleGetStudentResourceAll();

    dispatch(fetchAllStudentResource());
  }, []);

  useEffect(() => {
    if (!user?.user) {
      toast.error("Unauthorized access");

      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;
    const { redirect, selectedId } = onClickStudentResourcePurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchStudentResourceDetails id: ", selectedId);
      dispatch(
        fetchStudentResourceDetails(
          onClickStudentResourcePurposeData?.selectedId
        )
      );
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickStudentResourcePurposeData]);

  useEffect(() => {
    let mounted = true;
    if (studentResourceDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "studentResourceDetails",
        JSON.stringify(studentResourceDetails?.data?.data)
      );

      router.push("/student-resource-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [studentResourceDetails]);

  useEffect(() => {
    const fetchStudentResourceSearch = async (searchData) => {
      const response = await getSearchStudentResource(
        searchData?.keyword,
        searchData?.field
      );

      setStudentResourceList(response?.data?.data);

      console.log("fetchStudentResourceSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchStudentResourceSearch(searchData);
    } else if (
      studentResources?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setStudentResourceList(studentResources?.data?.data);
    } else {
      setStudentResourceList([]);
    }
  }, [searchData, studentResources]);

  if (studentResourceIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "desc", "content"];

  return (
    <div>
      <Jumbotron
        title="Student Resources"
        // subtitle="Showcasing the Moments from Our StudentResource"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {studentResourceList?.length > 0 ? (
          <CardGroup
            useImageDefault="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png"
            data={studentResourceList}
            itemsPerPage={8}
            onClickPurposeData={onClickStudentResourcePurposeData}
            setOnClickPurposeData={setOnClickStudentResourcePurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default StudentResourcePage;
