export const uploadToCloudinary = async (pics) => {
  if (!pics) {
    console.log("No image selected");
    return null;
  }

  try {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "mern_product"); // ✅ correct preset name
    data.append("cloud_name", "dnsvohidw");

    const res = await fetch("https://api.cloudinary.com/v1_1/dnsvohidw/image/upload", {
      method: "POST",
      body: data,
    });

    const fileData = await res.json();

    if (fileData.error) {
      console.error("Cloudinary Upload Error:", fileData.error.message);
      return null;
    }

    console.log("Uploaded image URL:", fileData.url);
    return fileData.url;
  } catch (err) {
    console.error("Upload failed:", err.message);
    return null;
  }
};
