// @ts-nocheck
import {
    FormInput,
    FormInline,
    FormSelect,
    FormLabel,
    FormHelp,
    FormCheck,
    InputGroup,
    FormSwitch,
    FormTextarea
} from "../../../base-components/Form";
import Lucide from "../../../base-components/Lucide";
import Button from "../../../base-components/Button";
import AvailableFlights from "../available/flights";

import api from "../../../../apiconfig.json";

function Flight(props) {
    const filePath = api.FILE_PATH;

    return <>
        {/* <div style={{display: (props.flight.show) ? 'block' : 'none'}} className="p-5 border-dashed border-2 rounded-md border-slate-400/60 dark:border-darkmode-400 mt-5">
        <div className="flex items-center pb-2 text-base font-medium">
          <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> FLIGHTS
        </div> */}
        {props.flight.flightArr.map((f,index) => {
        return <div key={index} className="border rounded-md border-slate-200/60 shadow-xl dark:border-darkmode-400 mt-3">
          <div className="grid grid-cols-2 gap-4 bg-slate-100 rounded-t-sm p-5 text-base font-medium ">
            <div className="justify-self-start" > Flight {index + 1} Details</div>
            <div className="justify-self-end" onClick={() => props.handleReq('remove','flight',index)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-5 p-5 gap-y-5">
          
            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">From City</div>
                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div> */}
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
              <FormSelect
                  // id="isActive"
                  placeholder=""
                  value={f.fromId}
                  onChange={(e) => props.editReq('flight',index,'fromId',e.target.value)}
                >
                  <option value="">Select From City</option>
                  { props.city.map((item) => {
                    return <option key={item.id}value={item.id}>{item.cityName}</option>
                  })}
                </FormSelect>
              </div>
            </FormInline>
            </div>
            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">To City</div>
                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div> */}
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
              <FormSelect
                  // id="isActive"
                  placeholder=""
                  value={f.toId}
                  onChange={(e) => props.editReq('flight',index,'toId',e.target.value)}
                >
                  <option value="">Select To City</option>
                  { props.city.map((item) => {
                    return <option value={item.id}>{item.cityName}</option>
                  })}
                </FormSelect>
              </div>
            </FormInline>
            </div>
            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">Date of Travel</div>
                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div> */}
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
                {/* <div className="relative w-56 mx-auto">
                  <div className="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                  <Lucide icon="Calendar" className="w-4 h-4" />
                  </div>
                  <Litepicker 
                    value={date} 
                    onChange={setDate}
                    value={f.date}
                    onChange={(val) => props.editReq('flight',index,'date',val)} 
                    options={{
                              autoApply: false,
                              showWeekNumbers: true,
                              dropdowns: {
                                minYear: 1990,
                                maxYear: null,
                                months: true,
                                years: true,
                              },
                            }} className="pl-12" />
                </div> */}
                <FormInput
                  // id="contactPerson"
                  type="date"
                  value={f.date}
                  onChange={(e) => props.editReq('flight',index,'date',e.target.value)}
                />
              </div>
            </FormInline>
            </div>

            <div className="col-span-3 grid grid-cols-12 gap-2 mt-5">
            {f.preferrences.map((p,prefIdx) => {
              return <div key={prefIdx} className="px-5 col-span-2 border rounded-md border-dashed border-2 border-slate-600/60 dark:border-darkmode-400">
              <div className="py-2 text-sm font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <span className="">Person {prefIdx + 1}</span>
                <div className="mt-0.5 float-end text-slate-500" onClick={() => props.handleAprxPax('flight',index,'remove',prefIdx)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>

              </div>        
              <div className="my-5">
                <div>
                <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                  <FormLabel className="">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Preferred Seat</div>
                        {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div> */}
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3">
                    <FormSelect
                      // id="isActive"
                      placeholder=""
                      value={p.seating}
                      onChange={(e) => props.editPref('flight',index,'seating',prefIdx,e.target.value)}
                    >
                      <option value="W">Window</option>
                      <option value="M">Middle</option>
                      <option value="A">Aisle</option>
                    </FormSelect>
                  </div>
                </FormInline>
                </div>
              </div>
            </div>
            })}
            <div className="flex items-center">
              <Button variant="" className="bg-none border-dashed border-2 rounded text-slate-500" onClick={() => props.handleAprxPax('flight',index,'add',0)} >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </Button>
            </div>
            </div>         

            
            {(Object.keys(f.flight).length != 0) ? <div className="col-span-3 grid grid-cols-5 gap-2 my-3">
              <div className="col-span-6 text-base font-medium mx-3 flex items-center">
                Saved Flight
                <span className="ml-2 cursor-pointer" onClick={() => props.editReq('flight',index,'flight',{})}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></span>                             
              </div>
                <div className="flex items-center p-3 border rounded-md border-slate-400/60">
                  <div className="bg-dark rounded mr-5" style={{height:'50px', width:'50px', backgroundImage:`url(${filePath}/flight/${f.flight.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>
                  <div>
                    <div className="text-sm font-medium ">{f.flight.name}</div>
                    <div className="text-xs font-normal ">{f.flight.number}</div>
                    <div className="text-xs font-normal ">{f.flight.dept} - {f.flight.arrv}</div>
                  </div>
                </div>
            </div> : '' }
          </div>

          <div className="px-5 pb-5">
            <AvailableFlights obj={f} from={f.fromId} to={f.toId} editReq={(field,val) => props.editReq('flight',index,field,val)} />
          </div>
        </div>})}
        <Button
            variant="primary"
            type="submit"
            className="text-xs mt-3 mr-2"
            onClick={() => props.handleReq('add','flight',0)}
        >
        Add More
        </Button>
      {/* </div> */}
    </>
}

export default Flight