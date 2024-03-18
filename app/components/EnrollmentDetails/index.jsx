"use client";
import React, { useState, useEffect } from "react";
import { fetchEnrollmentDetails } from "@/app/redux/features/enrollment/enrollmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { Collapse } from "antd";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CustomTable from "../CustomTable";
import { subjectColumnHeaders } from "./utils/subjectColumnHeaders";

const EnrollmentDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { Panel } = Collapse;

  const [enrollmentInfo, setEnrollmentInfo] = useState(null);

  const {
    enrollmentDetails,
    enrollmentIsError,
    enrollmentIsSuccess,
    enrollmentIsLoading,
    enrollmentMessage,
  } = useSelector((state) => state.enrollment);

  const { user } = useSelector((state) => state.auth);

  const headers = subjectColumnHeaders();

  useEffect(() => {
    console.log("user: " + user);
    if (!user?.user) {
      toast.error("Unauthorized access");

      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;

    if (user && mounted) {
      const userId = user?.user?.id;
      console.log("userId: ", user?.user?.id);
      dispatch(fetchEnrollmentDetails(userId));
    }

    return () => {
      mounted = false;
    };
  }, [user]);

  useEffect(() => {
    let mounted = true;

    if (enrollmentDetails?.data?.data?.length > 0 && mounted) {
      setEnrollmentInfo(enrollmentDetails?.data?.data);
    }

    return () => {
      mounted = false;
    };
  }, [enrollmentDetails]);

  return (
    <>
      {enrollmentInfo ? (
        <Collapse accordion defaultActiveKey={["1"]}>
          {enrollmentInfo?.map((enrollment) => (
            <Panel
              header={<strong>{enrollment.enrollment_code}</strong>}
              key={enrollment.id}
            >
              <p>Status: {enrollment.status}</p>
              <p>School Year: {enrollment.school_year}</p>
              {/* Add more details as needed */}
              <p>Remarks: {enrollment.remarks}</p>
              <p>Credits: {enrollment.credits}</p>
              <hr />

              {/* Display Curriculum */}
              <h5>Curriculum</h5>
              {enrollment?.curriculum?.map((curriculum) => (
                <div key={curriculum.id}>
                  <p>Curriculum Code: {curriculum.curriculum_code}</p>
                  {/* Add more curriculum details */}
                </div>
              ))}
              <hr />

              {/* Display Course */}
              <h5>Course</h5>
              {enrollment?.course?.map((course) => (
                <div key={course.id}>
                  <p>Course Title: {course.title}</p>
                  {/* Add more course details */}
                </div>
              ))}

              {/* Display Subjects */}
              <h5>Subjects</h5>
              {/* {enrollment?.subjects?.map((subject) => (
              <div key={subject.id}>
                <p>Subject Name: {subject.name}</p>
              </div>
            ))} */}
              <CustomTable
                columnHeaders={headers}
                data={enrollment?.subjects}
              />
            </Panel>
          ))}
        </Collapse>
      ) : (
        <span>No Enrollment data yet</span>
      )}
    </>
  );
};

export default EnrollmentDetails;
