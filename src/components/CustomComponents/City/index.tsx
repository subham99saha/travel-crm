// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import { fetchAllCity, deleteCity } from "../../../pages/City/CitySlice";
import { useAppSelector, useAppDispatch } from "../../../stores/hooks";
import TomSelect from "../../../base-components/TomSelect";
import _ from "lodash";

const Main = ()=>{
    const [select, setSelect] = useState("102");
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.city);

    useEffect(()=>{
      dispatch(fetchAllCity());
  },[]);  
  
  console.log("City", data);

  return (
    <>
        <TomSelect
                          
                          id="validation-form-1"
                          name="countryId"
                          value={select}
                          onChange={setSelect}
                          options={{
                            placeholder: "Select City",
                          }}
                          className="w-full"
                        >
                          { _.take(data, data.length).map((item, Key)=>(
                            <option value={item.id}>{item.cityName}</option>
                          )
                            
                          )}
                        </TomSelect>
    </>
  );
}

export default Main;