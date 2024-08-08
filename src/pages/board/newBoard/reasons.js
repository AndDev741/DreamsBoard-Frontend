import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import ReasonItem from "./reasonItem";

function Reasons({reasonTitle, setReasonTitle, 
    reason1, setReason1, reasonImg1, setReasonImg1, reasonText1, setReasonText1, 
    reason2, setReason2, reasonImg2, setReasonImg2, reasonText2, setReasonText2, 
    reason3, setReason3, reasonImg3, setReasonImg3, reasonText3, setReasonText3}){

return(
        <div className="flex flex-col items-center justify-center">
            <input type='text'
            className={`bg-transparent text-center mt-5 mb-3 text-2xl font-bold text-redFont w-[90%] lg:w-[100%] ${reasonTitle.length < 1 ? "border-b-2 border-solid border-redFont" : ""? "border-b-2 border-solid border-redFont" : ""}`}
            value={reasonTitle}
            onChange={e => setReasonTitle(e.target.value)} />
            <div className="flex items-center justify-evenly text-center mt-3 flex-wrap">
                <ReasonItem reason={reason1} setReason={setReason1} reasonImg={reasonImg1} setReasonImg={setReasonImg1}
                reasonText={reasonText1} setReasonText={setReasonText1}
                />
                <ReasonItem reason={reason2} setReason={setReason2} reasonImg={reasonImg2} setReasonImg={setReasonImg2}
                reasonText={reasonText2} setReasonText={setReasonText2}
                />
                <ReasonItem reason={reason3} setReason={setReason3} reasonImg={reasonImg3} setReasonImg={setReasonImg3}
                reasonText={reasonText3} setReasonText={setReasonText3}
                />
            </div>
        </div>
        
    )
}

export default Reasons;