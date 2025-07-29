import React, { useState } from 'react'
import "./App.css";
import axios from "axios"

const App = () => {
    const [file, setFile] = useState()

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

  return (
    <div>
        <input type="file" onChange={e => setFile(e.target.files[0])}/>
        <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default App