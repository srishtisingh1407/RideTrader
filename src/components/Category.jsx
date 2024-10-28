import Data from "@/Data/Data";
import React from "react";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="mt-16 text-center">
      <h1 className="font-bold mb-7 text-3xl inline-block0 px-4 py-2 rounded-lg border-blue-400 border-1">
        BROWSE BY TYPE
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20">
        {Data.Category.map((category, index) => (
          <Link to={'/search/'+category.name}>
          <div
            key={index}
            className="flex flex-col border-2 border-blue-200 rounded-md items-center hover:shadow-blue-500 hover:shadow-2xl cursor-pointer"
          >
            <img
              src={category.icon}
              width={35}
              height={35}
              alt={category.name}
            />
            <h2 className="mt-2 text-center font-semibold">{category.name}</h2>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
