import { BaseSyntheticEvent } from 'react';
import { Button, Typography } from "@mui/material"
import { useState } from "react"


const Upload = () => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const chooseFile = (event: BaseSyntheticEvent) => {
    // console.log(event.target.files); 
    // console.log(event)
    setFile(event.target.files[0])
  }
  const handleUpload = (event: any) => {
    if(file === undefined){
      alert('You did not choose a file!')
    }
    else{
      let data = new FormData()
      data.append('file', file)
      let options = {
        method: 'POST',
        // headers: {'Authorization': localStorage.getItem('token')},
        body: data
      }
      fetch('http://127.0.0.1:5000/upload', options)
        .then(response => {
          console.log(response)
          console.log(response.body)
          console.log(response.body?.getReader())
          return response.body
        })
    }
  }
  return(
    <div className="title">
      <h2 data-text="Motionary...">
        Motionary...
      </h2>
      <Button variant="outlined" component="label">
        Choose File
        <input
          type="file"
          hidden
          onChange={chooseFile}
        />
      </Button>
      {file == undefined ? undefined : <Typography>Chosen File: {file.name}</Typography>}
      <Button variant="outlined" component="label" onClick={handleUpload}>
          Upload File
      </Button>
      {/* {file && (

        <Button variant="outlined" component="label" onClick={handleUpload}>
          Upload File
        </Button>
      )} */}
    </div>
  )
}

export default Upload 