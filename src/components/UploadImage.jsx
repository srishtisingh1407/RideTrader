import { storage } from "../../configs/firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { db } from "../../configs/index";
import { CarImages } from "../../configs/schema";

function UploadImage({ carListingId, carInfo, mode }) {
  const [selectedFileList, setSelectedFileList] = useState([]); // New files to upload
  const [editCarImageList, setEditCarImageList] = useState([]); // Existing images to display

  // Effect to load existing images when in edit mode
  useEffect(() => {
    if (mode === 'edit' && carInfo) {
      const images = carInfo.images || []; // Ensure it's an array
      setEditCarImageList(images);
    }
  }, [mode, carInfo]);

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

    // Upload newly selected images
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

        // Insert the new image data into the database
        await db.insert(CarImages).values({
          imageUrl: downloadUrl,
          carListingId,
        });

        console.log("Image data inserted into database");
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    // Clear selected files after upload
    setSelectedFileList([]);
  };

  const handleRemoveUploadedImage = async (image) => {
    // Remove the image from the displayed list
    setEditCarImageList(editCarImageList.filter(img => img.imageUrl !== image.imageUrl));

    // Optionally, implement the logic to delete the image from storage and database
    // Uncomment and implement if needed
    /*
    await deleteImageFromStorage(image.imageUrl); // Implement this function
    await db.delete(CarImages).where(eq(CarImages.imageUrl, image.imageUrl)); // Ensure you implement this part
    */
  };

  return (
    <div>
      <h2 className="font-bold text-2xl my-3">Upload Car Images:</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Display existing images */}
        {editCarImageList.map((image, index) => (
          <div key={index} className="border p-2 relative">
            <h2 className="absolute top-2 right-2 cursor-pointer">
              <IoMdCloseCircleOutline onClick={() => handleRemoveUploadedImage(image)} />
            </h2>
            <img
              src={image.imageUrl}
              className="w-full h-full object-cover rounded-xl"
              alt={`Uploaded ${index}`}
            />
          </div>
        ))}

        {/* Display selected files for upload */}
        {selectedFileList.map((image, index) => (
          <div key={index} className="border p-2 relative">
            <h2 className="absolute top-2 right-2 cursor-pointer">
              <IoMdCloseCircleOutline onClick={() => onImageRemove(image)} />
            </h2>
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-full object-cover rounded-xl"
              alt={`Upload preview ${index}`}
            />
          </div>
        ))}

        {/* File upload input */}
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

      {/* Upload Button */}
      {mode === 'edit' && (
        <button onClick={uploadImagesToServer} className="mt-4 p-2 bg-blue-500 text-white rounded">
          Upload New Images
        </button>
      )}
    </div>
  );
}

export default UploadImage;
