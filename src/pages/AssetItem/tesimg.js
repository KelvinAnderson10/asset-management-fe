
import React, { useRef, useState } from "react";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("")
  let reader = new FileReader();
  const ref = useRef(null)

  const handleSubmit = async () => {
    console.log("submit udh diprint");
    console.log(imageBase64);
  }

  return (
    <div>
      <h1>Upload and Display Image usign React Hook's</h1>
      {selectedImage && (
        <div>
        <img alt="not fount" width={"200px"} height={"200px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>{
          setSelectedImage(null)
          // document.getElementsByName("myImage").value = null
          ref.current.value = '';
          
      }}>Remove</button>
        </div>
      )}
      <br />
      <br /> 
      <input
        type="file"
        name="myImage"
        ref={ref}
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = () => {setImageBase64(reader.result)}
          
        }}
      />
      <button onClick={handleSubmit}>Submit Update</button>
    </div>
  );
};

export default UploadAndDisplayImage;