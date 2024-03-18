"use client";
import React, { useState, useEffect } from "react";
import {
  fetchAllEvents,
  fetchEventDetails,
} from "../redux/features/events/eventSlice.js";
import { useDispatch, useSelector } from "react-redux";
import CardGroup from "../components/CardGroup";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/index.jsx";
import Jumbotron from "../components/Jumbotron/index.jsx";
import { getSearchEvents } from "../services/eventsService.js";
import NoRecord from "../components/NoRecord/index.jsx";

// export const getSome = cache(async () => {
//   const res = await axios.get("https://...", otherAxiosConfigObject);
//   const data = res.json();
//   return data;
// });

// // On Page (or component)

const EventsGalleryPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [eventList, setEventList] = useState(null);
  const [searchData, setSearchData] = useState({
    keyword: "",
    field: "all",
  });
  const [onClickEventPurposeData, setOnClickEventPurposeData] = useState({
    redirect: "true",
    selectedId: null,
  });
  const [clickedToRedirect, setClickedToRedirect] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    events,
    eventDetails,
    eventIsError,
    eventIsSuccess,
    eventIsLoading,
    eventMessage,
  } = useSelector((state) => state.events);

  useEffect(() => {
    // handleGetEventsAll();

    dispatch(fetchAllEvents());
  }, []);

  useEffect(() => {
    if (!user?.user) {
      toast.error("Unauthorized access");

      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;
    const { redirect, selectedId } = onClickEventPurposeData;
    console.log("selectedId: ", selectedId);
    if (selectedId && mounted) {
      dispatch(fetchEventDetails(onClickEventPurposeData?.selectedId));
      setClickedToRedirect(true);
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [onClickEventPurposeData]);

  useEffect(() => {
    let mounted = true;
    if (eventDetails && clickedToRedirect && mounted) {
      localStorage.setItem(
        "eventDetails",
        JSON.stringify(eventDetails?.data?.data)
      );

      router.push("/event-details");
    }

    return () => {
      mounted = false;
      setClickedToRedirect(false);
    };
  }, [eventDetails]);

  useEffect(() => {
    const fetchEventSearch = async (searchData) => {
      const response = await getSearchEvents(
        searchData?.keyword,
        searchData?.field
      );

      setEventList(response?.data?.data);

      console.log("fetchEventSearch response: ", response?.data);
    };

    if (searchData?.keyword && searchData?.field) {
      fetchEventSearch(searchData);
    } else if (
      events?.data?.data?.length > 0 &&
      searchData?.keyword === "" &&
      searchData?.field === "all"
    ) {
      setEventList(events?.data?.data);
    } else {
      setEventList([]);
    }
  }, [searchData, events]);

  if (eventIsLoading) {
    <Spinner />;
  }

  const dropdownSearchArr = [
    "all",
    "name",
    "details",
    "start_date",
    "speaker_name",
  ];

  return (
    <div>
      <Jumbotron
        title="Events Gallery Page"
        // subtitle="Showcasing the Moments from Our Events"
        dropdownSearchArr={dropdownSearchArr}
        searchData={searchData}
        setSearchData={setSearchData}
        hasSearchInput={true}
      />
      <div className="d-flex justify-content-center align-items-center">
        {eventList?.length > 0 ? (
          <CardGroup
            data={eventList}
            itemsPerPage={8}
            onClickPurposeData={onClickEventPurposeData}
            setOnClickPurposeData={setOnClickEventPurposeData}
          />
        ) : (
          <NoRecord />
        )}
      </div>
    </div>
  );
};

export default EventsGalleryPage;
