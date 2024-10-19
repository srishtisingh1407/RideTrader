import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../../configs/index";
import { CarImages, Carlisting } from "../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "@/Data/Service";
import { Item } from "@radix-ui/react-select";

function MyListing() {
  const { user } = useUser();
  const [carList,setCarList]=useState([]);

  useEffect(() => {
    user && GetUserCarListing();
  }, [user]);
  const GetUserCarListing = async () => {
    const result = await db
      .select()
      .from(Carlisting)
      .leftJoin(CarImages, eq(Carlisting.id, CarImages.carListingId))
      .where(eq(Carlisting.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Carlisting.id));

    const resp = Service.FormatResult(result);
    console.log(resp);
  };
  return (
    <div className="mt-6">
      {" "}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-0">
          My Listings!
        </h2>
        <Link to={"/add-list"}>
          <Button>+ Add New Listing</Button>
        </Link>
      </div>

<div>
  {carList.map((item,index)=>(
    <div>

    </div>
  ))}
</div>

    </div>
  );
}

export default MyListing;
