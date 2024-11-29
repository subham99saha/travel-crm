// @ts-nocheck

import { useState, useRef, useEffect } from "react";

import Button from "../../base-components/Button";
import { FormInput, FormLabel, FormSelect, FormTextarea } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { ClassicEditor } from "../../base-components/Ckeditor";

const notes = (props) => {
    const [note,setnote] = useState('')

    const submit = () => {
        const historyObj = {
            leadAssignTo: '',
            leadSubStatus: 'NOTE',
            leadActivity: {},
            note: note,
            task: ''
        }
        props.logAction(historyObj,['Success','Note added to lead'])
    }
    return (
        <>
            <div className="grid grid-cols-11 pb-20 gap-x-6">
          <div className="col-span-11 intro-y 2xl:col-span-9">
            {/* BEGIN: Sender Information */}
            <div className="p-5 intro-y box">
              <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />Notes
                </div>
                
                <div className="mt-5">
                  
                    <FormLabel className="xl:w-64 xl:!mr-10">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Enter Note</div>
                          <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                          </div>
                        </div>
                      </div>
                    </FormLabel>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <ClassicEditor
                      value={note}
                      onChange={setnote}
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

export default notes;