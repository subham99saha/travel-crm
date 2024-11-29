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
import AvailableActivities from "../available/activities";

import api from "../../../../apiconfig.json";

function Activity(props) {
    const filePath = api.FILE_PATH;

    return <>
        {/* <div style={{display: (props.activity.show) ? 'block' : 'none'}} className="p-5 border-dashed border-2 rounded-md border-slate-400/60 dark:border-darkmode-400 mt-5">
        <div className="flex items-center pb-2 text-base font-medium ">
          <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> ACTIVITY
        </div> */}
        {props.activity.activityArr.map((a,index) => {
        return <div key={index} className="border rounded-md border-slate-200/60 shadow-xl dark:border-darkmode-400 mt-3">
        <div className="grid grid-cols-2 gap-4 bg-slate-100 rounded-t-sm p-5 text-base font-medium ">
          <div className="justify-self-start" > Activity {index + 1} Details</div>
          <div className="justify-self-end" onClick={() => props.handleReq('remove','activity',index)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>
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
                  value={a.cityId}
                  onChange={(e) => props.editReq('activity',index,'cityId',e.target.value)}
                >
                  <option value="">Select City</option>
                  { props.city.map((item) => {
                    return <option key={item.id} value={item.id}>{item.cityName}</option>
                  })}
                </FormSelect>
                {/* <TomSelect 
                  className="sm:mr-2"
                  value={a.cityId}
                  onChange={(val) => props.editReq('activity',index,'cityId',val)}
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
                    <div className="font-medium">Start on</div>
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
                  value={a.fromDate}
                  onChange={(e) => props.editReq('activity',index,'fromDate',e.target.value)}
                />
              </div>
            </FormInline>
            </div>
            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">End on</div>
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
                  value={a.toDate}
                  onChange={(e) => props.editReq('activity',index,'toDate',e.target.value)}
                />
              </div>
            </FormInline>
            </div>

            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">Adults</div>
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
                <FormInput
                  type="number"
                  placeholder=""
                  value={a.adult}
                  onChange={(e) => props.editReq('activity',index,'adult',e.target.value)}
                />
              </div>
            </FormInline>
            </div>

            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">Kids</div>
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
                <FormInput
                  type="number"
                  placeholder=""
                  value={a.kid}
                  onChange={(e) => props.editReq('activity',index,'kid',e.target.value)}
                />
              </div>
            </FormInline>
            </div>

            <div>
            <FormInline className="flex-col items-start pt-5 mt-5 first:mt-0 first:pt-0">
              <FormLabel className="">
                <div className="text-left">
                  <div className="flex items-center">
                    <div className="font-medium">Infants</div>
                  </div>
                </div>
              </FormLabel>
              <div className="flex-1 w-full mt-3">
                <FormInput
                  type="number"
                  placeholder=""
                  value={a.infant}
                  onChange={(e) => props.editReq('activity',index,'infant',e.target.value)}
                />
              </div>
            </FormInline>
            </div>

            {(Object.keys(a.activity).length != 0) ? <div className="col-span-3 grid grid-cols-5 gap-2 my-3">
              <div className="col-span-6 text-base font-medium mx-3 flex items-center">
                Saved Activity
                <span className="ml-2 cursor-pointer" onClick={() => props.editReq('activity',index,'activity',{})}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg></span>                             
              </div>
                <div className="flex items-center p-3 border rounded-md border-slate-400/60">
                  <div className="bg-dark rounded mr-5" style={{height:'50px', width:'50px', backgroundImage:`url(${filePath}/activity/${a.activity.image})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>
                  <div>
                    <div className="text-md font-medium ">Activity</div>
                    <div className="text-xs font-normal ">{a.activity.name}</div>
                  </div>
                </div>
            </div> : '' }

            
          </div>
          <div className="px-5 pb-5">
            <AvailableActivities obj={a} city={a.cityId} fromDate={a.fromDate} toDate={a.toDate} type={props.enqType} fieldNames={props.fieldNames} editReq={(field,val) => props.editReq('activity',index,field,val)} />
          </div>
        </div>})}

        
        <Button
            variant="primary"
            type="submit"
            className="text-xs mt-3 mr-2"
            onClick={() => props.handleReq('add','activity',0)}
        >
        Add More
        </Button>
      {/* </div> */}
    </>
}

export default Activity