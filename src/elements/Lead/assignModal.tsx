// @ts-nocheck

import { useState, useRef, useEffect } from "react";

import { Dialog } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import { FormInput, FormLabel, FormSelect, FormTextarea } from "../../base-components/Form";

import { assignLead } from "../../pages/Booking/api"
import { indexEmployees } from "../../pages/Employee/api"

const assignModal = (props)=> { 
    const [assStatus,setassStatus] = useState(props.assStatus)
    const [assTo,setassTo] = useState(props.assTo)
    const [employees,setemployees] = useState([])

    useEffect(() => {
        async function fetchData() {
          const emp = await indexEmployees()
        //   console.log({emp})
          setemployees(emp)
        }
        fetchData();
      },[]);

    const handleAssign = async () => {
        if (props.toAssign != null) {
          console.log({ assStatus })
          const response = await assignLead({ assStatus, assTo },props.toAssign)
          props.refresh()
          console.log({response})
        }
    }

    return (
        <>
    <Dialog
        open={props.assignConfirmationModal}
        onClose={() => {
          props.setassignConfirmationModal(false);
        }}
        // initialFocus={deleteButtonRef}
    >
        <Dialog.Panel>
            <Dialog.Title>
                <h2 className="mr-auto text-base font-medium">
                    Assign agent
                </h2>
            </Dialog.Title>
            <Dialog.Description className="grid grid-cols-12 gap-4 gap-y-3">
                <div className="col-span-12 sm:col-span-12">
                  <FormLabel htmlFor="">
                      Assign Date
                  </FormLabel>
                  <FormInput
                      type="date"
                  />
                </div>
                <div className="col-span-12 sm:col-span-12">
                    <FormLabel htmlFor="">
                        Note
                    </FormLabel>
                    <FormTextarea id="" type="text" placeholder="Notes" rows="4" />
                </div>
                <div className="col-span-12 sm:col-span-12">
                    <FormLabel htmlFor="">
                        Status
                    </FormLabel>
                    <FormSelect id="" value={assStatus} onChange={(e) => setassStatus(e.target.value)}>
                      <option value='NL'>Unassigned</option>
                      <option value='ASS'>Assigned</option>
                      <option value='FOLL'>Follow Up</option>
                      <option value='POT'>Potential</option>
                      <option value='CUS'>Customer</option>
                      <option value='PAX'>Pax</option>
                      <option value='REQ'>Requirement</option>
                      <option value='PAY'>Payment</option>
                      <option value='CLS'>Closed</option>
                    </FormSelect>
                </div>
                <div className="col-span-12 sm:col-span-12">
                    <FormLabel htmlFor="">
                        Priority
                    </FormLabel>
                    <FormSelect id="">
                      <option value='Low'>Low</option>
                      <option value='Medium'>Medium</option>
                      <option value='High'>High</option>
                    </FormSelect>
                </div>
                <div className="col-span-12 sm:col-span-12">
                    <FormLabel htmlFor="">
                        Assign To
                    </FormLabel>
                    <FormSelect id="" value={assTo} onChange={(e) => setassTo(e.target.value)}>
                      <option value=''>Select agent</option>
                      {employees.map(em => {
                        return <option key={em.id} value={em.id}>{em.empEmail} - ({em.empName})</option>
                      })}
                    </FormSelect>
                </div>
            </Dialog.Description>
            <Dialog.Footer>
                <Button type="button" variant="outline-secondary" onClick={()=> {
                    props.setassignConfirmationModal(false);
                    }}
                    className="w-20 mr-1"
                    >
                    Cancel
                </Button>
                <Button variant="primary" type="button" onClick={() => {handleAssign(); props.setassignConfirmationModal(false)}} className="mr-1">
                    Assign
                </Button>
            </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
        </>
    )
}

export default assignModal;