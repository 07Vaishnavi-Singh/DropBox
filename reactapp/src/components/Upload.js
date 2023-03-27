import React,{useState} from 'react'
import axios from "axios"
import UploadFile from "./Upload.css"


const retrieveFile=()=>{

}


const handleSubmit=()=>{

}




export default function Upload() {

    const [file, setfile] = useState(null)
    const [fileName, setFileName] = useState("No image selected")










  return (



    <>








<form className="form" onSubmit={handleSubmit}> 
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
        //   disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: </span>
        <button type="submit" className="upload" d>
          Upload File
        </button>
      </form>












    </>
  )
}
