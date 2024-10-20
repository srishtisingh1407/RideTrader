import FakeData from "@/Data/FakeData";
import React, { useEffect, useState } from "react";
import CarItems from "./CarItems";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarImages, Carlisting } from "../../configs/schema";
import { db } from "../../configs/index";
import { desc, eq } from "drizzle-orm";
import Service from "@/Data/Service";


function MostSearchedCar() {
const[carList,setCarList]=useState([]);

  useEffect(() => {
    GetPopularCarlist();
  }, []);

  const GetPopularCarlist = async () => {
    const result = await db
      .select()
      .from(Carlisting)
      .leftJoin(CarImages, eq(Carlisting.id, CarImages.carListingId))
      .orderBy(desc(Carlisting.id))
      .limit(10);

    const resp = Service.FormatResult(result);
    console.log(resp);
    setCarList(resp);
    
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-28 mb-20">
      <h1 className="font-bold text-2xl sm:text-3xl text-center mt-16 mb-7">
        MOST SEARCHED CARS
      </h1>
      <Carousel>
        <CarouselContent className="flex gap-4">
          {carList.map((car, index) => (
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
