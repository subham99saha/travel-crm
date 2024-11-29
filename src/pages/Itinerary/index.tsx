// @ts-nocheck
import _ from "lodash";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormHelp, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";

import { fetchAllItinerary, deleteItinerary } from "./ItinerarySlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import api from '../../../apiconfig.json';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClassicEditor } from "../../base-components/Ckeditor";
import axios from "axios";

const Main = () =>{
  const navigate = useNavigate();
  const server = api.FILE_PATH;
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.itinerary);
  // const [reload, setReload] = useState(0);
  // const [data, setData] = useState([]);

  useEffect(() => {
      dispatch(fetchAllItinerary());
  },[]);   

  //console.log("Data: ",data)

  const schema = yup
    .object({
      vName: yup.string().required("Name is a required field").min(2),
      //departureCityId: yup.string().required("Departure City is a required field"),
      //destinationCityId: yup.string().required("Destination City is a required field"),
    })
    .required();

    const {
        register,
        getValues,
        trigger,
        formState: { errors },
        reset,
        handleSubmit
      } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
      });
  const [whatsAppNo, setwhatsAppNo] = useState('');
  const [overlappingModalPreview, setOverlappingModalPreview] = useState(false);
  const [nextOverlappingModalPreview, setNextOverlappingModalPreview] = useState(false);
  const [smallModalSizePreview, setSmallModalSizePreview] = useState(false);
  const [editorData, setEditorData] = useState("");
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [sendProposalId, setsendPorposalId] = useState('');
  const [proposalFile, setProposalFile] = useState('');
  const deleteButtonRef = useRef(null);
  const deleteValueRef = useRef("");

  const handleDelete = (id: any) => {
    dispatch(deleteItinerary(deleteValueRef.current));
    //dispatch(fetchAllItinerary());
    // setReload(reload + 1)
    setDeleteConfirmationModal(false);
  };

  const handdleWhtasApp = ()=>{
    //console.log(whatsAppNo, proposalFile);
    //window.open(, '_blank');
    const msg = `${server}${proposalFile}`;
    window.open(`https://web.whatsapp.com/send?phone=${whatsAppNo}&text=${encodeURI(msg)}&app_absent=0`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=1080,height=600");
    setProposalFile('');
    setwhatsAppNo('');
    setSmallModalSizePreview(false);
  }

  const onSave = (type: any)=>{
    
    const savaData = {
      sendProposalTo : {
                        all : false,
                        bc : false,
                        bb: false,
                        cor: false
                      },
      bcEmail: '',
      bbEmail: '',
      corEmail: '',
      otherEmail: getValues('guestClient'),
      subject: getValues("subject"),
      body: editorData,
      itinerary: sendProposalId,
      isDraft: type
    }
  
    console.log("Test: ", savaData);
  
   // let formdata = new FormData();
  //   formdata.append("sendData", JSON.stringify(savaData));
  let sendData = JSON.stringify(savaData);
  
      console.log(sendData);
  
      const res = axios.post(`${api.API_URL}${api.API_ENDPOINT.SEND_PROPOSAL}/send-proposal`, sendData, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((result)=>{
        reset();
        setNextOverlappingModalPreview(true);
        setsendPorposalId('');
        setEditorData('');
      });      
  
  }

  

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Manage Itinerary</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Link to="/create-itinerary">
            <Button variant="primary" className="mr-2 shadow-md">
                Add Itinerary
            </Button>
          </Link>
          <Link to="/manage-image-repository">
            <Button variant="primary" className="mr-2 shadow-md">
                Manage Image Repository
            </Button>
          </Link>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                Excel
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                PDF
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <div className="hidden mx-auto md:block text-slate-500">
            {/* Showing 1 to 10 of 150 entries */}
          </div>
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2 table_section">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap rounded-tl-lg">
                  IMAGES
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  ITINERARY
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  CREATED ON
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  UPDATED ON
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  STATUS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  SHARE
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap rounded-tr-lg">
                  ACTIONS
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {_.take(data, data.length).map((item, Key) => (
                <Table.Tr key={Key} className="intro-x">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div className="flex">
                      <div className="w-20 h-20 image-fit zoom-in">
                      
                        <Tippy
                          as="img"
                          alt={`${item.id}-${item.tourName}`}
                          className="rounded-md shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          src={`${server}${item.thumbnail}`}
                          content={`${item.id}-${item.tourName}`}
                          onClick={()=>{
                            navigate(`/view-itinerary/${item.id}`)
                          }}
                        />
                        
                      </div>
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {/* <a href="" className="font-medium whitespace-nowrap"> */}
                    <Link to={`/view-itinerary/${item.id}`}>{item.tourName}</Link>
                    {/* </a> */}
                    <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                    ITINERARY CODE: {item.id}<br />
                    {(item.leadId) ? `LEAD CODE: ${item.leadId}` : '' }
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  { format(new Date(item.createdAt), 'yyyy/MM/dd kk:mm:ss') }
                    
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  { format(new Date(item.updatedAt), 'yyyy/MM/dd kk:mm:ss') }
                    
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <div
                        className={clsx([
                            "flex items-center justify-center",
                            { "text-success":  (item.isActive==='Y' ? true : false) },
                            { "text-danger": ! (item.isActive==='Y' ? true : false) },
                          ])} 
                    >
                      <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                      {item.isActive==='Y' ? "Active" : "Inactive"}
                      {item.publishToSite=='Y'? " (P)":" (NP)"}
                    </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                  <div 
                      className="flex items-center justify-center space-x-2" 
                    >
                      <Link
                        onClick={(event: React.MouseEvent) => {
                          event.preventDefault();
                          setProposalFile(item.thumbnail);
                          setSmallModalSizePreview(true);
                        }}
                      >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="currentColor"
                            style={{color: "#128c7e"}}
                            viewBox="0 0 24 24"
                            
                            >
                            <path
                              d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                          </Link>

                    <Link
                       onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        setsendPorposalId(item.id);
                        setOverlappingModalPreview(true);
                      }}
                    >
                      
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7"
                        fill="currentColor"
                        style={{color: "#ea4335"}}
                        viewBox="0 0 24 24">
                        <path
                          d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                          fill-rule="evenodd"
                          clip-rule="evenodd" />
                      </svg>
                      </Link>
                      </div>
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div 
                      className="flex items-center justify-center" 
                    >
                      {(item.pdfFilePath)?
                      <Link target="blank" to={`${api.FILE_PATH}pdf/${item.pdfFilePath}`}>
                      <a className="flex items-center mr-3" >
                        <Lucide icon="Download" className="w-4 h-4 mr-1" />
                        PDF
                      </a>
                      </Link>
                      : 
                      
                      <a className="flex items-center mr-3 text-danger" >
                        <Lucide icon="XCircle" className="w-4 h-4 mr-1" />
                        PDF
                      </a>
                      
                      }
                      <Link to={`/create-itinerary/${item.id}`}>
                      <a className="flex items-center mr-3" >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                        Edit
                      </a>
                      </Link>
                      <a
                        className="flex items-center text-danger"
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          deleteValueRef.current = item.id;
                          setDeleteConfirmationModal(true);
                          
                        }}
                      >
                        <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                      </a>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        {/* <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link>
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>1</Pagination.Link>
            <Pagination.Link active>2</Pagination.Link>
            <Pagination.Link>3</Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
          <FormSelect className="w-20 mt-3 !box sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </FormSelect>
        </div> */}
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
        }}
        initialFocus={deleteButtonRef}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
              ref={deleteButtonRef}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Delete Confirmation Modal */}

      {/* BEGIN: Send Prposal */}
                  <Dialog
                      size="xl"
                      open={overlappingModalPreview}
                      onClose={() => {
                        setOverlappingModalPreview(false);
                      }}
                    >
                      <Dialog.Panel className="px-5 py-10">
                        <div className="text-center">
                        <form className="validate-form" >
                          <div className="mb-5">
                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput
                                    {...register("guestClient")}
                                    id="guestClient"
                                    type="text"
                                    placeholder="Client Mail Id"
                                />
                                <FormHelp className="text-right">
                                    Maximum character 0/200
                                </FormHelp>
                                </div>
                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                <FormInput
                                    {...register("subject")}
                                    id="subject"
                                    type="text"
                                    placeholder="Proposal Subject"
                                />
                                <FormHelp className="text-right">
                                    Maximum character 0/200
                                </FormHelp>
                                </div>
                                <div className="flex-1 w-full mt-3 xl:mt-0">
                                <ClassicEditor
                                  value={editorData}
                                  onChange={setEditorData}
                                />
                                {/* <FormHelp className="text-right">
                                    Maximum character 0/15
                                </FormHelp> */}
                                </div>
                          </div>
                        </form>
                          {/* BEGIN: Overlapping Modal Toggle */}
                          <div class="text-center space-x-2">
                          <Button
                            as="a"
                            href="#"
                            variant="primary"
                            onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                              onSave('N');
                              
                            }}
                          >
                            Send
                          </Button>

                          <Button
                            as="a"
                            href="#"
                            variant="primary"
                            onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                              setOverlappingModalPreview(false);
                              
                            }}
                          >
                            Close
                          </Button>
                          </div>
                          
                          {/* END: Overlapping Modal Toggle */}
                        </div>
                        {/* BEGIN: Overlapping Modal Content */}
                        <Dialog
                          open={nextOverlappingModalPreview}
                          onClose={() => {
                            setNextOverlappingModalPreview(false);
                          }}
                        >
                          <Dialog.Panel className="p-5 text-center">
                                Proposal has been sent successfully 
                          </Dialog.Panel>
                        </Dialog>
                        {/* END: Overlapping Modal Content */}
                      </Dialog.Panel>
                    </Dialog>
          {/* END: Send Prposal */}
          {/* BEGIN: Small Modal Content */}
          <Dialog
                      size="sm"
                      open={smallModalSizePreview}
                      onClose={() => {
                        setSmallModalSizePreview(false);
                      }}
                    >
                      <Dialog.Panel className="p-10 text-center">
                      <div className="text-center">
                        <form className="validate-form" >
                          <div className="mb-5">
                            <FormInput 
                            type="text"
                            name="whatsAppNo"
                            value={whatsAppNo}
                            onChange={(e)=>setwhatsAppNo(e.target.value)}
                            placeholder="Enter WhatsApp Number"
                            />
                          </div>
                        </form>
                        </div>
                        <div class="text-center space-x-2">
                        <Button
                            as="a"
                            href="#"
                            variant="primary"
                            onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                              handdleWhtasApp();
                              
                            }}
                          >
                            Send
                          </Button>
                        <Button
                            as="a"
                            href="#"
                            variant="primary"
                            onClick={(event: React.MouseEvent) => {
                              event.preventDefault();
                              setSmallModalSizePreview(false);
                              
                            }}
                          >
                            Close
                          </Button>
                        </div>
                      </Dialog.Panel>
                    </Dialog>
                    {/* END: Small Modal Content */}
    </>
  );
}

export default Main;