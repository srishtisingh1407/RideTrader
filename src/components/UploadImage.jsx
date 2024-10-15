import { storage } from "../../configs/firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { db } from "../../configs/index";
import { CarImages } from "../../configs/schema";

function UploadImage({ carListingId }) {
  const [selectedFileList, setSelectedFileList] = useState([]);

  useEffect(() => {
    if (carListingId) {
      console.log("Trigger upload images:", carListingId);
      uploadImagesToServer();
    }
  }, [carListingId]);

  const onFileSelected = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFileList((prev) => [...prev, ...files]);
  };

  const onImageRemove = (image) => {
    const result = selectedFileList.filter((item) => item !== image);
    setSelectedFileList(result);
    URL.revokeObjectURL(image.preview); // Clean up the object URL
  };

  const uploadImagesToServer = async () => {
    if (!carListingId) {
      console.error("No car listing ID provided");
      return;
    }

    for (const file of selectedFileList) {
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, 'car/' + fileName);
      const metaData = {
        contentType: 'image/jpeg',
      };

      try {
        await uploadBytes(storageRef, file, metaData);
        console.log('Uploaded File');
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("Download URL:", downloadUrl);
        console.log("CarlistingId:", carListingId);

        await db.insert(CarImages).values({
          imageUrl: downloadUrl,
          carListingId, // Ensure this value is correctly set
        });

        console.log("Image data inserted into database");
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl my-3">Upload Car Images:</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {selectedFileList.map((image, index) => (
          <div key={index} className="border p-2">
            <h2 className="cursor-pointer">
              <IoMdCloseCircleOutline onClick={() => onImageRemove(image)} />
            </h2>
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-full object-cover rounded-xl"
              alt={`Upload preview ${index}`}
            />
          </div>
        ))}
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-blue-500 bg-blue-100 p-10 cursor-pointer hover:shadow-md">
            <h1 className="text-2xl text-center font-semibold">+</h1>
          </div>
        </label>
        <input
          type="file"
          multiple={true}
          id="upload-images"
          className="hidden"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default UploadImage;
