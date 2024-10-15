import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import AddList from "./AddList";

function Profile() {
  return (
    <div>
      <Header />
      <div className="px-4 md:px-10 lg:px-20 my-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-0">My Listings!</h2>
          <Link to={'/add-list'}>
            <Button>+ Add New Listing</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
