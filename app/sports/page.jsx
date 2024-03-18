"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllSport,
  fetchSportDetails,
} from "../redux/features/sports/sportSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchSport } from "../services/sportService.js";
import NoRecord from "../components/NoRecord/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const SportPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [sportList, setSportList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickSportPurposeData, setOnClickSportPurposeData] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    sports,
    sportDetails,
    sportIsError,
    sportIsSuccess,
    sportIsLoading,
    sportMessage,
  } = useSelector((state) => state.sports);

  useEffect(() => {
    // handleGetSportAll();

    dispatch(fetchAllSport());
  }, []);

  useEffect(() => {
    if (!user?.user) {
      toast.error("Unauthorized access");

      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;
    const { redirect, selectedId } = onClickSportPurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchSportDetails id: ", selectedId);
      dispatch(fetchSportDetails(onClickSportPurposeData?.selectedId));
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickSportPurposeData]);

  useEffect(() => {
    let mounted = true;
    if (sportDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "sportDetails",
        JSON.stringify(sportDetails?.data?.data)
      );

      router.push("/sport-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [sportDetails]);

  useEffect(() => {
    const fetchSportSearch = async (searchData) => {
      const response = await getSearchSport(
        searchData?.keyword,
        searchData?.field
      );

      setSportList(response?.data?.data);

      console.log("fetchSportSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchSportSearch(searchData);
    } else if (
      sports?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setSportList(sports?.data?.data);
    } else {
      setSportList([]);
    }
  }, [searchData, sports]);

  if (sportIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "name", "details"];

  return (
    <div>
      <Jumbotron
        title="Sports"
        // subtitle="Showcasing the Moments from Our Sport"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {sportList?.length > 0 ? (
          <CardGroup
            data={sportList}
            itemsPerPage={8}
            onClickPurposeData={onClickSportPurposeData}
            setOnClickPurposeData={setOnClickSportPurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default SportPage;
