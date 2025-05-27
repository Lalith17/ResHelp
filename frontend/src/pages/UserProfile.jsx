import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  Lock,
  CheckCircle,
  X,
  Upload,
  Sliders,
  Download,
} from "lucide-react";
import { useUserStore } from "../store/userstore";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { uploadImage } from "../utils/uploadImage";
import CharAvatar from "../components/charAvatar";
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const userData = useUserStore((state) => state.userData);
  const setUserData = useUserStore((state) => state.setUser);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fname: userData?.fname || "",
    lname: userData?.lname || "",
    email: userData?.email || "",
    website: userData?.website || "",
    phone: userData?.phone || "",
    city: userData?.city || "",
    bio: userData?.bio || "",
  });
  const [photoFile, setPhotoFile] = useState(null);

  const handlePhotoUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      const image = await uploadImage(file);
      const response = await axiosInstance.put(
        API_PATHS.USER.USER_ALLOPS(userData._id),
        { profilePic: image.imageUrl }
      );
      setUserData(response.data.data);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Photo upload failed:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    try {
      // Send update request with the current formData
      const response = await axiosInstance.put(
        API_PATHS.USER.USER_ALLOPS(userData._id),
        formData
      );
      useUserStore.getState().setUser(response.data.data); // set user in Zustand
      // Show success message
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving user data:", error);
      setError("Failed to save details. Please try again.");
    }
  };
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async () => {
    try {
      setError("");
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      await axiosInstance.post(API_PATHS.AUTH.UPDATE_PASSWORD, {
        userId: userData.authId,
        currentPassword,
        newPassword,
      });

      // Optionally clear fields or show success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password", error);
      setError("Failed to update password. Please try again.");
    }
  };

  const deleteAccount = async () => {
    try {
      await axiosInstance.delete(API_PATHS.USER.USER_ALLOPS(userData._id));
    } catch (error) {
      console.error("Error deleting account", error);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
      </div>

      {saveSuccess && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Your changes have been saved successfully!
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  onClick={() => setSaveSuccess(false)}
                >
                  <span className="sr-only">Dismiss</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="rounded-lg bg-white shadow">
            <div className="flex flex-col items-center p-6">
              <div className="relative">
                <div className="relative group inline-block cursor-pointer">
                  {/* Profile pic */}
                  <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-300">
                    {userData?.profilePic ? (
                      <img
                        src={userData.profilePic}
                        alt={"Profile"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <CharAvatar
                        fname={userData?.fname}
                        lname={userData?.lname}
                        width="w-24"
                        height="h-24"
                        style="text-xl"
                      />
                    )}
                  </div>
                </div>
                <label className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow-md hover:bg-gray-100 cursor-pointer">
                  <Upload className="h-4 w-4 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
              {userData?.fname && (
                <h2 className="mt-4 text-lg font-medium text-gray-900">
                  Hello, {userData.fname}!
                </h2>
              )}
              {userData?.fname && (
                <p className="text-sm text-gray-500"> {userData?.role} </p>
              )}
              <div className="mt-5 flex w-full flex-col space-y-2">
                <ProfileNavButton
                  active={activeTab === "personal"}
                  icon={<User className="h-5 w-5" />}
                  label="Personal Info"
                  onClick={() => setActiveTab("personal")}
                />
                <ProfileNavButton
                  active={activeTab === "account"}
                  icon={<Briefcase className="h-5 w-5" />}
                  label="Account Details"
                  onClick={() => setActiveTab("account")}
                />
                <ProfileNavButton
                  active={activeTab === "security"}
                  icon={<Lock className="h-5 w-5" />}
                  label="Security"
                  onClick={() => setActiveTab("security")}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-white p-6 shadow">
            <h3 className="text-sm font-medium text-gray-900">
              Account Overview
            </h3>
            <div className="mt-4 flex flex-col space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Resumes Created</span>
                <span className="font-medium text-gray-900">17</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Achievements</span>
                <span className="font-medium text-gray-900">42</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Downloads</span>
                <span className="font-medium text-gray-900">28</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Account Type</span>
                <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                  Premium
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Member Since</span>
                <span className="font-medium text-gray-900">Jan 2025</span>
              </div>
            </div>
            <button className="mt-5 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <Download className="mr-2 h-4 w-4" />
              Download All Data
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-lg bg-white shadow">
            {activeTab === "personal" && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h2>
                <p className="text-sm text-gray-500">
                  Update your personal information that will be used in your
                  resumes.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="name"
                          name="fname"
                          id="fname"
                          value={formData.fname}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="name"
                          name="lname"
                          id="lname"
                          value={formData.lname}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Website / Portfolio
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Globe className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="website"
                          id="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Professional Summary
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={formData.bio}
                        onChange={handleInputChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      This summary will be displayed at the top of your
                      generated resumes.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Account Details
                </h2>
                <p className="text-sm text-gray-500">
                  Manage your account settings and subscription.
                </p>

                <div className="mt-6">
                  <div className="rounded-lg border border-gray-200 bg-white">
                    <div className="border-b border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            Subscription Plan
                          </h3>
                          <p className="text-sm text-gray-500">
                            You are currently on the Premium plan.
                          </p>
                        </div>
                        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                          Premium
                        </span>
                      </div>
                    </div>
                    <div className="border-b border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            Billing Cycle
                          </h3>
                          <p className="text-sm text-gray-500">
                            Your next billing date is January 15, 2026.
                          </p>
                        </div>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          Change
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            Payment Method
                          </h3>
                          <p className="text-sm text-gray-500">
                            Visa ending in 4242
                          </p>
                        </div>
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    Export Your Data
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Download all your data, including resumes, achievements, and
                    account information.
                  </p>
                  <button className="mt-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <Download className="mr-2 h-4 w-4" />
                    Download Data
                  </button>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-base font-medium text-red-600">
                    Delete Account
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Once you delete your account, all of your data will be
                    permanently removed. This action cannot be undone.
                  </p>
                  <button
                    className="mt-2 inline-flex items-center rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                    onClick={deleteAccount}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Security</h2>
                <p className="text-sm text-gray-500">
                  Manage your password and security settings.
                </p>

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Change Password
                    </h3>
                    <div className="mt-2 space-y-4">
                      <div>
                        <label
                          htmlFor="current_password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current_password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="new_password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="new_password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirm_password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirm_password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      {error && <p className="text-sm text-red-600">{error}</p>}
                      <div>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={handleUpdatePassword}
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileNavButton = ({ active, icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
        active
          ? "bg-indigo-100 text-indigo-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );
};

export default UserProfile;
