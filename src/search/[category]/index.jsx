import Drop from "@/components/Drop";
import Header from "@/components/Header";
import { db } from "../../../configs/index";
import { CarImages, Carlisting } from "../../../configs/schema";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eq } from "drizzle-orm";
import Service from "@/Data/Service";
import CarItems from "@/components/CarItems";

function SearchByCategory() {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCarList();
  }, []);

  const GetCarList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(Carlisting)
      .innerJoin(CarImages, eq(Carlisting.id, CarImages.carListingId))
      .where(eq(Carlisting.category, category));

    const resp = Service.FormatResult(result);
    setCarList(resp);
    setLoading(false);
  };

  return (
    <div>
      <div className="pb-10">
        <Header />
      </div>

      <div className="p-16 bg-blue1 flex justify-center">
        <Drop />
      </div>
      <div>
        <h2 className="font-bold text-4xl p-14 md:px-20">{category}</h2>

        {/* LIST OF CARS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-10">
          {loading
            ? [1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow-md p-4 max-w-xs animate-pulse"
                >
                  <div className="h-[200px] bg-gray-300 rounded-t-xl mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ))
            : carList.map((item, index) => (
                <div key={index}>
                  <CarItems car={item} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default SearchByCategory;
