import FakeData from "@/Data/FakeData";
import React from "react";
import CarItems from "./CarItems";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function MostSearchedCar() {
  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 mb-20">
      <h1 className="font-bold text-2xl sm:text-3xl text-center mt-16 mb-7">
        MOST SEARCHED CARS
      </h1>
      <Carousel>
        <CarouselContent className="flex gap-4">
          {FakeData.carList.map((car, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-2"
            >
              <CarItems car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default MostSearchedCar;
