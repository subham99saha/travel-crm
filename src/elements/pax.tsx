// @ts-nocheck
import { useState, useEffect } from "react";
import api from "../../apiconfig.json";
import axios from "axios";
import Button from "../base-components/Button";
import Table from "../base-components/Table";

function Pax(props) {
    const filePath = api.FILE_PATH;

    const [hotel,setHotel] = useState([]);
    const [activity,setActivity] = useState([]);
    const [transport,setTransport] = useState([]);
    const [train,setTrain] = useState([]);
    const [cruise,setCruise] = useState([]);
    const [flight,setFlight] = useState([]);

    const callAPIs = (cityIds) => {
        let URL;

        URL = `${api.API_URL}${api.API_ENDPOINT.VENDOR_HOTEL}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({res: result.data})
            // let newHotel = removeDuplicatesFromArray([...hotel,...result.data],'id')
            setHotel(result.data)
            
        }); 

        URL = `${api.API_URL}${api.API_ENDPOINT.ACTIVITY}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({result})
            // let newActivity = removeDuplicatesFromArray([...activity,...result.data],'id')
            setActivity(result.data)
        }); 

        URL = `${api.API_URL}${api.API_ENDPOINT.TRANSPORT}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({res: result.data})
            // let newTransport = removeDuplicatesFromArray([...transport,...result.data],'id')
            setTransport(result.data)
        }); 

        URL = `${api.API_URL}${api.API_ENDPOINT.TRAIN}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({res: result.data})
            // let newTrain = removeDuplicatesFromArray([...train,...result.data],'id')
            setTrain(result.data)
        }); 

        URL = `${api.API_URL}${api.API_ENDPOINT.CRUISE}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({res: result.data})
            // let newCruise = removeDuplicatesFromArray([...cruise,...result.data],'id')
            setCruise(result.data)
        }); 

        URL = `${api.API_URL}${api.API_ENDPOINT.FLIGHT}`;
        axios.get(`${URL}/find-by-city/${JSON.stringify(cityIds)}`, {}, {
            headers: {},
        }).then((result)=>{
            // console.log({res: result.data})
            // let newFlight = removeDuplicatesFromArray([...flight,...result.data],'id')
            setFlight(result.data)
        });
    }

    useEffect(() => {
        console.log('on change')
        let cityIds = []

        props.dayDetails.map(day => {
            cityIds.push(...day.locations)
        })

        const distinct = [...new Set(cityIds)]
        // console.log({distinct})

        callAPIs(distinct)       
                
    },[props.dayDetails])
    // console.log({hotel})
    // console.log({activity})
    // console.log({transport})
    // console.log({flight})
    
    // const getCityName = (id) => {
    //     let c = props?.city?.data.filter(x => x.id === Number(id))
    //     return c?.[0]?.cityName
    // }
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

    const [season, setSeason] = useState(props.season);
    useEffect(() => {
        setSeason(props.season)
        console.log({season})
    },[props.season])

    const [pax,setPax] = useState([0,0,0,0])
    const [evenPax,setEvenPax] = useState([0,0,0,0])
    const [paxDetails,setPaxDetails] = useState([])
    const calculatePAX = () => {
        let newEvenPax = [0,0,0,0]
        let paxTable = []
        let seasonCheckHotel = (season === 'On-season') ? 'Season' : 'OffSeason' 
        let seasonCheckTransport = (season === 'On-season') ? 'Season' : 'OffSeason'
        
        let soloPax = 0, twoPax = 0, groupPax = 0, plusOne = 0;
        props.dayDetails.map((day,idx) => {
            // console.log({plan: day.plan})
            day.plan.map(p => {
                let record = {}
                record.day = idx + 1
                record.for = 1
                record.id = p.id

                let type = p.field
                if (type === 'hotel') {
                    let toggle = ''
                    if (String(p.isAC) === 'false') toggle = 'Non'
                    record.for = 2
                    record.isAC = p.isAC
                    record.mealPlan = p.mealPlan
                    let h = getHotel(p.id)
                    record.price = Number(h?.['minRoomRent' + seasonCheckHotel + toggle + 'AC'])
                    record.extraBedPrice = Number(h?.['minExtraBed' + seasonCheckHotel + toggle + 'AC'])
                    record.mealPrice = 0
                    if (record.mealPlan === 'AP') record.mealPrice = Number(h.minBreakfastCharge) + Number(h.minLunchCharge) + Number(h.minDinnerCharge)
                    else if (record.mealPlan === 'MAP') record.mealPrice = Number(h.minBreakfastCharge) + ((Number(h.minLunchCharge) + Number(h.minDinnerCharge)) / 2)
                    else if (record.mealPlan === 'CP') record.mealPrice = Number(h.minBreakfastCharge)
                    soloPax += record.price + record.mealPrice
                    twoPax += record.price + (record.mealPrice * 2)
                    plusOne += record.extraBedPrice + record.mealPrice
                } else if (type === 'transport') {
                    let toggle = ''
                    if (String(p.isAC) === 'false') toggle = 'Non'
                    let t = getTransport(p.id)
                    record.for = Number(t?.noOfseat)
                    record.price = Number(t?.['price' + seasonCheckHotel + toggle + 'AC'])
                    // groupPax += record.price

                    newEvenPax.forEach((ep, i) => {
                        let cat = (i + 1) * 2, group = record.for
                        newEvenPax[i] = ep + (record.price * (Math.floor(cat / group) + Number(!!(cat % group))));
                    });

                } else if (type === 'activity') {
                    let a = getActivity(p.id)
                    // console.log({a})
                    record.price = Number(a?.adultFee)
                    record.guideFee = Number(a?.guideFee)
                    groupPax += record.guideFee
                    soloPax += record.price                    
                    twoPax += record.price * 2                    
                    plusOne += record.price                    
                } else if (type === 'train') { 
                    record.seatType = p.seatType
                    record.price = Number(getTrain(p.id)?.[`price${(p.seatType) ? p.seatType : '3A' }`])
                    soloPax += record.price                    
                    twoPax += record.price * 2                    
                    plusOne += record.price                    
                } else  if (type === 'cruise') {
                    record.price = Number(getCruise(p.id)?.price)
                    soloPax += record.price                    
                    twoPax += record.price * 2                    
                    plusOne += record.price                    
                } else  if (type === 'flight') {
                    record.price = Number(getFlight(p.id)?.price)
                    soloPax += record.price                    
                    twoPax += record.price * 2                    
                    plusOne += record.price                    
                }
                record.type = type

                paxTable.push(record)
                // console.log({record})
            })
        })
        // console.log({paxTable})
        setPaxDetails(paxTable)
        // console.log({ soloPax, twoPax, groupPax, plusOne })
        setPax([soloPax, twoPax, groupPax, plusOne])
        console.log({newEvenPax})
        setEvenPax(newEvenPax)
        props.handleChange([soloPax, twoPax, groupPax, plusOne, newEvenPax],paxTable)
        
    }

    useEffect(() => {
        if (props.pax) {
            setPax(props.pax)
            setPaxDetails(props.paxDetails)
        }
    })

    return <div>
        {!(props.pax) ? <Button className="mb-2" onClick={() => calculatePAX()}>Calculate PAX</Button> : ''}
        { (paxDetails.length) ? 
            <div className="overflow-x-auto">
            <Table className="rounded my-4" bordered>
                <Table.Thead>
                      <Table.Tr>
                          <Table.Th className="whitespace-nowrap">#</Table.Th>
                          <Table.Th className="whitespace-nowrap">
                              Day
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap">
                              Item
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap">
                              For
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap">
                              Price
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap">
                              Other
                          </Table.Th>
                      </Table.Tr>
                </Table.Thead>
                <Table.Tbody>            
                    {paxDetails.map((item,idx) => {
                        let mpPrice = (item.mealPrice) ? item.mealPrice : 0
                        let ebPrice = (item.extraBedPrice) ? item.extraBedPrice : 0
                        let gFee = (item.guideFee) ? item.guideFee : 0
                        return <Table.Tr key={idx}>
                              <Table.Td>{idx+1}</Table.Td>
                              <Table.Td>{item.day}</Table.Td>
                              <Table.Td>{item.type}</Table.Td>
                              <Table.Td>{item.for}</Table.Td>
                              <Table.Td>{item.price}</Table.Td>
                              <Table.Td>
                                <div>
                                {mpPrice != 0 ? <div><b>Meal price: </b>{mpPrice}</div> : ''}
                                {ebPrice != 0 ? <div><b>Extra Bed: </b>{ebPrice}</div> : ''}
                                {gFee != 0 ? <div><b>Guide Fee: </b>{gFee}</div> : ''}
                                </div>
                              </Table.Td>
                        </Table.Tr>
                    })}
                </Table.Tbody>
            </Table>
            </div> 
            : '' }
        
        <div className="m-2 pb-3"><b>Group Costs:</b> {pax[2]} <br /> (Includes guide and other group costs)</div>
        <div className="grid grid-cols-5 gap-2 m-2 pb-3">
            <div><b>Solo PAX:</b><br />            
            {pax[0]} + <i>GC</i> + <i>TC</i> <br /> = <b>{pax[0] + evenPax[0] + pax[2]}</b>
            </div>
            <div><b>2 PAX:</b><br />
            {pax[1]} + <i>GC</i> + <i>TC</i> <br /> = <b>{pax[1] + evenPax[0] + pax[2]}</b>
            </div>
            <div><b>4 PAX:</b><br />
            {pax[1] * 2} + <i>GC</i> + <i>TC</i> <br /> = <b>{(pax[1] * 2) + evenPax[1] + pax[2]}</b>
            </div>
            <div><b>6 PAX:</b><br />
            {pax[1] * 3} + <i>GC</i> + <i>TC</i> <br /> = <b>{(pax[1] * 3) + evenPax[2] + pax[2]}</b>
            </div>
            <div><b>8 PAX:</b><br />
            {pax[1] * 4} + <i>GC</i> + <i>TC</i> <br /> = <b>{(pax[1] * 4) + evenPax[3] + pax[2]}</b>
            </div>
            
        </div>
        {/* <div className="m-2">(Hotel and all individual costs)</div> */}
        <div className="m-2"><b>Plus One:</b> {pax[3]} <br /> (Includes extra bed and all individual costs. Excludes transport costs)</div>

    </div>
}

export default Pax;