import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
function ReasonItem({reason, setReason, reasonImg, setReasonImg, reasonText, setReasonText}){
    const [backgroundImg, setBackgroundImg] = useState(reasonImg);
    const [modal, setModal] = useState(true);

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setReasonImg(selectedFile);
        const reader = new FileReader();
        reader.onload = (event) => {
            setBackgroundImg(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
          'image/*': ['.jpeg', '.png']   
        },
    })
    return(
        <div>
            <div className={`flex flex-col items-center mx-6 lg:mx-9 cursor-pointer mt-2`}>
            <button className="w-[60px] h-[60px] rounded-full bg-[#31cac0] hover:bg-[#41e0d6] bg-cover"
            style={{backgroundImage: backgroundImg ? `url(${backgroundImg})` : "none"}}
            onClick={e => setModal(!modal)}></button>

            <input className={`bg-transparent w-[120px] text-center ${reason.length > 0 ? "" : "border-b-2 border-black"}`}
            value={reason}
            onChange={e => setReason(e.target.value)} />
            </div>
            <ReasonDetails modal={modal} backgroundImg={backgroundImg} setBackgroundImg={setBackgroundImg}
            getRootProps={getRootProps} getInputProps={getInputProps} reasonText={reasonText} setReasonText={setReasonText}/>
        </div>
        
    )
}

function ReasonDetails({modal, backgroundImg, setImageReason, getRootProps, getInputProps, reasonText, setReasonText}){
    return(
        <div className={`bg-[#32dace] w-[40vw] md:w-[185px] md:min-h-[225px] rounded-md border-[#31cac0] border-solid border-2 ${modal ? 'block' : 'hidden'} mx-1 md:mx-4 mt-2`}>
            <div className="flex flex-col items-center justify-evenly h-full px-1 py-2 md:px-3" >
                <div className="cursor-pointer" {...getRootProps()}>
                    <div className={`flex items-center md:my-2 justify-center w-[80px] h-[80px] rounded-full bg-cover border-2 border-[#1d5f5b] ${backgroundImg ? 'border-none text-transparent' : ''}`} 
                    style={{backgroundImage: backgroundImg ? `url(${backgroundImg})` : 'none'}}>
                        <p className="text-center">Image here</p>
                    </div>

                    <input {...getInputProps()} className="hidden" />
                </div>
                <div>
                    <textarea type={'text'}
                    className={`${reasonText.length === 0 ? 'border-2 border-solid border-black rounded-md' : ""} bg-transparent text-center text-redFont font-bold w-[100%] h-[100px]`}
                    value={reasonText}
                    onChange={e => setReasonText(e.target.value)} 
                    />
                </div>
            </div>
        </div>
    )
}

export default ReasonItem;