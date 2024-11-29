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
import AvailableHotels from "../available/hotels";

import api from "../../../../apiconfig.json";

function Hotel(props) {
    const filePath = api.FILE_PATH;

    return <>
    {/* <div style={{display: (props.hotel.show) ? 'block' : 'none'}} className="p-5 border-dashed border-2 rounded-md border-slate-400/60 dark:border-darkmode-400 mt-5">
        <div className="flex items-center pb-2 text-base font-medium ">
          <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> HOTELS
        </div> */}
        {props.hotel.hotelArr.map((h,index) => {
        return <div className="border rounded-md border-slate-200/60 shadow-xl dark:border-darkmode-400 mt-3">
          <div className="grid grid-cols-2 gap-4 bg-slate-100 rounded-t-sm p-5 text-base font-medium ">
            <div className="justify-self-start" > Hotel {index + 1} Details</div>
            <div className="justify-self-end" onClick={() => props.handleReq('remove','hotel',index)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mt-5 p-5 gap-y-5">
          
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
                  value={h.cityId}
                  onChange={(e) => props.editReq('hotel',index,'cityId',e.target.value)}
                >
                  <option value="">Select City</option>
                  { props.city.map((item) => {
                    return <option value={item.id}>{item.cityName}</option>
                  })}
                </FormSelect>
              </div>
            </FormInline>
            </div>
            {/* <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">Days</div>
                    // <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                    //   Required
                    // </div>
                  </div>
                  <div className="mt-3 text-xs leading-relaxed text-slate-500">
                    Select first and last day of stay.
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
              <div className="relative w-56 mx-auto">
              <div className="flex-1 w-full mt-3">
                <Litepicker 
                  // value={hotelDaterange} 
                  // onChange={sethotelDaterange} 
                  value={h.dayRange}
                  onChange={(val) => props.editReq('hotel',index,'dayRange',val)}
                  options={{
                            autoApply: false,
                            singleMode: false,
                            numberOfColumns: 2,
                            numberOfMonths: 2,
                            showWeekNumbers: true,
                            dropdowns: {
                                minYear: 1990,
                                maxYear: null,
                                months: true,
                                years: true,
                            },
                        }} className="block w-56 mx-auto" />
              </div>
              </div>
              </div>
            </FormInline>
            </div> */}
            <div>
              <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                <FormLabel className="">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Check-In</div>
                      <div className="ml-1 text-red-600">*</div>
                      {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                      </div> */}
                    </div>
                    {/* <div className="mt-3 text-xs leading-relaxed text-slate-500">
                      Select first and last day of stay.
                    </div> */}
                  </div>
                </FormLabel>
                <div className="flex-1 w-full mt-3">
                  <FormInput
                    // id="contactPerson"
                    type="date"
                    value={h.startDate}
                    onChange={(e) => props.editReq('hotel',index,'startDate',e.target.value)}
                  />
                </div>
              </FormInline>
            </div>
            <div>
              <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                <FormLabel className="">
                  <div className="text-left">
                    <div className="flex items-center">
                      <div className="font-medium">Check-Out</div>
                      <div className="ml-1 text-red-600">*</div>
                      {/* <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                        Required
                      </div> */}
                    </div>
                    {/* <div className="mt-3 text-xs leading-relaxed text-slate-500">
                      Select first and last day of stay.
                    </div> */}
                  </div>
                </FormLabel>
                <div className="flex-1 w-full mt-3">
                  <FormInput
                    // id="contactPerson"
                    type="date"
                    value={h.endDate}
                    onChange={(e) => props.editReq('hotel',index,'endDate',e.target.value)}
                  />
                </div>
              </FormInline>
            </div>
            
            <div className="col-span-3 grid grid-cols-12 gap-2 mt-5 ">
              {h.preferrences.map((p,prefIdx) => {
                return <div key={prefIdx} className="px-5 col-span-2 rounded-md border-dashed border-2 border-slate-600/60 dark:border-darkmode-400">
                <div className="py-2 text-sm font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <span className="">Person {prefIdx + 1}</span>
                  <div className="mt-0.5 float-end text-slate-500" onClick={() => props.handleAprxPax('hotel',index,'remove',prefIdx)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>

                </div> 
                {/* <div className="grid grid-cols-5 py-3 items-center text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <div className="col-span-4"><Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />Person {prefIdx + 1}</div>
                  <div className="justify-self-end" onClick={() => props.handleReq('remove','hotel',index)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>

                </div>           */}
                <div className="my-5">
                  <div>
                  <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
                    <FormLabel className="">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Meal Preference</div>
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
                        value={p.mealPlan}
                        onChange={(e) => props.editPref('hotel',index,'mealPlan',prefIdx,e.target.value)}
                      >
                        {/* <option value="">None</option> */}
                        <option value="">EP</option>
                        <option value="AP">AP</option>
                        <option value="CP">CAP</option>
                        <option value="MAP">MAP</option>
                      </FormSelect>
                    </div>
                  </FormInline>
                  </div>
                </div>
              </div>
              })}           

              <div className="flex items-center">
                <Button variant="" className="bg-none border-dashed border-2 rounded text-slate-500" onClick={() => props.handleAprxPax('hotel',index,'add',0)} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </Button>
              </div>            
            </div>
            
            {(h.room.length != 0) ? <div className="col-span-3 grid grid-cols-5 gap-2 my-3">
              <div className="col-span-6 text-base font-medium mx-3 flex items-center">
                Saved Rooms
                <span className="ml-2 cursor-pointer" onClick={() => props.editReq('hotel',index,'rooms',[])}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></span>                             
              </div>
              {h.room.map((rm,rmIdx) => {
                return <div className="flex items-center p-3 border rounded-md border-slate-400/60">
                  <div className="bg-dark rounded mr-5" style={{height:'50px', width:'50px', backgroundImage:`url(${filePath}/hotel/${h.hotel.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>
                  <div>
                    <div className="text-md font-medium ">Room no. {rmIdx + 1}</div>
                    <div className="text-xs font-normal ">Room for {rm.adultCount}</div>
                    <div className="text-xs font-normal ">{(rm.kidCount) ? `${rm.kidCount} kid(s)` : ''}</div>
                    <div className="text-xs font-normal ">{(rm.extraBedCount) ? `${rm.extraBedCount} extra bed(s)` : ''}</div>
                  </div>
                </div>
              })}
            </div> : '' }
          </div>

          <div className="px-5 pb-5">
            <AvailableHotels obj={h} city={h.cityId} checkIn={h.startDate} checkOut={h.endDate} type={props.enqType} fieldNames={props.fieldNames} preferrences={h.preferrences} editReq={(field,val) => props.editReq('hotel',index,field,val)} />
          </div>
        </div>})}
        <Button
            variant="primary"
            type="submit"
            className="text-xs mt-3 mr-2"
            onClick={() => props.handleReq('add','hotel',0)}
        >
        Add More
        </Button>
      {/* </div> */}
    </>
}

export default Hotel