import React from 'react';
import Textarea from "@/components/ui/textarea";

function TextArea({ item, handleInputChange, carInfo }) {
  return (
    <div>
      <Textarea
        item={item}
        handleInputChange={handleInputChange}
        carInfo={carInfo}
      />
    </div>
  );
}

export default TextArea;
