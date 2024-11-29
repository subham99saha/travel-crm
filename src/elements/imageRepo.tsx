// @ts-nocheck
import { useState, useEffect } from "react";
import Button from "../base-components/Button";
import axios from "axios";
import api from "../../apiconfig.json";

import { Slideover } from "../base-components/Headless";

function ImageRepo(props) {
  const [repoFor, setRepoFor] = useState(props.repoFor);
  const [repository, setRepository] = useState([]);
  const [gallerySlideover, setGallerySlideover] = useState(false);
  const [reload,setReload] = useState(0)
  const [gallImages, setGallImages] = useState([]);

  useEffect(() => {
    const URL = `${api.API_URL}${api.API_ENDPOINT.IMAGE_REPO}`;
    axios.post(`${URL}/view-gallery?folder=${props.folder}`, {}, {
        headers: {},
    }).then((result)=>{
        // console.log({result})
        setGallImages(result)
    });      
      
  },[reload])

  const uploadGallImage = async () => {
    var formData = new FormData();
    Object.keys(repository).map((Key) => {
    // repository.map((Key) => {
      formData.append('files', repository[Key]);
    });
    // console.log({galleryObj})
    for (var [key, value] of formData.entries()){
      console.log(key,value);
    }
    // let x = await dispatch(uploadGalleryImage(formData))
    const URL = `${api.API_URL}${api.API_ENDPOINT.IMAGE_REPO}`;
    axios.post(`${URL}/upload-multi-image/${props.folder}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).then((result)=>{
      setGallImages(result.data.filenames)
      console.log(result.data)
      // setSuccessMsg(result.data.filenames.length + ' images uploaded succesfully.') 
      setReload(reload + 1) 
    }).catch(err => {
      console.log({err})
    });      
  }

  return (
    <div>
    <Button id="chooseImg" variant="primary" size="" type="button" onClick={() => setGallerySlideover(true)} className="mr-1 mt-2" >Choose Image</Button>
    <Button id="cancelImg" variant="primary" size="" type="button" onClick={() => props.cancelChosenImg(props.repoFor)} className="mr-1 mt-2" >Cancel</Button>

    { (props.chosen.length != 0) ?
        <div className="grid grid-cols-12 gap-2">
        {props.chosen.map((img,i) => {
            if (img === '' || img === undefined)
                return
            return <div key={i} className="mt-3 col-span-2 input-form rounded-md " onClick={() => {}} style={{height:'100px', backgroundImage:`url(${api.API_URL}images/${props.folder}${img})`, backgroundPosition:'center', backgroundSize:'cover' }}>
                
            </div>
        })}
        
        </div>
    : '' }

    {/* Gallery Slide Over Content */}
    <div className="">
      <Slideover
        open={gallerySlideover}
        onClose={() => {
          setGallerySlideover(false);
        }}
      >
        <Slideover.Panel>
          <Slideover.Title className="p-5">
            <h2 className="mr-auto text-base font-medium">
              Select Image
            </h2>
          </Slideover.Title>
          <Slideover.Description>

          <h2 className="mr-auto text-base font-medium my-2">
            Upload images to repository
          </h2>
          <div className="my-2">            
            <input style={{width:'100%'}} className="" type="file" onChange={(e) => { setRepository(e.target.files) }} multiple />
          </div>  
          <div className="my-2">
            <Button variant="primary" size="sm" type="button" onClick={() => {console.log({repository}); uploadGallImage();}} className="w-24 mr-1 mt-2">
              Upload
            </Button>
            <Button variant="primary" size="sm" type="button" onClick={() => setReload(reload + 1)} className="w-24 mr-1 mt-2">
              Refresh
            </Button>
          </div>          
          
          <div className="grid grid-cols-12 gap-2">
          {gallImages.data?.files?.map((file, Key) => {
            var border = ''
            if (props.chosen.includes(file) && repoFor === 'gallImage') {
              border = '5px dashed white'
            }
            return <div key={Key} className="m-1 p-2 col-span-6" onClick={() => {  
              props.handleSelect(file,props.repoFor);             
            }}>
              <div className="rounded " style={{height:'200px', backgroundImage:`url(${api.API_URL}images/${props.folder}${file})`, backgroundPosition:'center', backgroundSize:'cover', border }}>
            
              </div>   
            </div>
          })}

          </div> 
          
          </Slideover.Description>
        </Slideover.Panel>
      </Slideover>
    </div>

    </div>
  );
}

export default ImageRepo;