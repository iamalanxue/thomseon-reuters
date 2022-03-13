import { ChangeEvent, BaseSyntheticEvent } from 'react';
import { Button, Typography } from "@mui/material"
import { useState } from "react"


const Upload = () => {
  const [file, setFile] = useState<File | undefined>(); 
  const handleUpload = (event: BaseSyntheticEvent ) => {
    console.log(event.target.files); 
    console.log(event)
    setFile(event.target.files[0])
  }
  return(
    <div className="title">
      <h2 data-text="Motionary...">
        Motionary...
      </h2>
      <Button variant="outlined" component="label">
        Upload File
        <input
          type="file"
          hidden
          onChange={handleUpload}
        />
      </Button>
    </div>
  )
}

export default Upload 