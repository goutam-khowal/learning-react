"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ApplicantForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    // You would typically send this data to your backend here
    setFormData(data);
  };

  const handleNewApplication = () => {
    reset();
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md text-black flex flex-col">
        <h1 className="text-[#666] text-center text-2xl font-bold italic mb-4">
          Registered Successfully!
        </h1>
        <p className="text-center mb-4">
          Name : {formData.firstName} {formData.lastName}
        </p>
        <p className="text-center mb-4">
          <span className="underline block font-bold">Parents</span>
          <span className="block">Father: {formData.fatherName}</span>
          <span className="block">Mother: {formData.motherName}</span>
        </p>
        <p className=" mb-4 text-center">Email : {formData.email}</p>
        <p className=" mb-4 text-center">Mobile : {formData.phone}</p>
        <p className=" mb-4 text-center">Education: {formData.education}</p>
        <p className=" mb-4 text-center">
          Experience : {formData.experience} years
        </p>
        <p className=" mb-4 text-center">Position : {formData.position}</p>
        <label htmlFor="bio" className="block text-xl text-center">
          Bio
        </label>
        <textarea
          id="bio"
          rows={4}
          className="bg-[#ddd] rounded-lg font-mono w-full mb-4 text-center px-3 py-5 text-justify text-xs "
          defaultValue={formData.tellUsMore}
        ></textarea>

        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-fit self-center"
          onClick={handleNewApplication}
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md text-[#555] flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center italic">
        Candidate Form
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              className={`w-full p-2 border rounded ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="lastName">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              {...register("lastName", { required: "Last name is required" })}
              className={`w-full p-2 border rounded ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="fatherName">
              Father's Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fatherName"
              {...register("fatherName", {
                required: "Father's name is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.fatherName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fatherName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fatherName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="motherName">
              Mother's Name <span className="text-red-500">*</span>
            </label>
            <input
              id="motherName"
              {...register("motherName", {
                required: "Mother's name is required",
              })}
              className={`w-full p-2 border rounded ${
                errors.motherName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.motherName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.motherName.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email",
              },
            })}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="position">
            Position Applied For <span className="text-red-500">*</span>
          </label>
          <input
            id="position"
            {...register("position", { required: "Position is required" })}
            className={`w-full p-2 border rounded ${
              errors.position ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.position && (
            <p className="text-red-500 text-sm mt-1">
              {errors.position.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="experience">
            Years of Experience
          </label>
          <select
            id="experience"
            {...register("experience")}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select...</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="education">
            Highest Education
          </label>
          <select
            id="education"
            {...register("education")}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select...</option>
            <option value="high-school">High School</option>
            <option value="associate">Associate Degree</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">PhD</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="maritalStatus">
            Marital Status <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            } `}
            name="maritalStatus"
            id="maritalStatus"
            {...register("maritalStatus", {
              validate: (value) =>
                value !== "default" || "Select Marital Status!",
            })}
          >
            <option defaultChecked={true} value={"default"}>
              Select
            </option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="unmarried">Unmarried</option>
          </select>
          {errors.maritalStatus && (
            <p className="text-red-500 text-sm mt-1">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="tellUsMore">
            Tell us more...
          </label>
          <textarea
            id="tellUsMore"
            {...register("tellUsMore", {
              validate: (value) =>
                value.trim().split(/\s+/).length >= 30 ||
                "Use minimum 30 words to describe yourself",
            })}
            rows="4"
            className={`w-full p-2 border border-gray-300 rounded ${
              errors.tellUsMore ? "border-red-500" : "border-white"
            }`}
          ></textarea>
          {errors.tellUsMore && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tellUsMore.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              {...register("agreeToTerms", {
                required: "You must agree to the terms",
              })}
              className="mr-2"
            />
            <span>
              I agree to the terms and conditions{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm mt-1">
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded self-center"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default ApplicantForm;
