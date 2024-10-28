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
import { Link } from "react-router-dom";

function Drop() {
  const [cars, setCars] = useState(null);
  const [make, setMake] = useState(null);
  const [price, setPrice] = useState();

  return (
    <div className="p-2 md:p-6 bg-white rounded-md md:rounded-full flex flex-col md:flex-row gap-5 items-center justify-between w-[65%] mx-auto">
      <Select onValueChange={(value) => setCars(value)}>
        <SelectTrigger className="outline-none md:border-none w-full md:w-[180px] shadow-none text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Old">Old</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block"></Separator>
      <Select onValueChange={(value)=>setMake(value)}>
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
      <Select onValueChange={(value)=>setPrice(value)}>
        <SelectTrigger className="outline-none md:border-none w-full md:w-[180px] shadow-none text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
          {Data.Pricing.map((marker, index) => (
            <SelectItem value={marker.amount}>{marker.amount}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Link to={'/search?cars='+cars+'&make='+make+'&price'+price} className="">
        <IoIosSearch className="text-[35px] bg-blue-400 p-1 rounded-full text-white hover:scale-100 transition-all cursor-pointer" />
      </Link>
    </div>
  );
}

export default Drop;
