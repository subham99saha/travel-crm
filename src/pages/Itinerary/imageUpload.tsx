// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from "react";
import Button from "../../base-components/Button";
import { Key } from "lucide-react";

function ImageUpload(props) {
  const hiddenSingleFileInput = useRef(null); 
  const hiddenMultiFileInput = useRef(null); 
  const handleClick = event => {
    if (props.multiple === 'true') {  
      hiddenMultiFileInput.current.click();
    } else {
      hiddenSingleFileInput.current.click();
    }
  };

  const [preview, setPreview] = useState([])
  const showChosenImage = (fileObjArr) => {
    let newPreview = []
    console.log({fileObjArr})
    Object.keys(fileObjArr).map(Key => {
      let fileObj = fileObjArr[Key]
      const objectUrl = URL.createObjectURL(fileObj)
      newPreview.push(objectUrl)
    })
    setPreview(newPreview)
  }

  return (
    <div>
    <input type="file" ref={hiddenSingleFileInput} style={{display: 'none'}} onChange={(e) => {console.log({id: props.id, files: e.target.files}); props.handleFile(e.target.files[0]); showChosenImage(e.target.files); }} />
    <input type="file" ref={hiddenMultiFileInput} style={{display: 'none'}} onChange={(e) => {console.log({id: props.id, files: e.target.files}); props.handleFile(e.target.files); showChosenImage(e.target.files); }} multiple />
    <Button id="thumbnail_chooseFile_btn" variant="primary" size="sm" type="button" onClick={handleClick} className="w-24 mr-1 mt-2" >Choose File</Button>
    <Button variant="primary" size="sm" type="button" onClick={props.uploadHandler} className="w-24 mr-1 mt-2">
      Upload
    </Button>
    <div className="grid grid-cols-12 gap-2">
      {preview.map((p,i) => {
        return <div key={i} className="mt-3 col-span-2 input-form rounded" style={{height:'100px', backgroundImage:`url(${p})`, backgroundPosition:'center', backgroundSize:'cover' }}>
        
        </div>
      })}
      
    </div>
    </div>
  );
}

export default ImageUpload;