import React,{useState} from 'react'
import axios from "axios"
import UploadFile from "./Upload.css"









export default function Upload({ contract, account, provider }) {

    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState("No image selected")



    const handleSubmit=async(e)=>{
        e.preventDeafualt();
        if(file){
        try {
            // an object to send to pinata
            const formData = new FormData();
            formData.append("file", file);
        
            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                  pinata_api_key: `
                  e19c5aff3cee22dced88`,
                  pinata_secret_api_key: `
                  f9527373aff724d51d51c79c065e0023040ba53ed9c17b526f542ed3efec6d95`,
                  "Content-Type": "multipart/form-data",
                },
              });
        
        
              const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        
        
        
          const signer = contract.connect(provider.getSigner());
                signer.add(account, ImgHash);
        
            }catch (e) {
                alert("Unable to upload image to Pinata");
              }
            }
            alert("Successfully Image Uploaded");
            setFileName("No image selected");
            setFile(null);
          }
        


    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
      };

      








  return (



    <>

<form className="form" onSubmit={handleSubmit}> 
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: </span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>

    </>
  )
}
