// @ts-nocheck

import { useState, useRef, useEffect } from "react";

import Button from "../../base-components/Button";
import { FormInput, FormLabel, FormSelect, FormTextarea, FormHelp } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { ClassicEditor } from "../../base-components/Ckeditor";

import { indexEmployees } from "../../pages/Employee/api"

const tasks = (props) => {
    const [taskHead,settaskHead] = useState('')
    const [taskBody,settaskBody] = useState('')
    const [employees,setemployees] = useState([])
    const [assTo,setassTo] = useState('')

    useEffect(() => {
        async function fetchData() {
          const emp = await indexEmployees()
          console.log({emp})
          setemployees(emp)
        }
        fetchData();
    },[]);

    const submit = () => {
        const historyObj = {
            leadAssignTo: assTo,
            leadSubStatus: 'TASK',
            leadActivity: {},
            task: {
              taskHead,
              taskBody
            },
            note: ''
        }
        props.logAction(historyObj,['Success','Task added to lead'])
    }
    return (
        <>
            <div className="grid grid-cols-11 pb-20 gap-x-6">
          <div className="col-span-11 intro-y 2xl:col-span-9">
            {/* BEGIN: Sender Information */}
            <div className="p-5 intro-y box">
              <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />Tasks
                </div>
                
                <div className="mt-5">
                <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Assign to</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-1 xl:mt-0">
                      <FormSelect id="" value={assTo} onChange={(e) => setassTo(e.target.value)}>
                        <option value=''>Select agent</option>
                        {employees.map(em => {
                          return <option key={em.id} value={em.id}>{em.empEmail} - ({em.empName})</option>
                        })}
                      </FormSelect>
                    </div>
                </div>
                <div className="mt-5">
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Task Head</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-1 xl:mt-0">
                      <FormInput                        
                        type="text"
                        placeholder="Task Heading"
                        value={taskHead}
                        onChange={(e) => settaskHead(e.target.value)}
                      />
                      <FormHelp className="text-right">
                        Maximum character 0/50
                      </FormHelp>
                    </div>
                </div>
                <div className="mt-5">
                  
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Enter Task</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-1 xl:mt-0">
                    <ClassicEditor
                      value={taskBody}
                      onChange={settaskBody}
                    />
                      {/* <FormHelp className="text-right">
                        Maximum character 0/15
                      </FormHelp> */}
                    </div>
                  
                </div>

                <div className="flex flex-col justify-end gap-2 mt-5 md:flex-row">
            
                    <Button
                        variant="primary"
                        type="button"
                        className="w-full md:w-52"
                        onClick={() => submit()}
                    >
                        Submit
                    </Button>
                </div>
              </div>
            </div>
            </div></div>
        </>
    )
}

export default tasks;