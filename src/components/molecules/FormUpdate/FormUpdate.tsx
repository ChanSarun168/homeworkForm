import React, { useState, ChangeEvent, FormEvent } from "react";
import { Label, InputForm } from "@/components/atoms";
import { userSchema } from "@/components/atoms";

interface FormProps {
  UpdateUser: (user: User) => void;
  data: User; // Assuming `data` is passed to prepopulate the form
}

const FormUpdate: React.FC<FormProps> = ({ UpdateUser, data }) => {
  const [user, setUser] = useState<User>({ ...data }); // Initialize user state with data if provided
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
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.profile) {
      return;
    }
    try {
      await userSchema.validate(user, { abortEarly: false });

      UpdateUser(user);
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
    // UpdateUser(user);
    // setUser({
    //   name: "",
    //   profile: "",
    // });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    validateForm(name, value);
  };

  const handleOnUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({
        ...prevUser,
        profile: imageUrl,
      }));
    }
    validateForm(e.target.name, file);
  };

  console.log(user);

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-5">Update Form</h1>
      <form onSubmit={handleOnSubmit}>
        <Label labelfor="name">Name</Label>
        <InputForm
          type="text"
          name="name"
          id="name"
          className="border-[2px] border-black w-[400px] h-10 ml-10 rounded-xl mb-10 pl-3 text-black"
          onchange={handleOnChange}
          value={user.name}
        />
        {errors.name && (
          <div className="error-message text-red-500">{errors.name}</div>
        )}
        <Label labelfor="image">Image</Label>
        <InputForm
          type="file"
          name="profile"
          id="profile"
          onchange={handleOnUploadFile}
        />
        <img
          src={user.profile}
          alt="User Profile"
          className="w-[100px] h-[100px] object-cover mt-5"
        />
        {errors.profile && (
          <div className="error-message text-red-500">{errors.profile}</div>
        )}
        <InputForm
          type="submit"
          name="button"
          id="button"
          className="w-[100px] h-[60px] bg-red-500 mt-5"
          value="Update"
        />
      </form>
    </div>
  );
};

export { FormUpdate };
