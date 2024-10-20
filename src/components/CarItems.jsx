import { Fuel, LucideExternalLink, LucideShipWheel, Settings2Icon } from "lucide-react";
import React from "react";
import { Separator } from "@radix-ui/react-select";

function CarItems({ car }) {
  // Debugging log to inspect car object
  console.log("Car data:", car);

  const imageUrl = car?.images?.[0]?.imageUrl || null; // Ensure we get the image URL or null

  return (
    <div className="bg-white border mt-5 border-gray-200 rounded-xl shadow-md p-2 md:p-3 lg:p-4 relative max-w-xs">
      <h2 className="absolute m-2 rounded-full text-xs bg-emerald-700 p-[3px] text-white">New</h2>
      {imageUrl ? (
        <img
          src={imageUrl}
          width={300}
          height={200}
          alt={car?.name || "Car Image"}
          className="rounded-t-xl"
        />
      ) : (
        <div className="h-[200px] flex items-center justify-center bg-gray-200 rounded-t-xl">
          <span>No Image Available</span>
        </div>
      )}
      <div className="p-2">
        <h2 className="font-bold text-sm text-black text-center">{car?.listingTitle}</h2>
        <Separator className="my-2 h-[1px] bg-blue-200" />
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-3 gap-2">
          <div className="flex flex-col items-center">
            <Fuel className="text-lg mb-1 text-blue1" />
            <h2 className="text-center text-xs">{car.mileage} Miles</h2>
          </div>
          <div className="flex flex-col items-center">
            <LucideShipWheel className="text-lg mb-1 text-blue1" />
            <h2 className="text-center text-xs">{car.fuelType}</h2>
          </div>
          <div className="flex flex-col items-center ">
            <Settings2Icon className="text-lg mb-1 text-blue1 " />
            <h2 className="text-center text-xs">{car.transmission}</h2>
          </div>
        </div>
        <Separator className="my-2 h-[1px] bg-blue-200" />
        <div className="flex items-center justify-between mt-1">
          <h2 className="font-bold text-sm">Rs. {car.sellingPrice}</h2>
          <h2 className="text-blue-400 text-xs flex gap-1 items-center">
            View Details <LucideExternalLink className="w-4 h-4" />
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CarItems;
