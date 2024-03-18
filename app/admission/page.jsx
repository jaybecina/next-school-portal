"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllAdmission,
  fetchAdmissionDetails,
} from "../redux/features/admissions/admissionSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup/index.jsx";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchAdmission } from "../services/admissionService.js";
import NoRecord from "../components/NoRecord/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const AdmissionPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [admissionList, setAdmissionList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickAdmissionPurposeData, setOnClickAdmissionPurposeData] =
    useState({
      redirect: "true",
      selectedId: null,
    });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    admissions,
    admissionDetails,
    admissionIsError,
    admissionIsSuccess,
    admissionIsLoading,
    admissionMessage,
  } = useSelector((state) => state.admissions);

  useEffect(() => {
    // handleGetAdmissionAll();

    dispatch(fetchAllAdmission());
  }, []);

  // useEffect(() => {
  //   if (!user?.user) {
  //     toast.error("Unauthorized access");

  //     redirect("/");
  //   }
  // }, [user]);

  useEffect(() => {
    let mounted = true;
    const { redirect, selectedId } = onClickAdmissionPurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchAdmissionDetails id: ", selectedId);
      dispatch(fetchAdmissionDetails(onClickAdmissionPurposeData?.selectedId));
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickAdmissionPurposeData]);

  useEffect(() => {
    let mounted = true;
    if (admissionDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "admissionDetails",
        JSON.stringify(admissionDetails?.data?.data)
      );

      router.push("/admission-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [admissionDetails]);

  useEffect(() => {
    const fetchAdmissionSearch = async (searchData) => {
      const response = await getSearchAdmission(
        searchData?.keyword,
        searchData?.field
      );

      setAdmissionList(response?.data?.data);

      console.log("fetchAdmissionSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchAdmissionSearch(searchData);
    } else if (
      admissions?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setAdmissionList(admissions?.data?.data);
    } else {
      setAdmissionList([]);
    }
  }, [searchData, admissions]);

  if (admissionIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "desc", "content"];

  return (
    <div>
      <Jumbotron
        title="Admission"
        // subtitle="Showcasing the Moments from Our Admission"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {admissionList?.length > 0 ? (
          <CardGroup
            useImageDefault="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png"
            data={admissionList}
            itemsPerPage={8}
            onClickPurposeData={onClickAdmissionPurposeData}
            setOnClickPurposeData={setOnClickAdmissionPurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default AdmissionPage;
