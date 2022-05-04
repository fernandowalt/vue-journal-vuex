import cloudinaryApi from "@/api/cloudinaryApi";

const uploadImage = async (file) => {
  if (!file) {
    return;
  }

  try {
    const formData = new FormData();
    formData.append("upload_preset", "calendar-vue");
    formData.append("file", file);

    formData.append("upload_preset", "calendar-vue");

    const { data } = await cloudinaryApi.post("/upload", formData);
    console.log(data);

    return data.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default uploadImage;
