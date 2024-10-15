"use client";

import Header from "@/components/Header";
import React, { useState } from "react";
import carDetails from "../Data/carDetails.json";
import InputField from "@/components/InputField";
import DropDown from "@/components/DropDown";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-select";
import features from "../Data/features";
import Checkbox from "@/components/Checkbox";
import { Button } from "@/components/ui/button";
import { db } from "../../configs/index";
import { Carlisting } from "../../configs/schema.js";
import IconField from "@/components/IconField";
import UploadImage from "@/components/UploadImage";
import { useUser } from "@clerk/clerk-react";

function AddList() {
  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState({});
  const [carListingId, setCarListingId] = useState(null);
  const [loader, setLoader] = useState(false);
  const {user}=useUser();

  // Use to capture user input field
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Used to capture selected features list
  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const result = await db
        .insert(Carlisting)
        .values({
          ...formData,
          features: featuresData,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          postedOn:
        })
        .returning({ id: Carlisting.id });

      if (result) {
        console.log("submitted");
        setCarListingId(result[0].id); // Store the carListingId
        setLoader(false);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-4 md:px-10 lg:px-20 my-10">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl">
          Add new listing :
        </h2>
        <form
          onSubmit={onSubmit}
          className="p-4 md:p-8 lg:p-10 border rounded-xl mt-5"
        >
          <div>
            <h2 className="font-bold text-2xl md:text-xl mb-4 md:mb-6">
              Car Details :
            </h2>
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
                    />
                  ) : item.fieldType === "dropdown" ? (
                    <DropDown
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType === "textarea" ? (
                    <Textarea
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6 h-[2px] bg-blue-200" />
          {/* Features List */}
          <div>
            <h2 className="font-bold text-2xl my-6">Features :</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                  />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* CAR IMAGES */}
          <Separator className="my-6 h-[2px] bg-blue-200" />
          <UploadImage
            carListingId={carListingId}
            setLoader={(v) => setLoader(v)}
          />
          <div className="mt-10 flex justify-end">
            <Button type="submit"
            disabled ={loader}
            onSubmit={(e)=>onSubmit(e)}
            >Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddList;