import React from "react";
import Logo from '../assets/Logo.svg'

function LogoImage() {
  return (
    <div className="flex gap-2 ">
      <img src={Logo} alt="" />
      <h2 className="font-bold mt-2">RideTrader</h2>
    </div>
  );
}

export default LogoImage;
