import React from "react";

export const Doctors = async () => {
  const res = await fetch("http://localhost:8000/api/users/doctors", {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDdmOWFmYTcwNGQxN2MyNDgwM2E3ODMiLCJyb2xlcyI6WzIwMDEsMTk4NCw1MTUwXSwiaWF0IjoxNjg3MDMwNTk4LCJleHAiOjE2ODcwMzE0OTh9.7tCwuBqLXoy_TYi5HN_xhQTMSs2_LUWtgHz5oJ2E4V0",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log(res);

  return <div>Doctors</div>;
};
