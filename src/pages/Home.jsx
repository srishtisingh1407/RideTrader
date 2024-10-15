import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import MostSearchedCar from "@/components/MostSearchedCar";
import React from "react";

function Home() {
  return (
    <div>
      <div className="bg-blue-200 rounded-b-[100px]">
        <Header />
        <Hero />
      </div>

      <Category />
      <MostSearchedCar/>
      <InfoSection/>
      <Footer/>
    </div>
  );
}

export default Home;
