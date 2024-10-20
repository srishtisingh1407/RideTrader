import React from "react";
import { Input } from "./ui/input";

function InputField({ item,handleInputChange,carInfo }) {
  return (
    <div>
      <Input
        type={item?.fieldType}
        name={item?.name}
        required={item?.required}
        onChange={(e)=>handleInputChange(item.name,e.target.value)}
        defaultValue={carInfo?.[item.name]}
      />
    </div>
  );
}

export default InputField;
