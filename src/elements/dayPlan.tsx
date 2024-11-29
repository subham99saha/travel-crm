// @ts-nocheck
import _ from "lodash";
import { useState, useEffect } from "react";
import Button from "../base-components/Button";
import Lucide from "../base-components/Lucide";
import { Draggable } from "react-drag-reorder";
import { Slideover } from "../base-components/Headless";
import api from "../../apiconfig.json";
import axios from "axios";
import {
    FormSelect,
} from "../base-components/Form";

function DayPlan(props) {
    const filePath = api.FILE_PATH;

    const [hotel,setHotel] = useState([]);
    const [activity,setActivity] = useState([]);
    const [transport,setTransport] = useState([]);
    const [train,setTrain] = useState([]);
    const [cruise,setCruise] = useState([]);
    const [flight,setFlight] = useState([]);

    const [hotelSlideover, setHotelSlideover] = useState(false);
    const [transportSlideover, setTransportSlideover] = useState(false);
    const [activitySlideover, setActivitySlideover] = useState(false);
    const [trainSlideover, setTrainSlideover] = useState(false);
    const [cruiseSlideover, setCruiseSlideover] = useState(false);
    const [flightSlideover, setFlightSlideover] = useState(false);

    // const [allow,setAllow] = useState((props.type === 'edit') && (props.plan.length != 0) ? false : true)
    const [allow,setAllow] = useState(true)
    const [canEdit,setCanEdit] = useState((props.type === 'view') ? false : true)
    const [locations,setLocations] = useState(props.locations)

    const cols = props.cols || 3
    
    function removeDuplicatesFromArray(array, key) {
        const seen = {};
        return array.filter(item => {
          const keyValue = key ? item[key] : JSON.stringify(item);
          if (!seen[keyValue]) {
            seen[keyValue] = true;
            return true;
          }
          return false;
        });
      }

    const callAPIs = (cityIds) => {
        let URL;

        URL = `${api.API_URL}${api.API_ENDPOINT.VENDOR_HOTEL}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({res: result.data})
            let newHotel = removeDuplicatesFromArray([...hotel,...result.data],'id')
            setHotel(newHotel)
            
        }); 

        URL = `${api.API_URL}${api.API_ENDPOINT.ACTIVITY}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({result})
            let newActivity = removeDuplicatesFromArray([...activity,...result.data],'id')
            setActivity(newActivity)
        }); 

        URL = `${api.API_URL}${api.API_ENDPOINT.TRANSPORT}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({res: result.data})
            let newTransport = removeDuplicatesFromArray([...transport,...result.data],'id')
            setTransport(newTransport)
        }); 

        URL = `${api.API_URL}${api.API_ENDPOINT.TRAIN}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({res: result.data})
            let newTrain = removeDuplicatesFromArray([...train,...result.data],'id')
            setTrain(newTrain)
        }); 

        URL = `${api.API_URL}${api.API_ENDPOINT.CRUISE}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({res: result.data})
            let newCruise = removeDuplicatesFromArray([...cruise,...result.data],'id')
            setCruise(newCruise)
        }); 

        URL = `${api.API_URL}${api.API_ENDPOINT.FLIGHT}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({res: result.data})
            let newFlight = removeDuplicatesFromArray([...flight,...result.data],'id')
            setFlight(newFlight)
        });
    }    
    useEffect(() => {
        console.log('on change')
        let cityIds = [props.fromID,props.toID]

        let newLocations = [...new Set([...locations,...cityIds])]
        setLocations(newLocations)
        // setRenderer(renderer+1)
        // console.log({locations})
        callAPIs(newLocations)
        if (allow) {    
            // props.handleChange(plan)
            props.handleChange('locations',newLocations)
        }

        // setPlan([])
        // setLastTime(null)        
    },[props.fromID,props.toID])
    // console.log({hotel})
    // console.log({activity})
    // console.log({transport})
    // console.log({flight})
    // console.log([props.fromId,props.toId])
    
    const getCityName = (id) => {
        let c = props?.city?.data.filter(x => x.id === Number(id))
        return c?.[0]?.cityName
    }
    const getTransport = (id) => {
        let t = transport?.filter(x => x.id === id)
        return t?.[0]
    }
    const getHotel = (id) => {
        let h = hotel?.filter(x => x.id === id)
        return h?.[0]
    }
    const getActivity = (id) => {
      let a = activity?.filter(x => x.id === id)
      return a?.[0]
    } 
    const getTrain = (id) => {
      let t = train?.filter(x => x.id === id)
      return t?.[0]
    }   
    const getCruise = (id) => {
      let t = cruise?.filter(x => x.id === id)
      return t?.[0]
    }
    const getFlight = (id) => {
      let f = flight?.filter(x => x.id === id)
      return f?.[0]
    }

    const [startTime,setStartTime] = useState(null)
    const [lastTime,setLastTime] = useState(null)
    useEffect(() => {
        console.log({startTime,lastTime})
    },[startTime,lastTime])

    const [plan,setPlan] = useState(props.plan)
    const [prevPlan,setPrevPlan] = useState(props.plan)
    useEffect(() => {
        if (allow) {    
            // props.handleChange(plan)
            props.handleChange('plan',plan)
        }
        console.log({plan})

        for (let i = plan.length - 1; i >= 0; i--) {
            if (plan[i].lastTime != null) {
                setLastTime(plan[i].lastTime)
                break
            }
        }
    },[plan])

    const [currPlanIdx,setCurrPlanIdx] = useState(plan.length)
    const [planAction,setPlanAction] = useState('Add')
    useEffect(() => {
        console.log({currPlanIdx,planAction})
    },[currPlanIdx,planAction])

    const handlePlanDetails = (idx,field,val) => {
        let newPlan = [...plan]
        newPlan[idx][field] = val
        setPlan(newPlan)
        // console.log({plan: newPlan})
    }
    const modifyPlan = (index,item) => {
        let newPlan = [...plan]
        newPlan[index] = item
        setPlan(newPlan)
    }

    const removeItem = (index) => {
        let newPlan = [...plan]
        let stime = null, ltime = null

        if (lastTime === newPlan[index].lastTime) {
            // console.log('last item')
            let time = null
            for (let i = index - 1; i >= 0; i--) {
                if (newPlan[i].lastTime != null) {
                    // console.log('time found')
                    stime = newPlan[i].startTime
                    ltime = newPlan[i].lastTime
                    break 
                }
            }
            setStartTime(stime)
            setLastTime(ltime)
        }
        newPlan.splice(index,1)
        setPlan(newPlan)
        setCurrPlanIdx(newPlan.length)
    }

    const [acFilter,setAcFilter] = useState('Y')
    const [mpFilter,setMpFilter] = useState('EP')

    const checkFixture = (event1, event2) => {
        // console.log({event1,event2})
        if (event1 === null || event2 === null) {
            return true
        }

        const [hours1, minutes1] = event1.split(":").map(Number);
        const [hours2, minutes2] = event2.split(":").map(Number);
      
        if (hours1 < hours2) {
          return true;
        } else if (hours1 > hours2) {
          return false;
        } else {
          if (minutes1 <= minutes2) {
            return true;
          } else {
            return false;
          }
        }
    }

    const getAllTimes = (index) => {
        // console.log({indexForTime: index})
        // console.log({testPlan: plan})
        let prevLastTime = null, nextStartTime = null
        if (index != 0) {
            for (let i = index - 1; i >= 0; i--) {
                if (plan[i].lastTime != null) {
                    prevLastTime = plan[i].lastTime
                    // console.log({plt: prevLastTime})
                    break
                }
            }
        }
        if (index != (plan.length - 1)) {
            for (let i = index + 1; i < plan.length; i++) {
                if (plan[i].startTime != null) {
                    nextStartTime = plan[i].startTime
                    // console.log({nst: nextStartTime})
                    break
                }
            } 
        } 
        if (index === plan.length) {
            // nextStartTime = lastTime            
        }
        // console.log( { prevLastTime, nextStartTime } )
        return { prevLastTime, nextStartTime }
        // return { prevLastTime: '5:30', nextStartTime: '20:30' }
    }

    
    const [season, setSeason] = useState(props.season);
    const [seasonStr, setSeasonStr] = useState((props.season === 'On-season') ? 'Season' : 'OffSeason');
    useEffect(() => {
        setSeason(props.season)
        // console.log({season})
    },[props.season])
    
    return (
        <div>
        {(props.type === 'edit') && (prevPlan.length != 0) && (!allow) ? <div className="my-4">
            <h1>Existing Plan</h1>

            <div className="flex-container mt-2">
                <div className="grid grid-cols-12 gap-2">
                {/* <div><button onClick={() => setWords([...words,{x: 4}])}>Add Item</button></div> */}
                {/* <Draggable key={plan.length} onPosChange={getChangedPos}> */}
                    {prevPlan.map((item, idx) => {
                        return (
                            <div key={idx} className="flex-item mt-3 p-3 col-span-4 input-form border-primary rounded" style={{borderWidth:'2px'}}>
                                {(item.field === 'hotel') ? 
                                    <div>
                                        <h1 className="text-2xl"><b>{getHotel(item.id)?.hotelName}</b></h1>
                                        <b>{getCityName(getHotel(item.id)?.cityId)}</b>
                                    </div>
                                : ''}
                                {(item.field === 'transport') ? 
                                    <div>
                                        <h1 className="text-2xl"><b>{getTransport(item.id)?.transportName}</b></h1> 
                                        <b>{getTransport(item.id)?.departureTime}</b> - <b>{getTransport(item.id)?.arrivalTime}</b><br />
                                        <b>{getCityName(getTransport(item.id)?.cityId)}</b>
                                    </div>
                                : ''}
                                {(item.field === 'activity') ? 
                                    <div>
                                        <h1 className="text-2xl"><b>{getActivity(item.id)?.activityName}</b></h1>
                                        <b>{getActivity(item.id)?.startTime}</b> - <b>{getActivity(item.id)?.endTime}</b><br />
                                        <b>{getCityName(getActivity(item.id)?.cityId)}</b>
                                    </div> 
                                : ''}
                                {(item.field === 'train') ? 
                                    <div>
                                        <h1 className="text-2xl"><b>{getTrain(item.id)?.trainNo}</b></h1>
                                        <b>{getTrain(item.id)?.departureTime}</b> - <b>{getTrain(item.id)?.arrivalTime}</b><br />
                                        <b>{getCityName(getTrain(item.id)?.departureCityId)}</b> to <b>{getCityName(getTrain(item.id)?.destinationCityId)}</b>
                                    </div> 
                                : ''}
                                {(item.field === 'cruise') ? 
                                    <div>
                                        <h1 className="text-2xl"><b>{getCruise(item.id)?.cruiseNo}</b></h1>
                                        <b>{getCruise(item.id)?.departureTime}</b> - <b>{getCruise(item.id)?.arrivalTime}</b><br />
                                        <b>{getCityName(getCruise(item.id)?.cityId)}</b>
                                    </div> 
                                : ''}
                                {(item.field === 'flight') ? 
                                    <div>
                                        <h1 className="text-2xl"><b>{getFlight(item.id)?.flightName}</b></h1>
                                        <b>{getFlight(item.id)?.departureTime}</b> - <b>{getFlight(item.id)?.arrivalTime}</b><br />
                                        <b>{getCityName(getFlight(item.id)?.departureCityId)}</b> to <b>{getCityName(getFlight(item.id)?.destinationCityId)}</b>
                                    </div> 
                                : ''}
                                <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                                {item.field}
                                </span>
                            </div>
                        );
                    })}
                {/* </Draggable> */}
                </div>
            </div>

            {(!allow) ? <div className="mt-2">
                {/* <Button onClick={() => {setAllow(true); setLastTime(prevPlan[prevPlan.length - 1].lastTime); setStartTime(prevPlan[prevPlan.length - 1].startTime);}}>Edit Plan</Button> */}
                <Button onClick={() => setAllow(true)}>Edit Plan</Button>
            </div> : '' }
            {/* {(allow) ? <div className="mt-2">
                <Button onClick={() => {setPlan([...prevPlan]); setLastTime(prevPlan[prevPlan.length - 1].lastTime)}}>Copy Exisitng Plan</Button>
            </div> : '' } */}
        </div> : ''}
        {(allow) ? <div className="my-4">
            {/* <h1>Day Plan Viewer</h1> */}

            <div className="flex-container mt-2">
                <div className={`grid grid-cols-${cols} gap-2`}>
                {/* <div><button onClick={() => setWords([...words,{x: 4}])}>Add Item</button></div> */}
                {/* <Draggable key={plan.length} onPosChange={getChangedPos}> */}
                {plan.map((item, idx) => {
                        let seasonCheckHotel = (item.seasonStr) ? item.seasonStr : ((season === 'On-season') ? 'Season' : 'OffSeason') 
                        let seasonCheckTransport = (season === 'On-season') ? 'Season' : 'OffSeason'
                        let toggle = (String(item.isAC) === 'true') ? '' : 'Non'
                        let slideFunc = { hotel: () => { setHotelSlideover(true); setCurrPlanIdx(idx); setPlanAction('Replace') }, transport: () => { setTransportSlideover(true); setCurrPlanIdx(idx); setPlanAction('Replace') }, activity: () => { setActivitySlideover(true); setCurrPlanIdx(idx); setPlanAction('Replace') }, train: () => { setTrainSlideover(true); setCurrPlanIdx(idx); setPlanAction('Replace') }, cruise: () => { setCruiseSlideover(true); setCurrPlanIdx(idx); setPlanAction('Replace') }, flight: () => { setFlightSlideover(true); setCurrPlanIdx(idx); setPlanAction('Replace') } }
                        return (
                            <div key={idx} className="shadow-md rounded-lg p-5 m-2 border border-slate-200 border-solid" style={{/*borderWidth:'2px'*/}}>
                                {(item.field === 'hotel') ? 
                                    <div className="grid grid-cols-12  pb-2">
                                        <div className="col-span-8">
                                            <p className="text-sm font-semibold">{getHotel(item.id)?.hotelName}</p>
                                            <p className="text-xs font-semibold">{getCityName(getHotel(item.id)?.cityId)}</p>
                                            
                                            <p className="text-sm font-bold mt-2">₹{getHotel(item.id)?.['minRoomRent' + seasonCheckHotel + toggle + 'AC']}</p>
                                            <p className="text-xs">{(item.seasonStr) ? ((item.seasonStr === 'Season') ? 'Season' : 'Off-Season') : season} | {toggle} AC</p>

                                            <p className="text-xs mt-2">Meal Plan: <span class="font-semibold">{item.mealPlan}</span></p>
                                            <p className="text-xs">Get an extra bed for <span class="font-semibold">₹{getHotel(item.id)?.['minExtraBed' + seasonCheckHotel + toggle + 'AC']}</span></p>
                                                          
                                        </div>
                                        <div className="mb-3 col-span-4 text-right pl-2">
                                            <div className="mb-2 bg-dark rounded" style={{height:'50px', backgroundImage:`url(${filePath}/hotel/${getHotel(item.id)?.mainImg})`, backgroundPosition:'center', backgroundSize:'cover'}}>
                                                
                                            </div>
                                            {(canEdit) ? <div><FormSelect 
                                            className="text-xs"
                                            value={item.isAC}
                                            onChange={(e) => handlePlanDetails(idx,'isAC',e.target.value)}
                                            aria-label="Default select example">
                                                    <option value={true}>AC</option>
                                                    <option value={false}>Non AC</option>
                                            </FormSelect>
                                            <FormSelect 
                                            className="mt-1 text-xs"
                                            value={item.mealPlan}
                                            onChange={(e) => handlePlanDetails(idx,'mealPlan',e.target.value)}
                                            aria-label="Default select example">
                                                    <option value="EP">EP (Room rent only)</option>
                                                    <option value="AP">AP (B + L + D)</option>
                                                    <option value="MAP">MAP (B + L/D)</option>
                                                    <option value="CP">CP (B)</option>
                                            </FormSelect></div> : ''}
                                        </div>
                                    </div>
                                : ''}
                                {(item.field === 'transport') ?                                    
                                    <div className="grid grid-cols-12 pb-2">
                                        <div className="col-span-8">
                                        <p className="text-sm font-semibold">{getTransport(item.id)?.transportName}</p> 
                                        <p className="text-xs">{getTransport(item.id)?.departureTime} - {getTransport(item.id)?.arrivalTime}</p>
                                        <p className="text-xs font-semibold">{getCityName(getTransport(item.id)?.cityId)}</p>
                                            
                                        <p className="text-sm font-bold mt-2">₹{getTransport(item.id)?.['price' + seasonCheckHotel + toggle + 'AC']}</p>
                                        <p className="text-xs">{(item.seasonStr) ? ((item.seasonStr === 'Season') ? 'Season' : 'Off-Season') : season} | {toggle} AC | Seats {getTransport(item.id)?.noOfseat}</p>                                     

                                        </div>
                                        <div className="mb-3 col-span-4 text-right pl-2">
                                            <div className="mb-2 bg-dark rounded" style={{height:'50px', backgroundImage:`url(${filePath}/transport/${getTransport(item.id)?.mainImg})`, backgroundPosition:'center', backgroundSize:'cover'}}>
                                                
                                            </div>
                                            {(canEdit) ? <FormSelect 
                                            className="text-xs"
                                            value={item.isAC}
                                            onChange={(e) => handlePlanDetails(idx,'isAC',e.target.value)}
                                            aria-label="Default select example">
                                                    <option value={true}>AC</option>
                                                    <option value={false}>Non AC</option>
                                            </FormSelect> : ''}
                                        </div>
                                        <div className="col-span-12 my-3 text-center">
                                            <p className="text-xs">Travel comfortably in a private vehicle from {getTransport(item.id)?.departure} to {getTransport(item.id)?.destination}</p>  
                                        </div>
                                    </div>
                                : ''}
                                {(item.field === 'activity') ? 
                                    <div className=" pb-2">
                                        <div className="grid grid-cols-12" >
                                            <div className="col-span-8 pr-4">
                                                <p className="text-sm font-semibold">{getActivity(item.id)?.activityName}</p>
                                                <p className="text-xs">{getActivity(item.id)?.startTime} - {getActivity(item.id)?.endTime}</p>
                                                <p className="text-xs font-semibold">{getCityName(getActivity(item.id)?.cityId)}</p>
                                            </div>
                                            <div className="col-span-4 mb-2 bg-dark rounded" style={{height:'50px', backgroundImage:`url(${filePath}/activity/${getActivity(item.id)?.mainImg})`, backgroundPosition:'center', backgroundSize:'cover'}}>
                                                    
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="mt-2 text-xs mb-4">Enjoy this activity for an adult fee of <span className="font-bold">₹{getActivity(item.id)?.adultFee}</span></p>
                                            <p className="mt-2 text-xs mb-4">*An additional collective guide fee might be charged as well</p>
                                        </div>
                                    </div>
                                : ''}
                                {(item.field === 'train') ? 
                                    <div className="grid grid-cols-12  pb-2">
                                        <div className="col-span-8 pr-2">
                                            <p className="text-sm font-semibold">{getTrain(item.id)?.trainNo}</p>
                                            
                                            <div className="flex justify-between my-3">
                                                <div className="text-left">
                                                    <p className="text-base font-semibold mb-1">{getTrain(item.id)?.departureTime}</p>
                                                    {/* <p className="text-sm font-medium">Mon, 10 Jul</p> */}
                                                    <p className="text-xs font-medium">{getCityName(getTrain(item.id)?.departureCityId)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-base font-semibold mb-1">{getTrain(item.id)?.arrivalTime}</p>
                                                    {/* <p className="text-sm font-medium">Mon, 10 Jul</p> */}
                                                    <p className="text-xs font-medium">{getCityName(getTrain(item.id)?.destinationCityId)}</p>
                                                </div>
                                            </div> 

                                                                                                                  
                                        </div>
                                        <div className="mb-3 col-span-4 text-right pl-2">
                                            <div className="mb-2 bg-dark rounded" style={{height:'50px', backgroundImage:`url(${filePath}/train/${getTrain(item.id)?.mainImg})`, backgroundPosition:'center', backgroundSize:'cover'}}>
                                                
                                            </div>
                                            {(canEdit) ? <FormSelect 
                                            className="text-xs"
                                            value={(item.seatType) ? item.seatType : '3A' }
                                            onChange={(e) => handlePlanDetails(idx,'seatType',e.target.value)}
                                            aria-label="Default select example">
                                                    <option value="3A">3A</option>
                                                    <option value="2A">2A</option>
                                                    <option value="2S">2S</option>
                                                    <option value="1A">1A</option>
                                                    <option value="CC">CC</option>
                                                    <option value="EC">EC</option>
                                                    <option value="EV">EV</option>
                                            </FormSelect> : ''}
                                        </div>
                                        <div className="col-span-12 mt-3 text-center">
                                            <p className="text-xs mb-4 text-center">Catch this train to travel from {getCityName(getTrain(item.id)?.departureCityId)} to {getCityName(getTrain(item.id)?.destinationCityId)} in <b>{item.seatType}</b> seating, for a minimum ticket price of <span className="font-bold">₹{getTrain(item.id)?.[`price${(item.seatType) ? item.seatType : '3A' }`]}</span></p>         
                                        </div>
                                    </div>
                                : ''}
                                {(item.field === 'cruise') ? 
                                    <div className=" pb-2">
                                        <div className="grid grid-cols-12" >
                                            <div className="col-span-8 pr-4">
                                                <p className="text-sm font-semibold">{getCruise(item.id)?.cruiseNo}</p>
                                                <p className="text-xs">{getCruise(item.id)?.departureTime} - {getCruise(item.id)?.arrivalTime}</p>
                                                <p className="text-xs font-semibold">{getCityName(getCruise(item.id)?.cityId)}</p>
                                            </div>
                                            <div className="col-span-4 mb-2 bg-dark rounded" style={{height:'50px', backgroundImage:`url(${filePath}/cruise/${getCruise(item.id)?.mainImg})`, backgroundPosition:'center', backgroundSize:'cover'}}>
                                                    
                                            </div>
                                        </div>
                                        <div className="text-center my-4"> 
                                            <p className="text-xs ">Enjoy a ride on the {getCruise(item.id)?.cruiseNo} cruising from {getCruise(item.id)?.departure} to {getCruise(item.id)?.destination}, for a minimum individual ticket price of <span className="font-bold">₹{getCruise(item.id)?.price}</span></p>   
                                        </div>   
                                    </div>
                                : ''}
                                {(item.field === 'flight') ? 
                                    <div className=" pb-2">
                                        <p className="text-sm font-semibold">{getFlight(item.id)?.flightName}</p>
                                        
                                        <div className="flex justify-between my-3">
                                            <div className="text-left">
                                                <p className="text-base font-semibold mb-1">{getFlight(item.id)?.departureTime}</p>
                                                {/* <p className="text-sm font-medium">Mon, 10 Jul</p> */}
                                                <p className="text-xs font-medium">{getCityName(getFlight(item.id)?.departureCityId)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-base font-semibold mb-1">{getFlight(item.id)?.arrivalTime}</p>
                                                {/* <p className="text-sm font-medium">Mon, 10 Jul</p> */}
                                                <p className="text-xs font-medium">{getCityName(getFlight(item.id)?.destinationCityId)}</p>
                                            </div>
                                        </div> 

                                        <p className="text-xs mb-4 text-center">Catch this flight to travel from {getCityName(getFlight(item.id)?.departureCityId)} to {getCityName(getFlight(item.id)?.destinationCityId)} for a minimum ticket price of <span className="font-bold">₹{getFlight(item.id)?.price}</span></p>                                                                               
                                    </div>
                                : ''}
                                
                                {(canEdit) ? <div className="mt-2">
                                    {/* <span className="text-xs sm:ml-auto sm:mt-0 text-slate-500">{item.field[0].toUpperCase() + item.field.slice(1)}</span> */}
                                    <div className="mt-2">
                                        <Button className="mr-2 text-xs" onClick={slideFunc[item.field]}>Modify</Button>
                                        <Button className="mr-2 text-xs" onClick={() => removeItem(idx)}>Remove</Button>
                                    </div>
                                </div> : ''}
                            </div>
                        );
                    })}
                {/* </Draggable> */}
                </div>
            </div>
            {(canEdit) ? <div className="mt-3 grid gap-y-2 grid-cols-6">
                <Button
                    variant="primary"
                    className="mr-2 text-xs"
                    onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        setTrainSlideover(true);
                        setCurrPlanIdx(plan.length)
                        setPlanAction('Add')                    
                    }}
                >
                    {/* Add Train */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tram-front"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><path d="M8 15h.01"/><path d="M16 15h.01"/></svg>
                </Button>            
                <Button
                    variant="primary"
                    className="mr-2 text-xs"
                    onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        setFlightSlideover(true);
                        setCurrPlanIdx(plan.length)
                        setPlanAction('Add')                    
                    }}
                >
                    {/* Add Flight */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane-takeoff"><path d="M2 22h20"/><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"/></svg>
                </Button>
                <Button
                    variant="primary"
                    className="mr-2 text-xs"
                    onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        setTransportSlideover(true);
                        setCurrPlanIdx(plan.length)
                        setPlanAction('Add')                    
                    }}
                >
                    {/* Add Transport */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                </Button>
                <Button
                    variant="primary"
                    className="mr-2 text-xs"
                    onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        setHotelSlideover(true);
                        setCurrPlanIdx(plan.length)
                        setPlanAction('Add')                    
                    }}
                >
                    {/* Add Hotel */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hotel"><path d="M10 22v-6.57"/><path d="M12 11h.01"/><path d="M12 7h.01"/><path d="M14 15.43V22"/><path d="M15 16a5 5 0 0 0-6 0"/><path d="M16 11h.01"/><path d="M16 7h.01"/><path d="M8 11h.01"/><path d="M8 7h.01"/><rect x="4" y="2" width="16" height="20" rx="2"/></svg>
                </Button>
                <Button
                    variant="primary"
                    className="mr-2 text-xs"
                    onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        setActivitySlideover(true);
                        setCurrPlanIdx(plan.length)
                        setPlanAction('Add')                    
                    }}
                >
                    {/* Add Activity */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cable-car"><path d="M10 3h.01"/><path d="M14 2h.01"/><path d="m2 9 20-5"/><path d="M12 12V6.5"/><rect width="16" height="10" x="4" y="12" rx="3"/><path d="M9 12v5"/><path d="M15 12v5"/><path d="M4 17h16"/></svg>
                </Button>
                <Button
                    variant="primary"
                    className="mr-2 text-xs"
                    onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        setCruiseSlideover(true);
                        setCurrPlanIdx(plan.length)
                        setPlanAction('Add')                    
                    }}
                >
                    {/* Add Cruise */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ship"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/></svg>
                </Button>
            </div> : ''}


            {/* Hotel Slide Over Content */}
            <div className="">
            <Slideover
            open={hotelSlideover}
            // open={true}
            onClose={() => {
                setHotelSlideover(false);
            }}
            >
            <Slideover.Panel>
                <Slideover.Title className="p-5">
                <h2 className="mr-auto text-base font-medium">
                    Select Hotels
                </h2>
                <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500"><b>{getCityName(props.fromID)}</b> to <b>{getCityName(props.toID)}</b></span>
                </Slideover.Title>
                <Slideover.Description>
                <div className="grid grid-cols-12">
                    <div className="col-span-4 px-1">
                        <FormSelect 
                        value={acFilter}
                        onChange={(e) => setAcFilter(e.target.value)}
                        aria-label="Default select example">
                                <option value='Y'>AC</option>
                                <option value='N'>Non AC</option>
                        </FormSelect>
                    </div>
                    <div className="col-span-4 px-1">
                        <FormSelect 
                        value={mpFilter}
                        onChange={(e) => setMpFilter(e.target.value)}
                        aria-label="Default select example">
                                <option value="EP">EP (Room rent only)</option>
                                <option value="AP">AP (B + L + D)</option>
                                <option value="MAP">MAP (B + L/D)</option>
                                <option value="CP">CP (B)</option>
                        </FormSelect>
                    </div>
                    <div className="col-span-4 px-1">
                        <FormSelect 
                        value={seasonStr}
                        onChange={(e) => setSeasonStr(e.target.value)}
                        aria-label="Default select example">
                                <option value="Season">On-season</option>
                                <option value="OffSeason">Off-season</option>
                        </FormSelect>
                    </div>
                </div>
                {/* {(hotel?.data?.length != 0) ? _.take(hotel?.data, hotel?.data?.length).map((item, Key) => { */}
                {(hotel?.length != 0) ? _.take(hotel, hotel?.length).filter(x => [props.fromID,props.toID].includes(x.cityId) && ((acFilter === 'Y') ? (x['minRoomRent' + `${seasonStr}` + 'AC'] != '' ) : (x['minRoomRent' + `${seasonStr}` + 'NonAC'] != '' )) && x['is' + mpFilter] === 'Y').map((item, Key) => {
                let seasonCheck = (season === 'On-season') ? 'Season' : 'OffSeason' 
                let toggle = (acFilter === 'Y') ? '' : 'Non'
                let ACval = (acFilter === 'Y') ? true : false
                let on_click = () => {setPlan([...plan,{ id: item.id, field: 'hotel', isAC: ACval, mealPlan: 'EP', seasonStr, startTime: null, lastTime: null, others: [item.hotelName] }])}
                if (planAction === 'Replace') {
                    on_click = () => {modifyPlan(currPlanIdx,{ id: item.id, field: 'hotel', isAC: ACval, mealPlan: 'EP', seasonStr, startTime: null, lastTime: null, others: [item.hotelName] })}
                }
                return <div style={{cursor:'pointer'}} key={item.id} className="m-1 p-2 " onClick={on_click}>
                <div className="rounded" style={{height:'200px', backgroundImage:`url(${filePath}/hotel/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
                
                </div>
                <div className="grid grid-cols-12">
                    <div className="p-3 col-span-7"><p>
                    <h3 className="text-2xl"><b>{item.hotelName}</b></h3>
                    <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                        {getCityName(item.cityId)} 
                    </span><br />
                    {/* <b>{season} | No AC</b> - ₹{item['minRoomRent' + seasonCheck + 'NonAC']} <br /> */}
                    </p>
                    
                    <p className="mt-2">
                        {(item.isEP === 'Y') ? <span className="mr-2">EP</span>: ''}
                        {(item.isAP === 'Y') ? <span className="mr-2">AP</span>: ''}
                        {(item.isMAP === 'Y') ? <span className="mr-2">MAP</span>: ''}
                        {(item.isCP === 'Y') ? <span className="mr-2">CP</span>: ''}
                        {/* {(item.isAC === 'Y') ? <span className="mr-2">(AC)</span>: ''} */}
                    </p>
                    </div>
                    <div className="p-3 col-span-5 text-end" >
                    <b><span className="text-2xl">₹</span><span className="text-4xl">{item['minRoomRent' + seasonStr + toggle + 'AC']}</span></b><br />
                    {(seasonStr === 'Season') ? 'Season' : 'Off-Season'} | {toggle} AC
                    </div>
                </div>
                </div>
                }) : <div className="p-4">No hotels found for the selected city</div> }
                </Slideover.Description>
            </Slideover.Panel>
            </Slideover>
            </div> 

            {/* Transport Slide Over Content */}
            <div className="">
            <Slideover
            open={transportSlideover}
            // open={true}
            onClose={() => {
                setTransportSlideover(false);
            }}
            >
            <Slideover.Panel>
                <Slideover.Title className="p-5">
                <h2 className="mr-auto text-base font-medium">
                    Select Transport
                </h2>
                <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500"><b>{getCityName(props.fromID)}</b> to <b>{getCityName(props.toID)}</b></span>
                </Slideover.Title>
                <Slideover.Description>            
                <div className="grid grid-cols-12">
                    <div className="col-span-6 px-1">
                        <FormSelect 
                        value={acFilter}
                        onChange={(e) => setAcFilter(e.target.value)}
                        aria-label="Default select example">
                                <option value='Y'>AC</option>
                                <option value='N'>Non AC</option>
                        </FormSelect>
                    </div>
                    <div className="col-span-6 px-1">
                        <FormSelect 
                        value={seasonStr}
                        onChange={(e) => setSeasonStr(e.target.value)}
                        aria-label="Default select example">
                                <option value="Season">On-season</option>
                                <option value="OffSeason">Off-season</option>
                        </FormSelect>
                    </div>
                </div>
                {(transport?.length != 0) ? transport?.filter(x => [props.fromID,props.toID].includes(x.cityId) && x.isAC === acFilter).map((item, Key) => {
                let seasonCheck = (season === 'On-season') ? 'Season' : 'OffSeason'
                let toggle = (acFilter === 'Y') ? '' : 'Non'
                let ACval = (acFilter === 'Y') ? true : false
                // let disable = '', on_click = () => {setPlan([...plan,{ id: item.id, field: 'transport', isAC: false, startTime: item.departureTime, lastTime: item.arrivalTime }]); setStartTime(item.departureTime); setLastTime(item.arrivalTime)}
                let disable = '', on_click = () => {setPlan([...plan,{ id: item.id, field: 'transport', isAC: ACval, seasonStr, startTime: null, lastTime: null, others: [item.transportName] }])}
                if (planAction === 'Replace') {
                    on_click = () => {modifyPlan(currPlanIdx,{ id: item.id, field: 'transport', isAC: ACval, seasonStr, startTime: null, lastTime: null, others: [item.transportName] })}
                }
                // let checkTime = null
                // if (plan.length != 0) {
                //     checkTime = (plan[plan.length - 1].field === 'transport') ? startTime : lastTime
                // }
                // if (!checkFixture(checkTime,item.departureTime)) {
                //     disable = 'opacity-25 pe-none'
                //     on_click = () => {console.log('disabled')}
                // }                
                return <div style={{cursor:'pointer'}} key={item.id} className={`m-1 p-2 ${disable}`} onClick={on_click}>
                <div className="rounded bg-dark" style={{height:'200px', backgroundImage:`url(${filePath}/transport/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
                
                </div>
                <div className="grid grid-cols-12">
                    <div className="p-3 col-span-7"><p>
                    <h3 className="text-2xl"><b>{item.transportName}</b></h3>
                    <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                        {item.noOfseat}-seater
                    </span><br />
                    {/* <b>{season} | No AC</b> - ₹{item['price' + seasonCheck + 'NonAC']} <br /> */}
                    {/* <b>{item.departure}</b> to <b>{item.destination}</b> */}
                    <b>{getCityName(item.cityId)}</b>
                    </p>
                    
                    {/* <p className="mt-2">
                        {(item.isAC === 'Y') ? <span className="mr-2">(AC)</span>: ''}
                    </p> */}
                    </div>
                    <div className="p-3 col-span-5 text-end" >
                    <b><span className="text-2xl">₹</span><span className="text-4xl">{item['price' + seasonStr + toggle + 'AC']}</span></b><br />
                    {(seasonStr === 'Season') ? 'Season' : 'Off-Season'} | {toggle} AC<br />
                    <div className="mt-2"><b>{item.departureTime}</b> - <b>{item.arrivalTime}</b></div>
                    </div>
                </div>
                </div>
                }) : <div className="p-4">No transport found for the selected city</div> }            
                </Slideover.Description>
            </Slideover.Panel>
            </Slideover>
            </div>

            {/* Activity Slide Over Content */}
            <div className="">
            <Slideover
            open={activitySlideover}
            onClose={() => {
                setActivitySlideover(false);
            }}
            >
            <Slideover.Panel>
                <Slideover.Title className="p-5">
                <h2 className="mr-auto text-base font-medium">
                    Select Activity
                </h2>
                <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    <b>{getCityName(props.fromID)}</b> to <b>{getCityName(props.toID)}</b><br />
                    <b>{getAllTimes(currPlanIdx)?.prevLastTime ? (getAllTimes(currPlanIdx)?.prevLastTime) : '0:00'}</b> - <b>{getAllTimes(currPlanIdx)?.nextStartTime ? getAllTimes(currPlanIdx)?.nextStartTime : '24:00'}</b>
                </span>
                {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500"><b>{getAllTimes(currPlanIdx)?.prevLastTime}</b> to <b>{String(getAllTimes(currPlanIdx)?.nextStartTime)}</b></span> */}
                </Slideover.Title>
                <Slideover.Description>
                {(activity?.length != 0) ? activity?.filter(x => [props.fromID,props.toID].includes(x.cityId)).map((item, Key) => {
                let disable = '', on_click = () => {setPlan([...plan,{ id: item.id, field: 'activity', startTime: item.startTime, lastTime: item.endTime, others: [item.activityName] }]); setStartTime(item.startTime); setLastTime(item.endTime)}
                if (planAction === 'Replace') {
                    on_click = () => {modifyPlan(currPlanIdx,{ id: item.id, field: 'activity', startTime: item.startTime, lastTime: item.endTime, others: [item.activityName] })}
                }
                let disableCheck = () => {
                    if (currPlanIdx === null || currPlanIdx === (plan.length)) {
                        return !checkFixture(lastTime,item.startTime)
                    } else if (currPlanIdx === 0) {
                        // return !checkFixture(item.endTime,plan[currPlanIdx + 1].startTime)
                        return !checkFixture(item.endTime,getAllTimes(currPlanIdx)?.nextStartTime)
                    } else {
                        // return !(checkFixture(plan[currPlanIdx - 1].lastTime,item.startTime) && checkFixture(item.endTime,plan[currPlanIdx + 1].startTime))
                        return !(checkFixture(getAllTimes(currPlanIdx)?.prevLastTime,item.startTime) && checkFixture(item.endTime,getAllTimes(currPlanIdx)?.nextStartTime))
                    }
                }
                if (disableCheck()) {
                    disable = 'opacity-25 pe-none'
                    on_click = () => {console.log('disabled')}
                }                
                return <div style={{cursor:'pointer'}} key={item.id} className={`m-1 p-2 ${disable}`} onClick={on_click}>
                    <div className="rounded" style={{height:'200px', backgroundImage:`url(${filePath}/activity/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
                
                    </div>
                    <div className="grid grid-cols-12">
                    <div className="p-3 col-span-4"><p>
                        <h3 className="text-2xl"><b>{item.activityName}</b></h3>
                        <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                        {getCityName(item.cityId)} 
                        </span><br />
                        <b>Kid fee - </b> ₹{item.kidFee} <br /> <b>Infant fee - </b> ₹{item.infantFee}
                    </p></div>
                    <div className="p-3 col-span-8 text-end" >
                        <b><span className="text-2xl">₹</span><span className="text-4xl">{item.adultFee}</span></b><br />
                        Adult fee<br />
                        <div className="mt-2"><b>{item.startTime}</b> - <b>{item.endTime}</b></div>
                    </div>
                    </div>

                </div>
                }) : <div className="p-4">No activities found for the selected city</div> } 
                </Slideover.Description>
            </Slideover.Panel>
            </Slideover>
            </div>

            {/* Train Slide Over Content */}
            <div className="">
            <Slideover
            open={trainSlideover}
            // open={true}
            onClose={() => {
                setTrainSlideover(false);
            }}
            >
            <Slideover.Panel>
                <Slideover.Title className="p-5">
                <h2 className="mr-auto text-base font-medium">
                    Select Train
                </h2>
                <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    <b>{getCityName(props.fromID)}</b> to <b>{getCityName(props.toID)}</b><br />
                    <b>{getAllTimes(currPlanIdx)?.prevLastTime ? (getAllTimes(currPlanIdx)?.prevLastTime) : '0:00'}</b> - <b>{getAllTimes(currPlanIdx)?.nextStartTime ? getAllTimes(currPlanIdx)?.nextStartTime : '24:00'}</b>
                </span>
                </Slideover.Title>
                <Slideover.Description>            
                {(train?.length != 0) ? _.take(train, train?.length).filter(x => (props.fromID === x.departureCityId && props.toID === x.destinationCityId)).map((item, Key) => {
                let disable = '', on_click = () => {setPlan([...plan,{ id: item.id, field: 'train', seatType: '3A', startTime: item.departureTime, lastTime: item.arrivalTime, others: [item.trainNo] }]); setStartTime(item.departureTime); setLastTime(item.arrivalTime)}
                if (planAction === 'Replace') {
                    on_click = () => {modifyPlan(currPlanIdx,{ id: item.id, field: 'train', seatType: '3A', startTime: item.departureTime, lastTime: item.arrivalTime, others: [item.trainNo] })}
                }
                let disableCheck = () => {
                    if (currPlanIdx === null || currPlanIdx === (plan.length)) {
                        return !checkFixture(lastTime,item.departureTime)
                    } else if (currPlanIdx === 0) {
                        // return !checkFixture(item.arrivalTime,plan[currPlanIdx + 1].startTime)
                        return !checkFixture(item.arrivalTime,getAllTimes(currPlanIdx)?.nextStartTime)
                    } else {
                        // return !(checkFixture(plan[currPlanIdx - 1].lastTime,item.departureTime) && checkFixture(item.arrivalTime,plan[currPlanIdx + 1].startTime))
                        return !(checkFixture(getAllTimes(currPlanIdx)?.prevLastTime,item.departureTime) && checkFixture(item.arrivalTime,getAllTimes(currPlanIdx)?.nextStartTime))
                    }
                }
                if (disableCheck()) {
                    disable = 'opacity-25 pe-none'
                    on_click = () => {console.log('disabled')}
                }                
                return <div style={{cursor:'pointer'}} key={item.id} className={`m-1 p-2 ${disable}`} onClick={on_click}>
                <div className="rounded bg-dark" style={{height:'200px', backgroundImage:`url(${filePath}/train/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
                
                </div>
                <div className="grid grid-cols-12">
                    <div className="p-3 col-span-4"><p>
                    <h3 className="text-2xl"><b>{item.trainNo}</b></h3>
                    <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                        departs at {item.departureTime}
                    </span><br />
                    <b>{getCityName(item.departureCityId)}</b> to <b>{getCityName(item.destinationCityId)}</b>
                    </p></div>
                    <div className="p-3 col-span-8 text-end" >
                    <b><span className="text-2xl">₹</span><span className="text-4xl">{item.price}</span></b><br />
                    {/* Economy */}
                    </div>
                </div>
                </div>
                }) : <div className="p-4">No train found for the selected city</div> }            
                </Slideover.Description>
            </Slideover.Panel>
            </Slideover>
            </div>

            {/* Cruise Slide Over Content */}
            <div className="">
            <Slideover
            open={cruiseSlideover}
            // open={true}
            onClose={() => {
                setCruiseSlideover(false);
            }}
            >
            <Slideover.Panel>
                <Slideover.Title className="p-5">
                <h2 className="mr-auto text-base font-medium">
                    Select Cruise
                </h2>
                <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    <b>{getCityName(props.fromID)}</b> to <b>{getCityName(props.toID)}</b><br />
                    <b>{getAllTimes(currPlanIdx)?.prevLastTime ? (getAllTimes(currPlanIdx)?.prevLastTime) : '0:00'}</b> - <b>{getAllTimes(currPlanIdx)?.nextStartTime ? getAllTimes(currPlanIdx)?.nextStartTime : '24:00'}</b>
                </span>
                </Slideover.Title>
                <Slideover.Description>            
                {(cruise?.length != 0) ? _.take(cruise, cruise?.length).filter(x => [props.fromID,props.toID].includes(x.cityId)).map((item, Key) => {
                let disable = '', on_click = () => {setPlan([...plan,{ id: item.id, field: 'cruise', startTime: item.departureTime, lastTime: item.arrivalTime, others: [item.cruiseNo] }]); setStartTime(item.departureTime); setLastTime(item.arrivalTime)}
                if (planAction === 'Replace') {
                    on_click = () => {modifyPlan(currPlanIdx,{ id: item.id, field: 'cruise', startTime: item.departureTime, lastTime: item.arrivalTime, others: [item.cruiseNo] })}
                }
                let disableCheck = () => {
                    if (currPlanIdx === null || currPlanIdx === (plan.length)) {
                        return !checkFixture(lastTime,item.departureTime)
                    } else if (currPlanIdx === 0) {
                        // return !checkFixture(item.arrivalTime,plan[currPlanIdx + 1].startTime)
                        return !checkFixture(item.arrivalTime,getAllTimes(currPlanIdx)?.nextStartTime)
                    } else {
                        // return !(checkFixture(plan[currPlanIdx - 1].lastTime,item.departureTime) && checkFixture(item.arrivalTime,plan[currPlanIdx + 1].startTime))
                        return !(checkFixture(getAllTimes(currPlanIdx)?.prevLastTime,item.departureTime) && checkFixture(item.arrivalTime,getAllTimes(currPlanIdx)?.nextStartTime))
                    }
                }
                if (disableCheck()) {
                    disable = 'opacity-25 pe-none'
                    on_click = () => {console.log('disabled')}
                }                
                return <div style={{cursor:'pointer'}} key={item.id} className={`m-1 p-2 ${disable}`} onClick={on_click}>
                <div className="rounded bg-dark" style={{height:'200px', backgroundImage:`url(${filePath}/cruise/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
                
                </div>
                <div className="grid grid-cols-12">
                    <div className="p-3 col-span-4"><p>
                    <h3 className="text-2xl"><b>{item.cruiseNo}</b></h3>
                    <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                        departs at {item.departureTime}
                    </span><br />
                    <b>{item.departure}</b> to <b>{item.destination}</b>
                    </p></div>
                    <div className="p-3 col-span-8 text-end" >
                    <b><span className="text-2xl">₹</span><span className="text-4xl">{item.price}</span></b><br />
                    {/* Economy */}
                    </div>
                </div>
                </div>
                }) : <div className="p-4">No cruise found for the selected city</div> }            
                </Slideover.Description>
            </Slideover.Panel>
            </Slideover>
            </div>

            {/* Flight Slide Over Content */}
            <div className="">
            <Slideover
            open={flightSlideover}
            // open={true}
            onClose={() => {
                setFlightSlideover(false);
            }}
            >
            <Slideover.Panel>
                <Slideover.Title className="p-5">
                <h2 className="mr-auto text-base font-medium">
                    Select Flight
                </h2>
                <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                    <b>{getCityName(props.fromID)}</b> to <b>{getCityName(props.toID)}</b><br />
                    <b>{getAllTimes(currPlanIdx)?.prevLastTime ? (getAllTimes(currPlanIdx)?.prevLastTime) : '0:00'}</b> - <b>{getAllTimes(currPlanIdx)?.nextStartTime ? getAllTimes(currPlanIdx)?.nextStartTime : '24:00'}</b>
                </span>
                </Slideover.Title>
                <Slideover.Description>
                {/* {(flight?.length != 0) ? _.take(flight, flight?.length).map((item, Key) => { */}
                {(flight?.length != 0) ? _.take(flight, flight?.length).filter(x => (props.fromID === x.departureCityId && props.toID === x.destinationCityId)).map((item, Key) => {
                let disable = '', on_click = () => {setPlan([...plan,{ id: item.id, field: 'flight', startTime: item.departureTime, lastTime: item.arrivalTime, others: [item.flightName] }]); setStartTime(item.departureTime); setLastTime(item.arrivalTime)}
                if (planAction === 'Replace') {
                    on_click = () => {modifyPlan(currPlanIdx,{ id: item.id, field: 'flight', startTime: item.departureTime, lastTime: item.arrivalTime, others: [item.flightName] })}
                }
                let disableCheck = () => {
                    if (currPlanIdx === null || currPlanIdx === (plan.length)) {
                        return !checkFixture(lastTime,item.departureTime)
                    } else if (currPlanIdx === 0) {
                        // return !checkFixture(item.arrivalTime,plan[currPlanIdx + 1].startTime)
                        return !checkFixture(item.arrivalTime,getAllTimes(currPlanIdx)?.nextStartTime)
                    } else {
                        // return !(checkFixture(plan[currPlanIdx - 1].lastTime,item.departureTime) && checkFixture(item.arrivalTime,plan[currPlanIdx + 1].startTime))
                        return !(checkFixture(getAllTimes(currPlanIdx)?.prevLastTime,item.departureTime) && checkFixture(item.arrivalTime,getAllTimes(currPlanIdx)?.nextStartTime))
                    }
                }
                if (disableCheck()) {
                    disable = 'opacity-25 pe-none'
                    on_click = () => {console.log('disabled')}
                }                
                return <div style={{cursor:'pointer'}} key={item.id} className={`m-1 p-2 ${disable}`} onClick={on_click}>
                <div className="rounded" style={{height:'200px', backgroundImage:`url(${filePath}/flight/${item.mainImg})`, backgroundPosition:'center', backgroundSize:'cover' }}>
                
                </div>
                {/* <div className="p-2"><p><b>{item.flightName}</b> - ₹{item.price}</p></div> */}
                <div className="grid grid-cols-12">
                    <div className="p-3 col-span-4"><p>
                    <h3 className="text-2xl"><b>{item.flightName}</b></h3>
                    <b>{getCityName(item.departureCityId)}</b> to <b>{getCityName(item.destinationCityId)}</b>
                    </p></div>
                    <div className="p-3 col-span-8 text-end" >
                    <b><span className="text-2xl">₹</span><span className="text-4xl">{item.price}</span></b><br />
                    Economy<br />
                    <div className="mt-2"><b>{item.departureTime}</b> - <b>{item.arrivalTime}</b></div>
                    </div>
                </div>
                </div>
                
                }) : <div className="p-4">No flights found for the selected city</div> } 
                </Slideover.Description>
            </Slideover.Panel>
            </Slideover>
            </div>


        </div> : ''}
        </div>
    )
}

export default DayPlan;