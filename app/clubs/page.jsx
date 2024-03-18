"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllClub,
  fetchClubDetails,
} from "../redux/features/clubs/clubSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchClub } from "../services/clubService.js";
import NoRecord from "../components/NoRecord/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const ClubsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [clubList, setClubList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickClubPurposeData, setOnClickClubPurposeData] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    clubs,
    clubDetails,
    clubIsError,
    clubIsSuccess,
    clubIsLoading,
    clubMessage,
  } = useSelector((state) => state.clubs);

  useEffect(() => {
    // handleGetClubAll();

    dispatch(fetchAllClub());
  }, []);

  useEffect(() => {
    if (!user?.user) {
      toast.error("Unauthorized access");

      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;
    const { redirect, selectedId } = onClickClubPurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      console.log("fetchClubDetails id: ", selectedId);
      dispatch(fetchClubDetails(onClickClubPurposeData?.selectedId));
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickClubPurposeData]);

  useEffect(() => {
    let mounted = true;
    if (clubDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "clubDetails",
        JSON.stringify(clubDetails?.data?.data)
      );

      router.push("/club-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [clubDetails]);

  useEffect(() => {
    const fetchClubSearch = async (searchData) => {
      const response = await getSearchClub(
        searchData?.keyword,
        searchData?.field
      );

      setClubList(response?.data?.data);

      console.log("fetchClubSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchClubSearch(searchData);
    } else if (
      clubs?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setClubList(clubs?.data?.data);
    } else {
      setClubList([]);
    }
  }, [searchData, clubs]);

  if (clubIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = ["all", "name", "details"];

  return (
    <div>
      <Jumbotron
        title="Clubs"
        // subtitle="Showcasing the Moments from Our Club"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {clubList?.length > 0 ? (
          <CardGroup
            data={clubList}
            itemsPerPage={8}
            onClickPurposeData={onClickClubPurposeData}
            setOnClickPurposeData={setOnClickClubPurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default ClubsPage;
