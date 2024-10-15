import React from "react";
import Drop from "./Drop";
import car from "../assets/hero.png";
import Header from "./Header";

function Hero() {
  return (
    <div>
      
      <div className="flex flex-col items-center p-6 py-10 sm:p-10 sm:py-20 gap-6 h-auto sm:h-[600px] w-full bg-blue-200 rounded-b-[50px]">
        <h1 className="text-base sm:text-lg font-semibold text-center">
          Buy, Rent, and Roll Out in Style.
        </h1>
        <h1 className="text-3xl mb-9 sm:text-[50px] font-bold text-center">
          Drive Today, Decide Tomorrow!
        </h1>
        <Drop />
        <img
          src={car}
          alt="Car Image"
          className="w-full sm:w-[800px] md:w-[1000px] object-contain"
        />
      </div>
    </div>
  );
}

export default Hero;
