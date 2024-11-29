// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from "react";
// import Button from "../../base-components/Button";
// import { Key } from "lucide-react";
import {
    FormLabel,
    FormInput,
} from "../../base-components/Form";

function Paxx(props) {
    const [paxx,setPaxx] = useState([0,0,0,0,0])
    // const [renderer,setRenderer] = useState(0)
    useEffect(() => {
        // console.log({ dayDetailsForPaxx: props.dayDetails })
        setPaxx([0,0,0,0,0])
        // setRenderer(renderer + 1)
        props.dayDetails.map((day,i) => {
            let cat = [1,2,4,6,8]
            day.hotel.map(h => {
                let seasonCheck = (props.season === 'On-season') ? 'Season' : 'OffSeason'
                let price = getHotel(h)['minRoomRent' + seasonCheck + 'AC']
                let group = 2
                let newPaxx = paxx.map((p,i) => {
                    return (p + price * (Math.floor(cat[i] / group) + Number(!!(cat[i] % group)))) 
                })
                // console.log({paxx})
                setPaxx(newPaxx)
            })            
        })
    },[props.dayDetails, props.season])

    const getHotel = (id) => {
        let h = props.hotel.data.filter(x => x.id === id)
        return h[0]
    }
    return (
        <div className="grid grid-cols-12 gap-2">
            {paxx.slice(1).map((p,idx) => {
                return <div key={idx + 1} className="mt-3 col-span-3 input-form">
                    <FormLabel
                    htmlFor={"PAX" + idx + 1}
                    className="flex flex-col w-full sm:flex-row"
                    >
                    {(idx + 1)*2} PAX
                    {/* <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                        Required, at least 2 characters
                    </span> */}
                    </FormLabel>
                    <FormInput
                    id={"PAX" + idx + 1}
                    name={"PAX" + idx + 1}
                    type="text"
                    placeholder="Enter PAX"
                    value={p}
                    />
                </div>
            })}
        </div>
    );
}

export default Paxx;