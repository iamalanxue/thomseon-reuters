import { BaseSyntheticEvent } from 'react';
import { Button, Typography } from "@mui/material"
import { useState } from "react"


const Upload = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [result, setResult] = useState<String>(""); 
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
        .then(response => response.body)
        .then(body => {
          const reader = body?.getReader()
          console.log(reader)
          reader?.read().then(function processText({done, value}) {
            let temp = ""
            let data = value ? value.length : 10
            for(var i = 0; i < data; i++) {
              let c = value ? value[i] : 80
              var char = String.fromCharCode(c); 
              if (char.match(/[^\r\n]+/g) !== null) {
                temp += char
              } else{
                temp += char
              }
            }
            setResult(temp);
            console.log(temp)
            let csvData = new Blob([temp], { type: 'text/csv' });  
            let csvUrl = URL.createObjectURL(csvData);

            let hiddenElement = document.createElement('a');
            hiddenElement.href = csvUrl;
            hiddenElement.target = '_blank';
            hiddenElement.download = 'out' + '.csv';
            hiddenElement.click();
          })
        })
        .catch(err => {
          console.log(err)
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