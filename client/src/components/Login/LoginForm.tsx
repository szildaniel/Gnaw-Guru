"use client";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TFormInputs = {
  email: string;
  password: string;
};

const loginUser = async (data: TFormInputs) => {
  const response = await axios.post("http://localhost:8000/api/login", data);
  return response.data;
};

const LoginForm = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInputs>();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: (data) => {
      setIsLoggedIn(true);
    },
    onError: () => {
      setIsLoggedIn(false);
      alert("there was an error");
    },
  });
  const formSubmit = async (data: TFormInputs) => {
    const user = { ...data };
    mutate(user);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <input defaultValue="email" {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}
      <input defaultValue="password" {...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
};

export default LoginForm;
