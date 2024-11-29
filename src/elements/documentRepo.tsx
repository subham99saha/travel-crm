// @ts-nocheck
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../base-components/Button";
import axios from "axios";
import api from "../../apiconfig.json";

import { Slideover } from "../base-components/Headless";

function DocumentRepo(props) {
  const [repoFor, setRepoFor] = useState(props.repoFor);
  const [repository, setRepository] = useState([]);
  const [gallerySlideover, setGallerySlideover] = useState(false);
  const [reload,setReload] = useState(0)
  const [gallDocuments, setGallDocuments] = useState([]);

  useEffect(() => {
    const URL = `${api.API_URL}${api.API_ENDPOINT.DOCUMENT_REPO}`;
    axios.post(`${URL}/view-gallery?folder=${props.folder}`, {}, {
        headers: {},
    }).then((result)=>{
        // console.log({result})
        setGallDocuments(result)
    });      
      
  },[reload])

  const uploadGallDocument = async () => {
    var formData = new FormData();
    Object.keys(repository).map((Key) => {
    // repository.map((Key) => {
      formData.append('files', repository[Key]);
    });
    // console.log({galleryObj})
    for (var [key, value] of formData.entries()){
      console.log(key,value);
    }
    // let x = await dispatch(uploadGalleryDocument(formData))
    const URL = `${api.API_URL}${api.API_ENDPOINT.DOCUMENT_REPO}`;
    axios.post(`${URL}/upload-multi-document/${props.folder}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }).then((result)=>{
      setGallDocuments(result.data.filenames)
      console.log(result.data)
      // setSuccessMsg(result.data.filenames.length + ' documents uploaded succesfully.') 
      setReload(reload + 1) 
    }).catch(err => {
      console.log({err})
    });      
  }

  return (
    <div>
    <Button id="chooseDoc" variant="primary" size="" type="button" onClick={() => setGallerySlideover(true)} className="mr-1 mt-2" >Choose Document</Button>
    <Button id="cancelDoc" variant="primary" size="" type="button" onClick={() => props.cancelChosenDoc(props.repoFor)} className="mr-1 mt-2" >Cancel</Button>

    { (props.chosen.length != 0) ?
        <div className="">
        {props.chosen.map((doc,i) => {
            if (doc === '' || doc === undefined)
                return
            return <div key={i} className="mt-3 grid grid-cols-8 gap-2">
                <div className="col-span-7">{doc}</div> 
                <div className="col-span-1">
                  <Link to={`${api.FILE_PATH}documents/crm-lead/${doc}`} target="_blank" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-from-square"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                  </Link>
                </div>
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
              Select Document
            </h2>
          </Slideover.Title>
          <Slideover.Description>

          <h2 className="mr-auto text-base font-medium my-2">
            Upload documents to repository
          </h2>
          <div className="my-2">            
            <input style={{width:'100%'}} className="" type="file" onChange={(e) => { setRepository(e.target.files) }} multiple />
          </div>  
          <div className="my-2">
            <Button variant="primary" size="sm" type="button" onClick={() => {console.log({repository}); uploadGallDocument();}} className="w-24 mr-1 mt-2">
              Upload
            </Button>
            <Button variant="primary" size="sm" type="button" onClick={() => setReload(reload + 1)} className="w-24 mr-1 mt-2">
              Refresh
            </Button>
          </div>          
          
          <div className="grid grid-cols-12 gap-2">
          {gallDocuments.data?.files?.map((file, Key) => {
            var border = ''
            // if (props.chosen.includes(file) && repoFor === 'aadhar') {
            if (props.chosen.includes(file)) {
              border = 'border-dashed'
            }
            return <div key={Key} className="m-1 p-2 col-span-6" onClick={() => {  
              props.handleSelect(file,props.repoFor);             
            }}>
              <div className={`${border} border-4 border-primary rounded-xl p-4`}>
              {file}
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

export default DocumentRepo;