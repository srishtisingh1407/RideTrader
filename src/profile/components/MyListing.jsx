import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../../configs/index";
import { CarImages, Carlisting } from "../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "@/Data/Service";
import CarItems from "@/components/CarItems";
import { Trash2Icon } from "lucide-react";

function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    if (user) {
      GetUserCarListing();
    }
  }, [user]);

  const GetUserCarListing = async () => {
    try {
      const result = await db
        .select()
        .from(Carlisting)
        .leftJoin(CarImages, eq(Carlisting.id, CarImages.carListingId))
        .where(eq(Carlisting.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Carlisting.id));

      const resp = Service.FormatResult(result);
      console.log("Fetched Car Listings:", resp); // Debugging log
      setCarList(resp); // Set the car list state
    } catch (error) {
      console.error("Error fetching car listings:", error); // Handle any errors
    }
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-0">
          My Listings!
        </h2>
        <Link to="/add-list">
          <Button>+ Add New Listing</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
        {carList.length > 0 ? (
          carList.map((item, index) => (
            <div key={index}>
              <CarItems car={item} />
              <div className="p-2 bg-gray-50 rounded-lg flex gap-2">
              <Button className="w-full">Edit</Button>
              <Button variant="destructive"> <Trash2Icon></Trash2Icon></Button>
            </div>
            </div>
          

          ))
        ) : (
          <p>No listings found.</p> // Display a message if there are no listings
        )}
      </div>
    </div>
  );
}

export default MyListing;
