"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllAcademicCalendar,
  fetchAcademicCalendarDetails,
} from "../redux/features/academicCalendars/academicCalendarSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchAcademicCalendar } from "../services/academicCalendarService.js";
import NoRecord from "../components/NoRecord/index.jsx";
import BigCalendar from "../components/BigCalendar";

const AcademicCalendarPage = ({ data, itemsPerPage }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [academicCalendarList, setAcademicCalendarList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [
    onClickAcademicCalendarPurposeData,
    setOnClickAcademicCalendarPurposeData,
  ] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    academicCalendars,
    academicCalendarDetails,
    academicCalendarIsError,
    academicCalendarIsSuccess,
    academicCalendarIsLoading,
    academicCalendarMessage,
  } = useSelector((state) => state.academicCalendars);

  useEffect(() => {
    // handleGetAcademicCalendarAll();

    dispatch(fetchAllAcademicCalendar());
  }, []);

  useEffect(() => {
    if (!user?.user) {
      toast.error("Unauthorized access");

      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    const fetchAcademicCalendarSearch = async (searchData) => {
      const response = await getSearchAcademicCalendar(
        searchData?.keyword,
        searchData?.field
      );

      setAcademicCalendarList(response?.data?.data);

      console.log("fetchAcademicCalendarSearch response: ", response?.data);
    };

    let academicCalendarData = [];
    if (searchData?.keyword && searchData?.field) {
      const updatedData = searchData?.map((item) => ({
        id: item.id,
        title: item.title,
        desc: item.desc,
        start: new Date(item.start_date),
        end: new Date(item.end_date),
        is_active: item.is_active,
      }));

      academicCalendarData = updatedData;
    } else if (
      academicCalendars?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      const updatedData = academicCalendars?.data?.data?.map((item) => ({
        id: item.id,
        title: item.title,
        desc: item.desc,
        start: new Date(item.start_date),
        end: new Date(item.end_date),
        is_active: item.is_active,
      }));

      academicCalendarData = updatedData;
    } else {
      academicCalendarData = [];
    }

    setAcademicCalendarList(academicCalendarData);
  }, [searchData, academicCalendars]);

  if (academicCalendarIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "title", "desc", "start_date"];

  return (
    <>
      <Jumbotron
        title="Academic Calendar"
        // subtitle="Checkout New Dates for Exams, Class Schedules, Holidays,
        // Important Deadlines, and Events"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={false}
      />
      <div className="d-flex justify-content-center align-items-center">
        <BigCalendar data={academicCalendarList ? academicCalendarList : []} />
      </div>
    </>
  );
};

export default AcademicCalendarPage;
