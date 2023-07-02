import React, { useState } from "react";
import useAxiosAuth from "../../lib/hooks/useAxiosAuth";

export interface IUser extends Document {
  _id: string;
  name: string;
  password: string;
  email: string;
  roles: number[];
  refreshToken?: string;
}

export const Doctors = () => {
  const [doctors, setDoctors] = useState<IUser[]>();
  const axiosAuth = useAxiosAuth();

  const handleFetch = async () => {
    const res = await axiosAuth.get("api/users/doctors");
    setDoctors(res.data.data);
  };
  return (
    <>
      <h2>Doctors</h2>
      <button onClick={handleFetch}>Fetch Doctors</button>
      {doctors &&
        doctors.map(({ email, name, _id }) => (
          <h3 key={_id}>
            {name} - {email}
          </h3>
        ))}
    </>
  );
};
