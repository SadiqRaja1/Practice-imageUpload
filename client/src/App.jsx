import React, { useEffect, useState } from 'react'
import "./App.css";
import axios from "axios"

const App = () => {
    const [file, setFile] = useState();
    const [image, setImage] = useState();

    const handleUpload = async(e) => {
        const formData = new FormData()
        formData.append("file", file)
        try{
            const res = await axios.post("http://localhost:3000/upload", formData)
            console.log(res);
        }catch (error){
            console.error(error)
        }
        
    }

    const getImage = async () => {
        try{
            const res = await axios.get("http://localhost:3000/getImage");
            console.log(res);
            setImage(res.data[0].image)
        }catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getImage()
    }, [])
    

  return (
    <div>
        <input type="file" onChange={e => setFile(e.target.files[0])}/>
        <button onClick={handleUpload}>Upload</button>
        <img src={`http://localhost:3000/Images/${image}`} alt="" />
    </div>
  )
}

export default App