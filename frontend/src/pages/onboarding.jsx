import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner"; // adjust path if needed

import {
  Award,
  User as UserIcon,
  Phone,
  Calendar,
  MapPin,
  Globe,
  Linkedin,
  TwitterIcon,
  GithubIcon,
  FileText,
  Briefcase,
} from "lucide-react";
import { uploadImage } from "../utils/uploadImage";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { UserContext } from "../context/usercontext";
import { useUserStore } from "../store/userstore";
const steps = ["Personal", "Location", "Social"];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { user } = useContext(UserContext);
  const setLoading = useUserStore((state) => state.setLoading);
  const isLoading = useUserStore((state) => state.isLoading);

  const [formData, setFormData] = useState({
    authId: user.id,
    fname: "",
    lname: "",
    phone: "",
    email: user.email,
    dob: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
    bio: "",
    profilePic: "",
    role: "",
  });
  let profileImageUrl = "";
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "profilePic") {
          payload.append(key, value);
        }
      });
      try {
        setLoading(true); // ⬅️ Start loading

        if (formData.profilePic) {
          const imgUploadRes = await uploadImage(formData.profilePic);
          profileImageUrl = imgUploadRes.imageUrl || "";
          payload.append("profilePic", profileImageUrl);
        }
        const response = await axiosInstance.post(
          API_PATHS.USER.CREATE_USER,
          payload
        );
        await useUserStore.getState().setUser(response.data.data); // set user in Zustand
        navigate("/");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false); // ⬅️ Stop loading
      }
    }
  };

  const inputField = (name, label, Icon, type = "text") => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <Icon className="h-5 w-5" />
        </span>
        <input
          type={type}
          name={name}
          id={name}
          value={type !== "file" ? formData[name] : undefined}
          onChange={handleChange}
          required={["fname", "phone"].includes(name)}
          className="pl-10 py-2 px-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="w-full flex justify-center mb-8">
      <div className="flex items-center">
        {steps.map((label, index) => {
          const current = index + 1;
          const isActive = step === current;
          const isCompleted = step > current;

          return (
            <div key={label} className="flex items-center">
              {index > 0 && (
                <div className="w-24 h-1 bg-gray-300 rounded-full overflow-hidden relative -z-0">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCompleted ? "bg-green-500 w-full" : "bg-gray-300 w-0"
                    }`}
                  />
                </div>
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  } mx-3`}
              >
                {current}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex justify-center">
          <Award className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Let’s Build Your Profile
        </h2>
        <p className="mt-1 text-center text-sm text-gray-600">
          Just a few quick steps to get started.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-xl">
          {renderStepIndicator()}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="relative w-28 h-28 rounded-full mx-auto overflow-hidden border-2 border-gray-300 bg-gray-100 group hover:cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    name="profilePic"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {formData.profilePic ? (
                    <img
                      src={URL.createObjectURL(formData.profilePic)}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full text-gray-500 group-hover:text-indigo-600 transition">
                      <UserIcon className="w-8 h-8 mb-1" />
                      <span className="text-xs">Upload</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inputField("fname", "First Name", UserIcon)}
                  {inputField("lname", "Last Name", UserIcon)}
                  {inputField("phone", "Phone", Phone, "tel")}
                  {inputField("dob", "Date of Birth", Calendar, "date")}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm px-3 py-2"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Role Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Role
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <Briefcase className="h-5 w-5" />
                      </span>
                      <input
                        type="text"
                        name="role"
                        id="role"
                        value={formData.role || ""}
                        onChange={handleChange}
                        className="pl-10 py-2 px-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        placeholder="E.g. Developer, Designer"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us something about you..."
                    className="block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm px-3 py-2"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inputField("city", "City", MapPin)}
                {inputField("state", "State", MapPin)}
                {inputField("country", "Country", Globe)}
                {inputField("zip", "Zip Code", MapPin)}
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inputField("github", "GitHub", GithubIcon)}
                {inputField("linkedin", "LinkedIn", Linkedin)}
                {inputField("twitter", "Twitter", TwitterIcon)}
                {inputField("website", "Personal Website", Globe)}
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="ml-auto px-6 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow"
              >
                {step === 3 ? "Complete Setup" : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
