"use client";
import React from "react";
import { Label } from "@/components/atoms";
import { InputForm } from "@/components/atoms";
import { useState } from "react";
import { userSchema } from "@/components/atoms";

interface FormProps {
  addUser: (user: User) => void;
}
const Form: React.FC<FormProps> = ({ addUser }) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    profile: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    name: "",
    profile: "",
  });
  const validateForm = async (name, value) => {
    try {
      await userSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      console.log("Error", error);
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errors.profile) {
      return;
    }

    try {
      await userSchema.validate(user, { abortEarly: false });

      addUser((prevUsers) => {
        return [...prevUsers, user];
      });
    } catch (error) {
      console.log("error", error);
      const fieldErrors = {};

      // Error From Yup
      error.inner.forEach((err) => {
        fieldErrors[err.path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // addUser((prev) => [...prev,user])
    // setUser({
    //   id: "",
    //   name: "",
    //   profile: "",
    // });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Event", e);
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser, 
        [name]: value,
      };
    });
    validateForm(name, value);
  };
  const handleOnUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    validateForm(e.target.name, file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => {
        return {
          ...prevUser,
          profile: imageUrl,
        };
      });
    }
  };
  console.log(user);
  return (
    <div className="text-center p-5 bg-pink-50 rounded-lg shadow-md">
  <h1 className="text-3xl mb-5 font-bold text-pink-600">Add Form ❤️</h1>
  <form onSubmit={handleOnSubmit} className="space-y-4">
    <div className="flex flex-col items-start">
      <label htmlFor="id" className="text-pink-600">ID:</label>
      <input
        type="text"
        name="id"
        id="id"
        className="border-2 border-pink-500 w-[400px] h-10 rounded-xl pl-3 text-pink-600 focus:outline-none focus:border-pink-700"
        onChange={handleOnChange}
      />
      {errors.id && (
        <div className="error-message text-red-500">{errors.id}</div>
      )}
    </div>
    <div className="flex flex-col items-start">
      <label htmlFor="name" className="text-pink-600">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        className="border-2 border-pink-500 w-[400px] h-10 rounded-xl pl-3 text-pink-600 focus:outline-none focus:border-pink-700"
        onChange={handleOnChange}
      />
      {errors.name && (
        <div className="error-message text-red-500">{errors.name}</div>
      )}
    </div>
    <div className="flex flex-col items-start">
      <label htmlFor="image" className="text-pink-600">Image:</label>
      <input
        type="file"
        name="profile"
        id="profile"
        className="focus:outline-none"
        onChange={handleOnUploadFile}
      />
      {errors.profile && (
        <div className="error-message text-red-500">{errors.profile}</div>
      )}
    </div>
    <button
      type="submit"
      className="w-[100px] h-[60px] bg-pink-600 text-white rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none"
    >
      Add 💖
    </button>
  </form>
</div>

  );
};

export { Form };
