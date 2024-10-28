import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "./ui/separator";
import { IoIosSearch } from "react-icons/io";
import Data from "@/Data/Data";

function Drop() {


  
  const [cars, setCars] = useState();
  const [make, setMake] = useState();
  const [price, setPrice] = useState();



  return (
    <div className="p-2 md:p-6 bg-white rounded-md md:rounded-full flex flex-col md:flex-row gap-5 items-center justify-between w-[65%] mx-auto">
      <Select>
        <SelectTrigger className="outline-none md:border-none w-full md:w-[180px] shadow-none text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">New</SelectItem>
          <SelectItem value="dark">Old</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block"></Separator>
      <Select>
        <SelectTrigger className="outline-none md:border-none w-full md:w-[180px] shadow-none text-lg">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
          {Data.CarMakes.map((marker, index) => (
            <SelectItem value={marker.name}>{marker.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block"></Separator>
      <Select>
        <SelectTrigger className="outline-none md:border-none w-full md:w-[180px] shadow-none text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
          {Data.Pricing.map((marker, index) => (
            <SelectItem value={marker.amount}>{marker.amount}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="">
        <IoIosSearch className="text-[35px] bg-blue-400 p-1 rounded-full text-white hover:scale-100 transition-all cursor-pointer" />
      </div>
    </div>
  );
}

export default Drop;
