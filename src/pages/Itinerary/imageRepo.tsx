// @ts-nocheck
import { useState } from "react";
import Button from "../../base-components/Button";
import api from "../../../apiconfig.json";

function ImageRepo(props) {
//   const [preview, setPreview] = useState([])

  return (
    <div>
    <Button id="chooseImg" variant="primary" size="" type="button" onClick={props.handleSlideOver} className="mr-1 mt-2" >Choose Image</Button>
    <Button id="cancelImg" variant="primary" size="" type="button" onClick={props.cancelChosenImg} className="mr-1 mt-2" >Cancel</Button>

    { (props.chosen.length != 0) ?
        <div className="grid grid-cols-12 gap-2">
        {props.chosen.map((img,i) => {
            if (img === '' || img === undefined)
                return
            return <div key={i} className="mt-3 col-span-2 input-form rounded-md " onClick={props.handleImageClick(img)} style={{height:'100px', backgroundImage:`url(${api.API_URL}images/${props.repoFor}${img})`, backgroundPosition:'center', backgroundSize:'cover' }}>
                
            </div>
        })}
        
        </div>
    : '' }

    </div>
  );
}

export default ImageRepo;