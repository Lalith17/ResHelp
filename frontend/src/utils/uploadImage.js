import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";
export const uploadImage = async (imageFile) => {
  if (!imageFile || !(imageFile instanceof File)) {
    throw new Error("Invalid image file");
  }

  const formData = new FormData();
  formData.append("profilePic", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Image upload failed";
    console.error("Error uploading image:", errorMsg);
    throw new Error(errorMsg);
  }
};
