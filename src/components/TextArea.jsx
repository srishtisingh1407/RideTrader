import React from 'react'
import { Textarea } from "@/components/ui/textarea"


function TextArea({item,  handleInputChange}) {
  return (
    <div >
        <Textarea onValueChange={(e)=>handleInputChange(item.name,e.target.value)} />

    </div>
  )
}

export default TextArea