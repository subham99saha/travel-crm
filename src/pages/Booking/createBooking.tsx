// @ts-nocheck
import { useState, useEffect, useRef, SetStateAction } from "react";
import { Link, useParams, useSearchParams, useHistory } from "react-router-dom";
// import { createBrowserHistory } from "history";
import Button from "../../base-components/Button";
import { Dialog, Tab } from "../../base-components/Headless";
import {
  FormInline,
  FormLabel,
  FormCheck,
} from "../../base-components/Form";

import EnquiryType from "../../elements/Booking/enquiryType"
import BookingDetails from "../../elements/Booking/bookingDetails"
import PaxDetails from "../../elements/Booking/paxDetails"

import Flight from "../../elements/Booking/requirements/flight"
import Train from "../../elements/Booking/requirements/train"
import Hotel from "../../elements/Booking/requirements/hotel"
import Car from "../../elements/Booking/requirements/car"
import Activity from "../../elements/Booking/requirements/activity"

import ReviewBooking from "../../elements/Booking/reviewBooking"
import Notify from "../../elements/notify"

import { fetchAllCity } from "../City/CitySlice";
import { fetchAllState } from "../State/StateSlice";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";

import { createLead, getLead, updateLead } from "./api"

  const createBooking = () => {    
    const params = useParams();
    // const [searchParams,] = useSearchParams( );
    // const id = searchParams.get('id')
    const id = params.id

    useEffect(() => {   
      async function fetchData() {   
        if (id != null) {
          const response = await getLead(id)
          // console.log({payload})
          console.log({reqs: JSON.parse(response.requirements)})
          if (response.id) {
            // let newPayload = {...payload}
            let newPayload = structuredClone(payload);
            // let newPayload = JSON.parse(JSON.stringify(payload));
            newPayload.enquiryType.enquiryType = response.enquiryType
            newPayload.bookingDetails = JSON.parse(response.bookingDetails)
            newPayload.paxDetails = JSON.parse(response.paxDetails)
            // newPayload.requirements = JSON.parse(response.requirements)

            const requirements = JSON.parse(response.requirements);

            // Update flight details
            newPayload.requirements.flight.show = requirements.flight.show;
            newPayload.requirements.flight.flightArr = requirements.flight.flightArr.map((flight) => ({
              ...flight
            }));

            // Update train details
            newPayload.requirements.train.show = requirements.train.show;
            newPayload.requirements.train.trainArr = requirements.train.trainArr.map((train) => ({
              ...train
            }));

            // Update hotel details
            newPayload.requirements.hotel.show = requirements.hotel.show;
            newPayload.requirements.hotel.hotelArr = requirements.hotel.hotelArr.map((hotel) => ({
              ...hotel,
              room: [...hotel.room]
            }));
            
            // // Update room details
            // requirements.hotel.hotelArr.map((hotel, index) => {
            //   console.log({index})
            //   // newPayload.requirements.hotel.hotelArr[index].rooms = [...requirements.hotel.hotelArr[index].rooms]
            //   newPayload.requirements.hotel.hotelArr[index].rooms = ['abc','defgh','ijk']
            // });

            // Update hotel details
            // newPayload.requirements.hotel.show = requirements.hotel.show;
            // newPayload.requirements.hotel.hotelArr = requirements.hotel.hotelArr.map((hotel, index) => {
            //   console.log(`Updating hotelArr[${index}] before:`, hotel.rooms);
            //   const updatedHotel = {
            //     ...hotel,
            //     // rooms: ['abc', 'defgh', 'ijk'] // Static values for testing
            //   };
            //   console.log(`Updating hotelArr[${index}] after:`, updatedHotel.rooms);
            //   return updatedHotel;
            // });


            // Update car details
            newPayload.requirements.car.show = requirements.car.show;
            newPayload.requirements.car.carArr = requirements.car.carArr.map((car) => ({
              ...car
            }));

            // Update activity details
            newPayload.requirements.activity.show = requirements.activity.show;
            newPayload.requirements.activity.activityArr = requirements.activity.activityArr.map((activity) => ({
              ...activity
            }));

            console.log({newPayload})
            setpayload(newPayload)
            // setpayload(prevState => ({
            //   ...prevState,
            //   ...newPayload
            // }));
            
            // console.log('Payload state after setting:', newPayload);
          }
          console.log({payload})
        }
      }
      fetchData();
      // console.log(id)
    },[])

    const [pax,setpax] = useState(1) 
    const [removedIdx,setremovedIdx] = useState() 
    const [reload,setreload] = useState(0) 
    const [isSuperUser,setisSuperUser] = useState(true) 

    const dispatch = useAppDispatch();
    const city = useAppSelector((state) => state.city).data;
    const state = useAppSelector((state) => state.state).data;
    useEffect(() => {
      dispatch(fetchAllCity());
      dispatch(fetchAllState());
      console.log({reload})
      setreload(reload + 1)
    },[]); 

    const [showEnquiry,setshowEnquiry] = useState(false)
    const [showBooking,setshowBooking] = useState(false)
    const [showPax,setshowPax] = useState(false)
    const [showRequirement,setshowRequirement] = useState(true)
    const closeAll = () => {
      setshowEnquiry(false); setshowBooking(false); setshowPax(false); setshowRequirement(false);
      // console.log({showEnquiry,showBooking,showPax,showRequirement})
    }
    const inactiveStyle = 'w-10 h-10 rounded-full text-slate-500 bg-slate-200 dark:bg-darkmode-400 dark:border-darkmode-400'

    // useEffect(() => {
    //   const username = JSON.parse(localStorage.getItem('userInfo')).resData.sUserName
    //   if (username.startsWith('SSTCO')) {
    //       setisSuperUser(false)
    //       editEnqType('Cor');
    //       setshowBooking(true); setshowEnquiry(false);
    //   } else if (username.startsWith('SSTC')) {
    //       setisSuperUser(false)
    //       editEnqType('TA');
    //       setshowBooking(true); setshowEnquiry(false);
    //   } else if (username.startsWith('SSTU')) {
    //       setisSuperUser(true)
    //       editEnqType('B2C');
    //       setshowBooking(false); setshowEnquiry(true);
    //   }
    // },[])

    const paxObj = {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      relationship: '',
      passportNo: '',
      passportDoc: '',
      aadharNo: '',
      aadharDoc: '',
      voterId: '',
      voterDoc: '',
    }
    const reqObj = {
      flight: {
        fromId: '',
        toId: '',
        date: '',
        preferrences: [{
            seating: 'W'
        }],
        flight: {}
      },
      train: {
        fromId: '',
        toId: '',
        date: '',
        preferrences: [{
            seating: 'L',
            class: 'SL'
        }],
        train: {}
      },
      hotel: {
        cityId: '',
        dayRange: '',
        startDate: '',
        endDate: '',
        preferrences: [{
            mealPlan: 'EP'
        }],
        hotel: {},
        room: []
      },
      car: {
        cityId: '',
        fromDate: '',
        toDate: '',
        departure: '',
        destination: '',
        noOfSeats: '',
        preferrences: [{}],
        cars: []
      },
      activity: {
        cityId: '',
        fromDate: '',
        toDate: '',
        adult: 0,
        kid: 0,
        infant: 0,
        activity: {}
      }
    }
    const [payload,setpayload] = useState({
      enquiryType: {
        enquiryType: 'B2C'
      },
      bookingDetails: {
        userId: '',
        businessName: '',
        name: '',
        email: '',
        mobile: '',
        whatsapp: '',
        skype: '',
        destination: '',
        travelType: '',
        dayRange: '',
        startDate: '',
        endDate: '',
        itineraryId: '',
        leadSource: '',
        budget: '',
        budgetFor: '',
      },
      paxDetails: {
        paxArr: [paxObj]
      },
      requirements: {
        flight: {
          show: false,
          flightArr: [reqObj.flight]
        },
        train: {
          show: false,
          trainArr: [reqObj.train]
        },
        hotel: {
          show: false,
          hotelArr: [reqObj.hotel]
        },
        car: {
          show: false,
          carArr: [reqObj.car]
        },
        activity: {
          show: false,
          activityArr: [reqObj.activity]
        }
      },
      savedRates: {},
      userId: JSON.parse(localStorage.getItem('userInfo')).resData.id,
      createdBy: JSON.parse(localStorage.getItem('userInfo')).resData.id
    })

    const editEnqType = (val) => {
      let newPayload = {...payload}
      newPayload.enquiryType.enquiryType = val
      setpayload(newPayload)
    }
    const editBooking = (field,val) => {
      // console.log({val})
      let newPayload = {...payload}
      newPayload.bookingDetails[field] = val
      setpayload({...newPayload})
    }
    const handlePax = (action,index) => {
      let newPayload = {...payload}
      if (action === 'add') {
        newPayload.paxDetails.paxArr.push({...paxObj})
        // Object.keys(reqObj).map(item => {
        //   for (let i = 0; i < newPayload.requirements[item][`${item}Arr`].length; i++) {
        //     let obj = {...reqObj[item].preferrences[0]}
        //     newPayload.requirements[item][`${item}Arr`][i].preferrences.push(obj)
        //     // console.log({i,obj})
        //   }
        // })
      } else {
        newPayload.paxDetails.paxArr.splice(index,1)
        // Object.keys(reqObj).map(item => {
        //   for (let i = 0; i < newPayload.requirements[item][`${item}Arr`].length; i++) {
        //     newPayload.requirements[item][`${item}Arr`][i].preferrences.splice(index,1)
        //   }
        // })
      }
      setpayload(newPayload)
      // console.log({payload})
    }
    const editPax = (index,field,val) => {
      let newPayload = {...payload}
      newPayload.paxDetails.paxArr[index][field] = val
      setpayload({...newPayload})
      // console.log({payload})
      // setpax(pax + 1)
    }
    const handleReqShow = (item) => {
      let newPayload = {...payload}
      newPayload.requirements[item].show = !(newPayload.requirements[item].show)
      setpayload(newPayload)
    }
    const handleReq = (action,item,index) => {
      let newPayload = {...payload}
      if (action === 'add') {
        let obj = JSON.parse(JSON.stringify(reqObj[item]))
        // for (let i = 0; i < newPayload.paxDetails.paxArr.length - 1; i++) {
        //   obj.preferrences.push({...reqObj[item].preferrences[0]})
        // }
        newPayload.requirements[item][`${item}Arr`].push(obj)
      } else {
        newPayload.requirements[item][`${item}Arr`].splice(index,1)
      }
      setpayload(newPayload)
      // console.log({payload})
    }
    const editReq = (item,index,field,val) => {
      let newPayload = {...payload}
      newPayload.requirements[item][`${item}Arr`][index][field] = val
      setpayload({...newPayload})
      // console.log({payload})
    }
    const editPref = (item,itemIdx,prefField,prefIdx,val) => {
      let newPayload = {...payload}
      newPayload.requirements[item][`${item}Arr`][itemIdx].preferrences[prefIdx][prefField] = val
      setpayload(newPayload)
    }
    const handleAprxPax = (item,itemIdx,action,prefIdx) => {
      // console.log(item,itemIdx,action,prefIdx)
      let newPayload = {...payload}
      if (action === 'add') {
        let obj = {...reqObj[item].preferrences[0]}
        newPayload.requirements[item][`${item}Arr`][itemIdx].preferrences.push(obj)
      } else if (newPayload.requirements[item][`${item}Arr`][itemIdx].preferrences.length != 1) {
        newPayload.requirements[item][`${item}Arr`][itemIdx].preferrences.splice(prefIdx,1)
      }      
      setpayload(newPayload) 
    }
    const editSavedRates = (field,val) => {
      let newPayload = {...payload}
      newPayload['savedRates'][field] = val
      // console.log({newPayload})
      setpayload(newPayload)
    }

    
    // let history = createBrowserHistory();
    const notifRef = useRef();
    const [saveConfirmationModal,setsaveConfirmationModal] = useState(false)
    const submit = async () => {
      console.log({submitted: payload})
      setsaveConfirmationModal(false)
      if (id != null) {
        const response = await updateLead(payload,id)
        console.log({response})
      } else {
        const response = await createLead(payload)
        console.log({response})
        // history.push("/bookings/all");
        // history.push("/bookings/all", { some: "state" });
      }
      notifRef.current.notifToggle('Success','Lead saved successfully');
    }

    const ratefieldNames = {
      rate: 'Base',
      rateAC: 'AC',
      rateNonAC: 'Non AC',
      rateChild: 'Child',
      rateExtraBed: 'Extra Bed',
      rateBreakfast: 'Breakfast',
      rateLunch: 'Lunch',
      rateDinner: 'Dinner',
      rateAdult: 'Adult',
      rateKid: 'Kid',
      rateInfant: 'Infant',
      rateGuide: 'Guide',
      season: 'season',
    }
  
    return (
      <>
      {/* <div
        className="fixed bottom-0 right-0 z-50 flex items-center justify-center w-40 h-12 mb-10 mr-10 border rounded-full shadow-md cursor-pointer box"
        
      >
        <div className="mr-4 text-slate-600 dark:text-slate-200">Dark Mode</div></div> */}
        <ReviewBooking requirements={payload.requirements} type={payload.enquiryType.enquiryType} editSavedRates={(field,val) => editSavedRates(field,val)} mode={`view`} saveBooking={() => setsaveConfirmationModal(true)}/>
        <Notify ref={notifRef} />
        <div className="flex items-center mt-8 intro-y">
          <h2 className="mr-auto text-lg font-medium">Create Booking</h2>
        </div>
        <div className="mt-5 relative before:hidden before:lg:block before:absolute before:w-[65%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-200 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 sm:px-20">
          <div className="z-10 flex items-center flex-1 intro-x lg:text-center lg:block">
            <Button onClick={() => {closeAll(); setshowEnquiry(true)}} variant={showEnquiry ? "primary" : ''} className={(!showEnquiry ? inactiveStyle : 'w-10 h-10 rounded-full')}>
              1
            </Button>
            <div className="ml-3 text-base font-medium lg:w-32 lg:mt-3 lg:mx-auto">
              Enquiry Type
            </div>
          </div>
          <div className="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:mt-0 lg:block">
            <Button onClick={() => {closeAll(); setshowBooking(true)}} variant={showBooking ? "primary" : ''} className={(!showBooking ? inactiveStyle : 'w-10 h-10 rounded-full')}>
              2
            </Button>
            <div className="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto text-slate-600 dark:text-slate-400">
              Booking Details
            </div>
          </div>
          <div className="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:mt-0 lg:block">
            <Button onClick={() => {closeAll(); setshowPax(true)}} variant={showPax ? "primary" : ''} className={(!showPax ? inactiveStyle : 'w-10 h-10 rounded-full')}>
              3
            </Button>
            <div className="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto text-slate-600 dark:text-slate-400">
              Pax Details
            </div>
          </div>
          <div className="z-10 flex items-center flex-1 mt-5 intro-x lg:text-center lg:mt-0 lg:block">
            <Button onClick={() => {closeAll(); setshowRequirement(true)}} variant={showRequirement ? "primary" : ''} className={(!showRequirement ? inactiveStyle : 'w-10 h-10 rounded-full')}>
              4
            </Button>
            <div className="ml-3 text-base lg:w-32 lg:mt-3 lg:mx-auto text-slate-600 dark:text-slate-400">
              Requirements
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <div className="col-span-12 intro-y lg:col-span-12">            
            <EnquiryType showEnquiry={showEnquiry} payload={payload} isSuperUser={isSuperUser} editEnqType={(val) => editEnqType(val)}/>
            <BookingDetails showBooking={showBooking} state={state} payload={payload} editBooking={(field,val) => editBooking(field,val)}/>
            <PaxDetails showPax={showPax} handlePax={(action,index) => {handlePax(action,index)}} editPax={(index,field,val) => {editPax(index,field,val)}} payload={payload}/>
            
            <div style={{display: (showRequirement) ? 'block' : 'none'}} className="p-5 mt-5 intro-y box">
                <div className="grid grid-cols-3">
                  <FormInline className="items-center first:pt-0 col-span-2">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Select Requirement</div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex flex-col sm:flex-row">
                        <FormCheck className="mr-5">
                            <FormCheck.Input id="checkbox-switch-1" type="checkbox" value="" onChange={() => handleReqShow('flight')} checked={payload.requirements.flight.show} />
                            <FormCheck.Label htmlFor="checkbox-switch-1">
                                Flight
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck className="mr-5">
                            <FormCheck.Input id="checkbox-switch-1" type="checkbox" value="" onChange={() => handleReqShow('train')} checked={payload.requirements.train.show} />
                            <FormCheck.Label htmlFor="checkbox-switch-1">
                                Train
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck className="mt-2 mr-5 sm:mt-0">
                            <FormCheck.Input id="checkbox-switch-2" type="checkbox" value="" onChange={() => handleReqShow('hotel')} checked={payload.requirements.hotel.show} />
                            <FormCheck.Label htmlFor="checkbox-switch-2">
                                Hotel
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck className="mt-2 mr-5 sm:mt-0">
                            <FormCheck.Input id="checkbox-switch-7" type="checkbox" value="" onChange={() => handleReqShow('car')} checked={payload.requirements.car.show} />
                            <FormCheck.Label htmlFor="checkbox-switch-7">
                                Car
                            </FormCheck.Label>
                        </FormCheck>
                        <FormCheck className="mt-2 mr-5 sm:mt-0">
                            <FormCheck.Input id="checkbox-switch-7" type="checkbox" value="" onChange={() => handleReqShow('activity')} checked={payload.requirements.activity.show} />
                            <FormCheck.Label htmlFor="checkbox-switch-7">
                                Activity
                            </FormCheck.Label>
                        </FormCheck>
                    </div>
                  </FormInline>
                  {(id != null) ? <div className="flex justify-end"><Link to={`/create-itinerary/${payload.bookingDetails.itineraryId}`} target="_blank" ><Button>Edit Itinerary</Button></Link></div> : '' }
                </div>
                <Tab.Group className="mt-10">
                  <Tab.List variant="tabs">
                      <Tab>
                          <Tab.Button className="w-full py-2" as="button">
                              Flight
                          </Tab.Button>
                      </Tab>
                      <Tab>
                          <Tab.Button className="w-full py-2" as="button">
                              Train
                          </Tab.Button>
                      </Tab>
                      <Tab>
                          <Tab.Button className="w-full py-2" as="button">
                              Hotel
                          </Tab.Button>
                      </Tab>
                      <Tab>
                          <Tab.Button className="w-full py-2" as="button">
                              Car
                          </Tab.Button>
                      </Tab>
                      <Tab>
                          <Tab.Button className="w-full py-2" as="button">
                              Activity
                          </Tab.Button>
                      </Tab>
                  </Tab.List>
                  <Tab.Panels className="border-b border-l border-r">
                      <Tab.Panel className="p-5 leading-relaxed">
                        <Flight 
                          city={city} 
                          flight={payload.requirements.flight}
                          handleReq={(action,item,index) => handleReq(action,item,index)} 
                          editReq={(item,index,field,val) => editReq(item,index,field,val)} 
                          editPref={(item,itemIdx,prefField,prefIdx,val) => editPref(item,itemIdx,prefField,prefIdx,val)}
                          handleAprxPax={(item,itemIdx,action,prefIdx) => handleAprxPax(item,itemIdx,action,prefIdx)}
                        />
                      </Tab.Panel>
                      <Tab.Panel className="p-5 leading-relaxed">
                        <Train 
                          city={city} 
                          train={payload.requirements.train}
                          handleReq={(action,item,index) => handleReq(action,item,index)} 
                          editReq={(item,index,field,val) => editReq(item,index,field,val)} 
                          editPref={(item,itemIdx,prefField,prefIdx,val) => editPref(item,itemIdx,prefField,prefIdx,val)}
                          handleAprxPax={(item,itemIdx,action,prefIdx) => handleAprxPax(item,itemIdx,action,prefIdx)}
                        />
                      </Tab.Panel>
                      <Tab.Panel className="p-5 leading-relaxed">
                        <Hotel 
                          city={city} 
                          hotel={payload.requirements.hotel}
                          enqType={payload.enquiryType.enquiryType}
                          handleReq={(action,item,index) => handleReq(action,item,index)} 
                          editReq={(item,index,field,val) => editReq(item,index,field,val)} 
                          editPref={(item,itemIdx,prefField,prefIdx,val) => editPref(item,itemIdx,prefField,prefIdx,val)}
                          handleAprxPax={(item,itemIdx,action,prefIdx) => handleAprxPax(item,itemIdx,action,prefIdx)}
                          fieldNames={ratefieldNames}
                        />
                      </Tab.Panel>
                      <Tab.Panel className="p-5 leading-relaxed">
                        <Car 
                          city={city} 
                          car={payload.requirements.car}
                          enqType={payload.enquiryType.enquiryType}
                          handleReq={(action,item,index) => handleReq(action,item,index)} 
                          editReq={(item,index,field,val) => editReq(item,index,field,val)} 
                          fieldNames={ratefieldNames}
                        />
                      </Tab.Panel>
                      <Tab.Panel className="p-5 leading-relaxed">
                        <Activity 
                          city={city} 
                          activity={payload.requirements.activity}
                          enqType={payload.enquiryType.enquiryType}
                          handleReq={(action,item,index) => handleReq(action,item,index)} 
                          editReq={(item,index,field,val) => editReq(item,index,field,val)} 
                          fieldNames={ratefieldNames}
                        />
                      </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                
                
                
                
            </div>

          </div>
          {/* <div className="intro-y">
            <Button
              variant="primary"
              type=""
              className="mt-3 mb-2 py-2 md:w-80"
              onClick={() => setsaveConfirmationModal(true)}
            >
              Save Booking
            </Button>
          </div> */}
          
          <Dialog
        open={saveConfirmationModal}
        onClose={() => {
          setsaveConfirmationModal(false);
        }}
        // initialFocus={deleteButtonRef}
    >
        <Dialog.Panel>
            <Dialog.Title>
                <h2 className="mr-auto text-base font-medium">
                    Save confirmation
                </h2>
            </Dialog.Title>
            <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
                <div className="col-span-12 sm:col-span-12">
                  Make sure to have filled all necessary booking, pax, and requirement details before saving. You can always edit them later though. Are you sure you want to save?
                </div>                
            </Dialog.Description>
            <Dialog.Footer>
                <Button type="button" variant="outline-secondary" onClick={()=> {
                      setsaveConfirmationModal(false);
                    }}
                    className="w-20 mr-1"
                    >
                    Cancel
                </Button>
                <Button variant="primary" type="button" onClick={() => submit()} className="mr-1">
                    Save Booking
                </Button>
            </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
        </div>

      </>)
  }
  
  export default createBooking;