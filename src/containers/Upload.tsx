import { BaseSyntheticEvent, useEffect } from 'react';
import { Button, Typography } from "@mui/material"
import { useState } from "react"
import PacmanLoader from "react-spinners/PacmanLoader" 
import ScaleLoader from "react-spinners/ScaleLoader"
import { RingLoader } from 'react-spinners';
import Papa from 'papaparse';
import { Rows } from '../common/common';
const Upload = () => {
  const [loading, setLoading] = useState<boolean>(false); 
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState<string[][]>([]); 
  const [tableRows, setRows] = useState<Rows[]>([])
  const [result, setResult] = useState<string>(""); 

  useEffect(() => {
    console.log(tableRows)
    console.log(data)
  }, [tableRows, data])

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
      setLoading(!loading);
      fetch('http://127.0.0.1:5000/upload', options)
        .then(response => response.body)
        .then(body => {
          const reader = body?.getReader()
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
            // console.log(temp)
            // let csvData = new Blob([temp], { type: 'text/csv' });  
            // let csvUrl = URL.createObjectURL(csvData);

            // let hiddenElement = document.createElement('a');
            // hiddenElement.href = csvUrl;
            // hiddenElement.target = '_blank';
            // hiddenElement.download = 'out' + '.csv';
            // hiddenElement.click();
          })
          return body;
        })
        .then(body => setLoading(false))
        .catch(err => {
          console.log(err)
        })
    }
  }
  const downloadResult = (event: any) => {
    let csvData = new Blob([result as BlobPart], { type: 'text/csv' });  
    let csvUrl = URL.createObjectURL(csvData);

    let hiddenElement = document.createElement('a');
    hiddenElement.href = csvUrl;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'out' + '.csv';
    hiddenElement.click();

    const res = Papa.parse(result, {header: false})
    setData(res.data as string[][])
    const wow = data.map(row => ({Description: row[3], Type: row[4]}))
    setRows(wow)
  }
  return(
    <div className="upload-container">
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
          <div className="loading-container">
            <RingLoader size={45} color={"#ff5900"} loading={loading}/>
          </div>
          
          {result == "" ? 
          <div className='gray-button'>
          <Button variant="contained" component="label" onClick={handleUpload} disabled={file ? false : true}>
              Upload File
          </Button>
          </div>
          :
          <Button variant="contained" component="label" onClick={downloadResult}>
              Download Result
          </Button>
          }
          {/* {file && (

            <Button variant="outlined" component="label" onClick={handleUpload}>
              Upload File
            </Button>
          )} */}
        </div>
        <div  className="loading-container">
           {/* <PacmanLoader color={"#ff5900"} loading={loading} size={50}/> */}
           {/* <ScaleLoader color={"#ff5900"} loading={loading} />  */}
           
        </div>
    </div>
  )
}

export default Upload 