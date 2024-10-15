import { GearIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-select";
import { Fuel, LucideExternalLink, LucideShipWheel, Settings2Icon } from "lucide-react";
import React from "react";
import { IoMdSpeedometer } from "react-icons/io";

function CarItems({ car }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 md:p-6 lg:p-8">
      <h2 className="absolute m-3 rounded-full text-xs bg-emerald-700 p-[5px] text-white">New</h2>
      <img
        src={car?.image}
        width={350}
        height={250}
        alt={car?.name}
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg text-black text-center">{car?.name}</h2>
        <Separator className="my-4 h-[1px] bg-blue-200" />
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-5 gap-4">
          <div className="flex flex-col items-center">
            <Fuel className="text-xl mb-2 text-blue1" />
            <h2 className="text-center ">{car.miles} Miles</h2>
          </div>
          <div className="flex flex-col items-center">
            <LucideShipWheel className="text-xl mb-2 text-blue1" />
            <h2 className="text-center">{car.fuelType}</h2>
          </div>
          <div className="flex flex-col items-center ">
            <Settings2Icon className="text-xl mb-2 text-blue1 " />
            <h2 className="text-center">{car.gearType}</h2>
          </div>
        </div>
        <Separator className="my-4 h-[1px] bg-blue-200" />
        <div className="flex items-center justify-between mt-2">
          <h2 className="font-bold text-xl">Rs. {car.price}</h2>
          <h2 className="text-blue-400 text-sm flex gap-2 items-center">
            View Details <LucideExternalLink className="w-5 h-5" />
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CarItems;
