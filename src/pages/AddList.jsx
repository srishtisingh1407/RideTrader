"use client";

import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import carDetails from "../Data/carDetails.json";
import InputField from "@/components/InputField";
import DropDown from "@/components/DropDown";
import { Separator } from "@radix-ui/react-select";
import features from "../Data/features";
import Checkbox from "@/components/Checkbox";
import { Button } from "@/components/ui/button";
import { db } from "../../configs/index";
import { CarImages, Carlisting } from "../../configs/schema.js";
import IconField from "@/components/IconField";
import UploadImage from "@/components/UploadImage";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { useNavigate, useSearchParams } from "react-router-dom";
import { eq } from "drizzle-orm";
import Service from "@/Data/Service";
import TextArea from "@/components/TextArea";
import { BiLoaderAlt } from "react-icons/bi"; // Import loader icon

function AddList() {
  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState({});
  const [carListingId, setCarListingId] = useState(null);
  const [carInfo, setCarInfo] = useState();
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    if (mode === "edit") {
      GetListingDetail();
    }
  }, [mode, recordId]);

  const GetListingDetail = async () => {
    try {
      const result = await db
        .select()
        .from(Carlisting)
        .innerJoin(CarImages, eq(Carlisting.id, CarImages.carListingId))
        .where(eq(Carlisting.id, recordId));
      const resp = Service.FormatResult(result);
      setCarInfo(resp[0]);
      setFeaturesData(resp[0].features);
      setFormData(resp[0]); // Set form data for editing
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      let result;

      const commonData = {
        ...formData,
        features: featuresData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        postedOn: moment().format("DD/MM/yyyy"),
      };

      if (mode === "edit" && recordId) {
        // Update existing record
        result = await db
          .update(Carlisting)
          .set(commonData)
          .where(eq(Carlisting.id, recordId))
          .returning({ id: Carlisting.id });
      } else {
        // Insert new record
        result = await db
          .insert(Carlisting)
          .values(commonData)
          .returning({ id: Carlisting.id });
      }

      console.log("Database Result:", result); // Log the result to inspect

      if (result && result[0]?.id) {
        console.log("Submission successful:", result);
        setCarListingId(result[0].id);
        navigate("/profile"); // Navigate only after success
      } else {
        console.log("No result returned from the database");
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-4 md:px-10 lg:px-20 my-10">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">
          {mode === "edit" ? "Edit listing:" : "Add new listing:"}
        </h2>
        <form onSubmit={onSubmit} className="p-4 md:p-8 lg:p-10 border rounded-xl mt-5">
          <div>
            <h2 className="font-bold text-2xl md:text-xl mb-4 md:mb-6">Car Details:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label>
                    <IconField icon={item?.icon} />
                    {item?.label}
                    {item.required && <span className="text-red-900">*</span>}
                  </label>
                  {item.fieldType === "text" || item.fieldType === "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType === "dropdown" ? (
                    <DropDown
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType === "textarea" ? (
                    <TextArea
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6 h-[2px] bg-blue-200" />
          {/* Features List */}
          <div>
            <h2 className="font-bold text-2xl my-6">Features:</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                    checked={featuresData?.[item.name]}
                  />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* CAR IMAGES */}
          <Separator className="my-6 h-[2px] bg-blue-200" />
          <UploadImage 
            carInfo={carInfo} // Pass the carInfo to show existing images
            carListingId={carListingId} // Pass the carListingId for uploads
            mode={mode} // Pass the mode to the UploadImage
            setLoader={setLoader}
          />
          <div className="mt-10 flex justify-end">
            <Button type="submit" disabled={loader}>
              {!loader ? 'Submit' : <BiLoaderAlt className="animate-spin text-lg" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddList;
