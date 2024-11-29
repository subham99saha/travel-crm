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
import AvailableTransports from "../available/transports";

import api from "../../../../apiconfig.json";

function Car(props) {
    const filePath = api.FILE_PATH;

    return <>
        {/* <div style={{display: (props.car.show) ? 'block' : 'none'}} className="p-5 border-dashed border-2 rounded-md border-slate-400/60 dark:border-darkmode-400 mt-5">
        <div className="flex items-center pb-2 text-base font-medium ">
          <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> CARS
        </div> */}
        {props.car.carArr.map((c,index) => {
        return <div key={index} className="border rounded-md border-slate-200/60 shadow-xl dark:border-darkmode-400 mt-3">
        <div className="grid grid-cols-2 gap-4 bg-slate-100 rounded-t-sm p-5 text-base font-medium ">
          <div className="justify-self-start" > Car {index + 1} Details</div>
          <div className="justify-self-end" onClick={() => props.handleReq('remove','car',index)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
        </div>
          
        <div className="grid grid-cols-3 gap-2 mt-5 p-5 gap-y-5">
          
            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">City</div>
                    <div className="ml-1 text-red-600">*</div>
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
                  value={c.cityId}
                  onChange={(e) => props.editReq('car',index,'cityId',e.target.value)}
                >
                  <option value="">Select City</option>
                  { props.city.map((item) => {
                    return <option value={item.id}>{item.cityName}</option>
                  })}
                </FormSelect>
                {/* <TomSelect 
                  className="sm:mr-2"
                  value={c.cityId}
                  onChange={(val) => props.editReq('car',index,'cityId',val)}
                  aria-label="Default select example">
                  <option value="">Select City</option>
                  { props.city.map((item) => {
                    return <option value={item.id}>{item.cityName}</option>
                  })}
                </TomSelect> */}
              </div>
            </FormInline>
            </div>
            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">Start</div>
                    <div className="ml-1 text-red-600">*</div>
                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div> */}
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
                <FormInput
                  type="date"
                  value={c.fromDate}
                  onChange={(e) => props.editReq('car',index,'fromDate',e.target.value)}
                />
              </div>
            </FormInline>
            </div>
            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">End</div>
                    <div className="ml-1 text-red-600">*</div>
                    {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                      Required
                    </div> */}
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
                <FormInput
                  type="date"
                  value={c.toDate}
                  onChange={(e) => props.editReq('car',index,'toDate',e.target.value)}
                />
              </div>
            </FormInline>
            </div>
            {/* <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">Select Car Type</div>
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
                <FormSelect
                  placeholder=""
                  value={c.carType}
                  onChange={(e) => props.editReq('car',index,'carType',e.target.value)}
                >
                  <option value="FWD">FWD</option>
                  <option value="RWD">RWD</option>
                  <option value="4WD">4WD</option>
                  <option value="AWD">AWD</option>
                </FormSelect>
              </div>
            </FormInline>
            </div> */}
            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">Departure</div>
                    <div className="ml-1 text-red-600">*</div>
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
                <FormInput
                  type="text"
                  placeholder="Departure"
                  value={c.departure}
                  onChange={(e) => props.editReq('car',index,'departure',e.target.value)}
                />
              </div>
            </FormInline>
            </div>

            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">Destination</div>
                    <div className="ml-1 text-red-600">*</div>
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
                <FormInput
                  type="text"
                  placeholder="Destination"
                  value={c.destination}
                  onChange={(e) => props.editReq('car',index,'destination',e.target.value)}
                />
              </div>
            </FormInline>
            </div>

            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">Number of Seats</div>
                    <div className="ml-1 text-red-600">*</div>
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
                <FormInput
                  type="number"
                  placeholder="Seats"
                  value={c.noOfSeats}
                  onChange={(e) => props.editReq('car',index,'noOfSeats',e.target.value)}
                />
              </div>
            </FormInline>
            </div>

            {(c.cars.length != 0) ? <div className="col-span-3 grid grid-cols-5 gap-2 my-3">
              <div className="col-span-6 text-base font-medium mx-3 flex items-center">
                Saved Cars
                <span className="ml-2 cursor-pointer" onClick={() => props.editReq('car',index,'cars',[])}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></span>                             
              </div>
              {c.cars.map((cr,crIdx) => {
                return <div className="flex items-center p-3 border rounded-md border-slate-400/60">
                  <div className="bg-dark rounded mr-5" style={{height:'50px', width:'50px', backgroundImage:`url(${filePath}/transport/${cr.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>
                  <div>
                    <div className="text-md font-medium ">Car no. {crIdx + 1}</div>
                    <div className="text-xs font-normal ">{cr.name}</div>
                    <div className="text-xs font-normal ">{(cr.type === 'AC') ? 'AC' : 'Non AC' } Booking</div>
                  </div>
                </div>
              })}
            </div> : '' }

            
          </div>
          <div className="px-5 pb-5">
            <AvailableTransports obj={c} city={c.cityId} fromDate={c.fromDate} toDate={c.toDate} type={props.enqType} fieldNames={props.fieldNames} editReq={(field,val) => props.editReq('car',index,field,val)} />
          </div>
        </div>})}

        
        <Button
            variant="primary"
            type="submit"
            className="text-xs mt-3 mr-2"
            onClick={() => props.handleReq('add','car',0)}
        >
        Add More
        </Button>
      {/* </div> */}
    </>
}

export default Car