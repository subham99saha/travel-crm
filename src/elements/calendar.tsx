// @ts-nocheck
import { useState, useEffect } from "react";
import Table from "../base-components/Table";import {
    FormLabel,
    FormInput,
    FormSelect,
    FormCheck
  } from "../base-components/Form";
import Button from "../base-components/Button";
import TomSelect from "../base-components/TomSelect";
import Notification from "../base-components/Notification";
import Lucide from "../base-components/Lucide";
import Toastify from "toastify-js";
import axios from "axios";
import api from "../../apiconfig.json";

import { Dialog } from "../base-components/Headless";

function Calendar(props) {
    const globalDate = new Date()
    const [year, setYear] = useState(props.year || globalDate.getFullYear())
    const [month, setMonth] = useState(props.month || globalDate.getMonth() + 1)
    const [monthVals,setMonthVals] = useState([31,28,31,30,31,30,31,31,30,31,30,31])
    const [calendarArr,setCalendarArr] = useState(Array.apply(null, Array(42)).map(function (x, i) { return i; }))
    const [calendarObjArr,setCalendarObjArr] = useState(Array.apply(null, Array(42)).map(function (x, i) { return { currentMonth: false }; }))
    const [rows,setRows] = useState([])
    const [yearArr,setYearArr] = useState(Array.apply(null, Array(10)).map(function (x, i) { return globalDate.getFullYear() + i - 5; }))
    const [reload, setReload] = useState(0)    
    const [selected, setSelected] = useState([])  
    
    const fieldNames = {
        rate: 'Base',
        rateAC: 'AC',
        rateNonAC: 'NonAC',
        rateChild: 'Child',
        rateExtraBed: 'ExtraBed',
        rateBreakfast: 'Breakfast',
        rateLunch: 'Lunch',
        rateDinner: 'Dinner',
        rateAdult: 'Adult',
        rateKid: 'Kid',
        rateInfant: 'Infant',
        rateGuide: 'Guide',
        season: 'season',
    }
    
    // console.log(yearArr)
    useEffect(() => {
        // setCalendarObjArr(Array.apply(null, Array(42)).map(function (x, i) { return { currentMonth: false, rateAC: 0, rateNonAC: 0, season: '' }; }))
        // console.log(calendarObjArr)
        let newMonthVals = monthVals
        if (year % 4 === 0) {
            newMonthVals[1] = 28
            setMonthVals(newMonthVals)
        }
        // console.log({year})
        const startDate = new Date(month + '-1-' + year)
        let start = startDate.getDay()

        let newCalendarArr = calendarArr
        let newCalendarObjArr = calendarObjArr
        for (let i = (start - 1), j = (newMonthVals[month - 2] || 31); i >= 0; i--, j--) {
            newCalendarArr[i] = j
            newCalendarObjArr[i] = {}
            newCalendarObjArr[i].currentMonth = false
        }
        for (let i = (start), j = 1; j <= newMonthVals[month - 1]; i++, j++) {
            newCalendarArr[i] = j
            newCalendarObjArr[i] = {}
            newCalendarObjArr[i].currentMonth = true
            // newCalendarObjArr[i] = { currentMonth: false, rateAC: 0, rateNonAC: 0, season: '' }
        }
        for (let i = (start + newMonthVals[month - 1]), j = 1; i < 42; i++, j++) {
            newCalendarArr[i] = j
            newCalendarObjArr[i] = {}
            newCalendarObjArr[i].currentMonth = false
        }
        setCalendarArr(newCalendarArr)
        setCalendarObjArr(newCalendarObjArr)
        setRows([0,0,0,0,0,0])
        // console.log(newCalendarArr)
        // console.log(newCalendarObjArr)
    },[year,month])

    const [rateFor, setRateFor] = useState(props.rateFor || 'B2C')
    const [ratesModal, setRatesModal] = useState(false)

    const [rateIndex, setRateIndex] = useState()    
    const setRates = (multi,status=false) => {
        setErrorMsg('')
        if (document.getElementById('season').value != '') {
            let newCalendarObjArr = calendarObjArr
            if (multi === false) {
                if (status) {
                    newCalendarObjArr[rateIndex]['status'] = document.getElementById('status').value
                    return
                }
                newCalendarObjArr[rateIndex]['season'] = document.getElementById('season').value
                const fields = document.getElementsByClassName(itemType)
                // console.log({fields})
                for (let i = 0; i < fields.length; i++) {
                    newCalendarObjArr[rateIndex][fields[i].id] = fields[i].value
                }
            } else {
                if (status) {
                    selected.map(id => { 
                        newCalendarObjArr[id]['status'] = document.getElementById('status').value
                    })
                    return
                }
                const fields = document.getElementsByClassName(itemType)
                // console.log({fields})
                selected.map(id => { 
                    newCalendarObjArr[id]['season'] = document.getElementById('season').value
                    for (let i = 0; i < fields.length; i++) {
                        newCalendarObjArr[id][fields[i].id] = fields[i].value
                    }
                })
            }
            setCalendarObjArr(newCalendarObjArr)
            // setSelected([])
        } else {
            setErrorMsg('Select season')
        }        
        // setReload(reload + 1)
    }

    const [idLabel, setIdLabel] = useState('')
    const [itemType, setItemType] = useState('')
    const [itemIDs, setItemIDs] = useState([])
    const [itemIdOptions, setItemIdOptions] = useState([])
    const [rooms, setRooms] = useState([])
    const [hotelRoomTypeOptions, setHotelRoomTypeOptions] = useState([])
    const [hotelRoomBedTypeOptions, setHotelRoomBedTypeOptions] = useState([])
    const [optionsPrefix, setoptionsPrefix] = useState('')
    useEffect(() => {
        if (props.itemType === 'hotel') {
            setItemType('room')
            const URL = `${api.API_URL}${api.API_ENDPOINT.VENDOR_HOTEL}/${props.itemId}`;
            axios.post(`${URL}/`, {}, {
                headers: {},
            }).then((result)=>{
                // console.log({hotel: result}) 
                setIdLabel(`Select room IDs for ${result.data.hotelName} (HT-${props.itemId})`)
            }).catch((error) => {
                console.log({error})
            });
            const roomURL = `${api.API_URL}${api.API_ENDPOINT.VENDOR_HOTEL_ROOM}/searchByHotelId/${props.itemId}`;
            axios.get(`${roomURL}/`, {}, {
                headers: {},
            }).then((result)=>{
                console.log({rooms: result}) 
                if (result.data.length != 0) {
                    // setItemIDs([result.data[0].id]) 
                    let idArr = [], roomTypeArr = [], bedTypeArr = [], roomsArr = []
                    result.data.map(item => {
                        idArr.push(item.id)
                        // roomTypeArr.push(item.roomType)
                        // bedTypeArr.push(item.hRoomBedType)
                        roomsArr.push({ id: item.id, roomType: item.roomType, bedType: item.hRoomBedType })
                    }) 
                    setItemIDs(idArr) 
                    setItemIdOptions(idArr) 
                    setRooms(roomsArr)
                    // setHotelRoomTypeOptions(new Set(roomTypeArr)) 
                    // setHotelRoomBedTypeOptions(new Set(bedTypeArr)) 
                    setoptionsPrefix('RM-')
                }           
            }).catch((error) => {
                console.log({error})
            });
        } else if (props.itemType === 'room') {
            setItemType('room')
            setItemIDs([props.itemId]) 
            setItemIdOptions([props.itemId])
            setIdLabel(`Rates for Room RM-${props.itemId}`)
            setoptionsPrefix('RM-')
            fetchRates()
        } else if (props.itemType === 'transport') {
            setItemType('transport')
            setItemIDs([props.itemId]) 
            setItemIdOptions([props.itemId])
            setIdLabel(`Rates for Transport TR-${props.itemId}`)
            setoptionsPrefix('TR-')
            fetchRates()
        } else if (props.itemType === 'activity') {
            setItemType('activity')
            setItemIDs([props.itemId]) 
            setItemIdOptions([props.itemId])
            setIdLabel(`Rates for Activity AC-${props.itemId}`)
            setoptionsPrefix('AC-')
            fetchRates()
        }
        
    },[])

    const handleHotelRoomFilter = (val,valFor) => {
        console.log(val,valFor)
        let idArr = []
        rooms.filter(item => {
            if (val === '') {
                return true
            } else {
                return (item[valFor] === val)
            }
        }).map(item => {
            idArr.push(item.id)
        }) 
        // setItemIdOptions(idArr) 
        setItemIDs(idArr)
    }

    const fetchRates = () => {
        const URL = `${api.API_URL}${api.API_ENDPOINT.DAY_RATES}/fetch`;
        axios.post(`${URL}/`, { year, month, rateFor, itemType: props.itemType, itemID: props.itemId }, {
            headers: {},
        }).then((result)=>{
            // console.log({rates: result})
            if (result.data.length != 0) {
                const fetched = JSON.parse(result.data[0].dayRates)
                console.log({fetched})
                let newCalendarObjArr = calendarObjArr
                let count = 0
                calendarObjArr.map((item,index) => {
                    if (item.currentMonth === true) {
                        newCalendarObjArr[index] = fetched[count++]
                    }
                })
                setCalendarObjArr(newCalendarObjArr)
                setRows([0,0,0,0,0,0])
            } else {
                let newCalendarObjArr = calendarObjArr
                calendarObjArr.map((item,index) => {
                    if (item.currentMonth === true) {
                        newCalendarObjArr[index] = { currentMonth : true }
                    } else {
                        newCalendarObjArr[index] = { currentMonth : false }
                    }
                })
                setCalendarObjArr(newCalendarObjArr)
                setRows([0,0,0,0,0,0])
            }            
        }).catch((error) => {
            console.log({error})
        });
    }
    useEffect(() => {
        fetchRates()
    },[year,month,rateFor])

    // useEffect(() => {
    //     console.log({itemIDs})
    // },[itemIDs])

    const handleSelect = (add,id) => {
        let newSelected = [...selected]
        const idx = newSelected.indexOf(id);
        if (add === true) {
            if (idx === -1) { 
                setSelected([...selected, id])
            }
        } else {
            if (idx > -1) {
                newSelected.splice(idx, 1);
            }
            setSelected(newSelected)
        }
    }
    const selectAll = (select) => {
        if (select) {
            let newSelected = []
            calendarObjArr.map((item,idx) => {
                if (item.currentMonth === true) {
                    newSelected.push(idx)
                }
            })        
            setSelected(newSelected)
        } else {
            setSelected([])
        }
    }

    const [errorMsg, setErrorMsg] = useState('')
    const submitRates = () => {
        setErrorMsg('')
        // if (selected.length === 0) {
        //     setErrorMsg('Fill rates for at least one date to submit')
        //     return
        // }
        let filled = 0
        calendarObjArr.filter(x => x.currentMonth === true).map(day => {
            if (day.season != undefined) {
                // setErrorMsg('Fill rates for all dates to submit')
                filled++
                return
            }
        })
        if ((filled != 0) && (itemType != '') && (itemIDs.length != 0)) {
            const payload = {
                year, month, rateFor, itemType, itemIDs,
                dayRates: calendarObjArr.filter(x => x.currentMonth === true)
            }
            if (props.itemType === 'hotel') {
                payload.parentID = props.itemId
            }
            console.log({payload})
            const URL = `${api.API_URL}${api.API_ENDPOINT.DAY_RATES}`;
            axios.post(`${URL}/`, payload, {
                headers: {},
            }).then((result)=>{
                console.log({result})
                notify(true)
            }).catch((error) => {
                console.log({error})
                notify(false)
            });   
        } else {
            setErrorMsg('Fill rates for at least one date to submit')
        }
    }

    const toggleFields = (typeArr) => {
        if (typeArr.includes(itemType)) {
            return true
        }
        return false
    }

    const notify = (success) => {
        const ele = document
        .querySelectorAll(`#${(success === true) ? 'success' : 'failed'}-notification-content`)[0]
        .cloneNode(true) as HTMLElement;
      ele.classList.remove("hidden");
      Toastify({
        node: ele,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    }


  return (
    <div>
    {/* <h1>Calendar component</h1> */}
    <div className="grid grid-cols-10 text-xs">
        <div className="input-form mb-5 mx-2">
            <FormLabel
                htmlFor="validation-form-1"
                className="flex flex-col w-full sm:flex-row"
            >
                Month
            </FormLabel>
            <FormSelect 
                className="sm:mr-2"
                onChange={e => setMonth(e.target.value)} 
                value={month}
                aria-label="Default select example">
                <option value='1'>January</option>
                <option value='2'>February</option>
                <option value='3'>March</option>
                <option value='4'>April</option>
                <option value='5'>May</option>
                <option value='6'>June</option>
                <option value='7'>July</option>
                <option value='8'>August</option>
                <option value='9'>September</option>
                <option value='10'>October</option>
                <option value='11'>November</option>
                <option value='12'>December</option>
            </FormSelect>
        </div>
        <div className="input-form mb-5 mx-2">
            <FormLabel
                htmlFor="validation-form-1"
                className="flex flex-col w-full sm:flex-row"
            >
                Year
            </FormLabel>
            <FormSelect 
                className="sm:mr-2"
                onChange={e => setYear(e.target.value)} 
                value={year}
                aria-label="Default select example">
                {yearArr.map((y,i) => {
                    return <option key={i} value={y}>{y}</option>
                })}
            </FormSelect>
        </div>
        <div className="input-form mb-5 mx-2">
            <FormLabel
                htmlFor="validation-form-1"
                className="flex flex-col w-full sm:flex-row"
            >
                Rate For
            </FormLabel>
            <FormSelect 
                className="sm:mr-2"
                onChange={e => setRateFor(e.target.value)} 
                value={rateFor}
                aria-label="Default select example">
                <option value='B2C'>B2C</option>
                <option value='TA'>B2B</option>
                <option value='Cor'>Corporate</option>
            </FormSelect>
        </div>
        <div className="input-form mb-5 mx-2 col-span-3">
            <FormLabel
                htmlFor="validation-form-1"
                className="flex flex-col w-full sm:flex-row"
            >
                {idLabel}
            </FormLabel>
            <TomSelect 
                className="sm:mr-2"
                value={itemIDs}
                onChange={setItemIDs} 
                aria-label="Default select example" 
                multiple
                disabled={(props.itemType === 'hotel') ? false : true }
            >
                {itemIdOptions.map(opt => {
                    return <option key={opt} value={opt}>{optionsPrefix+opt}</option>
                })}
            </TomSelect>
        </div>
        { (props.itemType === 'hotel') ? 
        <div className="input-form mb-5 mx-2">
            <FormLabel
                htmlFor="validation-form-1"
                className="flex flex-col w-full sm:flex-row"
            >
                Room Type
            </FormLabel>
            <FormSelect 
                className="sm:mr-2"
                onChange={e => handleHotelRoomFilter(e.target.value,'roomType')} 
            >
                <option value="">All</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Premium">Premium</option>
                <option value="Executive">Executive</option>
                <option value="Studio">Studio</option>
                <option value="Tent">Tent</option>
                <option value="Master Room">Master Room</option>
                <option value="Luxury Room">Luxury Room</option>
                <option value="Common Room">Common Room</option>
                <option value="Family Room">Family Room</option>
                <option value="Water Villa">Water Villa</option>
                <option value="Beach Villa">Beach Villa</option>
                <option value="Suite">Suite</option>
                <option value="Honeymoon Suite">Honeymoon Suite</option>
                <option value="Presidential Suite">Presidential Suite</option>
            </FormSelect>
        </div>
        : '' }
    </div>
    <div className="input-form mb-5 mx-2">
        {/* <Button variant="primary" type="button" onClick={() => selectAll()} className="mr-1 text-xs">
            Select All
        </Button> */}
        <FormCheck className="">
            <FormCheck.Input id="" type="checkbox" onChange={(e) => selectAll(e.target.checked)} /> 
            <FormCheck.Label htmlFor="" className="">
                Select All
            </FormCheck.Label>
        </FormCheck>
    </div>
    <div className="overflow-x-auto p-3">
        <Table striped className="text-sm">
            <Table.Thead>
                <Table.Tr className="text-center">
                    <Table.Th className="whitespace-nowrap">SUN</Table.Th>
                    <Table.Th className="whitespace-nowrap">MON</Table.Th>
                    <Table.Th className="whitespace-nowrap">TUE</Table.Th>
                    <Table.Th className="whitespace-nowrap">WED</Table.Th>
                    <Table.Th className="whitespace-nowrap">THU</Table.Th>
                    <Table.Th className="whitespace-nowrap">FRI</Table.Th>
                    <Table.Th className="whitespace-nowrap">SAT</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.map((row,idx) => {
                    return <Table.Tr key={idx}>
                    {calendarArr.slice(idx*7,(idx*7)+7).map((day,id) => {
                        let cellClass = 'font-extralight'
                        const index = (idx*7) + id
                        let on_click = () => {}
                        if (calendarObjArr[index].currentMonth === true) {
                            cellClass = 'font-bold'
                            on_click = () => {setRatesModal(true); setRateIndex(index)}
                            if (calendarObjArr[index].status === 'Block') { 
                                cellClass += ' border-red-400 border-l-4'
                            } 
                            // else {
                            //     cellClass += ' border-green-200 border-l-4'
                            // }
                        }
                        return <Table.Td style={{height: '75px', width: '75px'}} onDoubleClick={on_click} className={cellClass} key={id}>
                            
                            { (calendarObjArr[index].currentMonth === true) ? <FormCheck className="">
                                <FormCheck.Input id="" type="checkbox" onChange={(e) => handleSelect(e.target.checked, index)} checked={(selected.includes(index) === true) ? 'selected' : '' } />
                                {/* <FormCheck.Input id="" type="checkbox" value="" checked={(selected.includes(index) === true) ? 'selected' : '' } /> */}
                                <FormCheck.Label htmlFor="">
                                {day}
                                </FormCheck.Label>
                            </FormCheck> : <span className="pl-6">{day}</span> }
                            <div className="my-3">
                                {Object.keys(calendarObjArr[index]).filter(k => { return (k != 'currentMonth' && k != 'season' && k != 'status') }).map(key => {
                                    if (calendarObjArr[index][key]) {
                                        return <div key={key} ><span className="text-xs font-medium ">₹{calendarObjArr[index][key]} ({fieldNames[key]})</span></div>
                                    } else {
                                        return ''
                                    }
                                })}
                            {/* {calendarObjArr[index].rate ? <><span className="text-xs font-medium ">₹{calendarObjArr[index].rate} (Base)</span><br /></> : ''}
                            {calendarObjArr[index].rateAC ? <><span className="text-xs font-medium ">₹{calendarObjArr[index].rateAC} (AC)</span><br /></> : ''}
                            {calendarObjArr[index].rateNonAC ? <><span className="text-xs font-medium ">₹{calendarObjArr[index].rateNonAC} (Non AC)</span><br /></> : ''} */}
                            {calendarObjArr[index].season ? <span className="block mt-1 text-green-600 text-xs font-medium py-0.5 dark:text-green-300">{calendarObjArr[index].season}</span> : ''}
                            </div>
                        </Table.Td>                    
                    })}
                    </Table.Tr>
                })}
                
            </Table.Tbody>
        </Table>
    </div>
    <div className="input-form mb-5 mx-2">
        <Button variant="primary" type="button" onClick={() => submitRates()} className="mr-1">
            Submit Rates
        </Button>
    </div>
    <div className="mx-2 text-danger">
        {errorMsg}
    </div>


    {/* BEGIN: Modal Content */}
    <Dialog open={ratesModal} onClose={()=> {
        setRatesModal(false);
        }}
        // initialFocus={sendButtonRef}
        >
        <Dialog.Panel>
            <Dialog.Title>
                <h2 className="mr-auto text-base font-medium">
                    Add rates
                </h2>
            </Dialog.Title>
            <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3 text-xs">
                { toggleFields(['room','activity']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rate" className="font-medium">
                        Rate
                    </FormLabel>
                    <FormInput id="rate" type="number" placeholder="1000" className="room activity text-xs" />
                </div> : '' }
                { toggleFields(['transport']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rateAC" className="font-medium">
                        Rate (AC)
                    </FormLabel>
                    <FormInput id="rateAC" type="number" placeholder="1000" className="transport text-xs" />
                </div> : '' }
                { toggleFields(['transport']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rateNonAC" className="font-medium">
                        Rate (Non-AC)
                    </FormLabel>
                    <FormInput id="rateNonAC" type="number" placeholder="1000" className="transport text-xs" />
                </div> : '' }
                { toggleFields(['room']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rateChild" className="font-medium">
                        Rate (Child)
                    </FormLabel>
                    <FormInput id="rateChild" type="number" placeholder="1000" className="room text-xs" />
                </div> : '' }
                { toggleFields(['room']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rateExtraBed" className="font-medium">
                        Rate (Extra Bed)
                    </FormLabel>
                    <FormInput id="rateExtraBed" type="number" placeholder="1000" className="room text-xs" />
                </div> : '' }
                { toggleFields(['room']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rateBreakfast" className="font-medium">
                        Rate (Breakfast)
                    </FormLabel>
                    <FormInput id="rateBreakfast" type="number" placeholder="1000" className="room text-xs" />
                </div> : '' }
                { toggleFields(['room']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rateLunch" className="font-medium">
                        Rate (Lunch)
                    </FormLabel>
                    <FormInput id="rateLunch" type="number" placeholder="1000" className="room text-xs" />
                </div> : '' }
                { toggleFields(['room']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rateDinner" className="font-medium">
                        Rate (Dinner)
                    </FormLabel>
                    <FormInput id="rateDinner" type="number" placeholder="1000" className="room text-xs" />
                </div> : '' }
                { toggleFields(['activity']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rateAdult" className="font-medium">
                        Rate (Adult)
                    </FormLabel>
                    <FormInput id="rateAdult" type="number" placeholder="1000" className="activity text-xs" />
                </div> : '' }
                { toggleFields(['activity']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rateKid" className="font-medium">
                        Rate (Kid)
                    </FormLabel>
                    <FormInput id="rateKid" type="number" placeholder="1000" className="activity text-xs" />
                </div> : '' }
                { toggleFields(['activity']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rateInfant" className="font-medium">
                        Rate (Infant)
                    </FormLabel>
                    <FormInput id="rateInfant" type="number" placeholder="1000" className="activity text-xs" />
                </div> : '' }
                { toggleFields(['activity']) ? <div className="col-span-4">
                    <FormLabel htmlFor="rateGuide" className="font-medium">
                        Rate (Guide)
                    </FormLabel>
                    <FormInput id="rateGuide" type="number" placeholder="1000" className="activity text-xs" />
                </div> : '' }
                <div className="col-span-4">
                    <FormLabel htmlFor="season">
                    <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Season</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        {/* <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Select the type of booking to proceed.
                        </div> */}
                      </div>
                    </FormLabel>
                    <FormSelect id="season" className="text-xs">
                        <option value="On-Season">On-Season</option>
                        <option value="Off-Season">Off-Season</option>
                    </FormSelect>
                </div>
                <div className="col-span-12 mb-2">
                    <Button variant="primary" type="button" onClick={() => {setRates(false); setRatesModal(false)}} className="mr-1">
                        Set current
                    </Button>
                    <Button variant="primary" type="button" onClick={() => {setRates(true); setRatesModal(false)}} className="mr-1">
                        Set selected
                    </Button>
                </div>
                <hr className="col-span-12" />
                <div className="col-span-4">
                    <FormLabel htmlFor="season">
                    <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Status</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                        {/* <div className="mt-3 text-xs leading-relaxed text-slate-500">
                          Select the type of booking to proceed.
                        </div> */}
                      </div>
                    </FormLabel>
                    <FormSelect id="status" className="text-xs">
                        <option value="Unblock">Unblock</option>
                        <option value="Block">Block</option>
                    </FormSelect>
                </div>
                <div className="col-span-12 mb-2">
                    <Button variant="primary" type="button" onClick={() => {setRates(false,true); setRatesModal(false)}} className="mr-1">
                        Set current
                    </Button>
                    <Button variant="primary" type="button" onClick={() => {setRates(true,true); setRatesModal(false)}} className="mr-1">
                        Set selected
                    </Button>
                </div>
            </Dialog.Description>
            <Dialog.Footer>
                <Button type="button" variant="outline-secondary" onClick={()=> {
                    setRatesModal(false);
                    }}
                    className="w-20 mr-1"
                    >
                    Cancel
                </Button>
                
            </Dialog.Footer>
        </Dialog.Panel>
    </Dialog>
    {/* END: Modal Content */}

    {/* BEGIN: Success Notification Content */}
    <Notification
        id="success-notification-content"
        className="flex hidden"
    >
        <Lucide icon="CheckCircle" className="text-success" />
        <div className="ml-4 mr-4">
            <div className="font-medium">Rates added successfully!</div>
        </div>
    </Notification>
    {/* END: Success Notification Content */}
    {/* BEGIN: Failed Notification Content */}
    <Notification
        id="failed-notification-content"
        className="flex hidden"
    >
    <Lucide icon="XCircle" className="text-danger" />
    <div className="ml-4 mr-4">
        <div className="font-medium">Rate submission failed!</div>
        <div className="mt-1 text-slate-500">
        Please check the fileld form.
        </div>
    </div>
    </Notification>
    {/* END: Failed Notification Content */}
    </div>
  );
}

export default Calendar;