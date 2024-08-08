import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';

function ObjectiveSection({setObjective_img, objective_text, setObjective_text}){
    const [backgroundImage, setBackgroundImage] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setObjective_img(selectedFile);

        const reader = new FileReader();
        reader.onload = (event) => {
            setBackgroundImage(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
          'image/*': ['.jpeg', '.png']   
        },
    });

    return(
        <div className="flex items-center justify-between lg:justify-evenly">
            <div>
                <div {...getRootProps()} 
                className="flex items-center justify-center w-[173px] h-[216px] bg-bgSecondary rounded-md bg-cover border-2 border-dashed border-redFont cursor-pointer"
                style={{backgroundImage: backgroundImage ? `url(${backgroundImage})` : '', border: backgroundImage ? 'none': ''}}>
                    <p  className={`text-md text-redFont font-bold mt-2 ${backgroundImage ? 'hidden' : 'block'}`}>Add a image here</p>
                    <input {...getInputProps()} className="hidden" />
                </div>
            </div>
            <div className="flex items-center justify-center w-[50vw] lg:w-[50%]">
                <textarea className={`bg-transparent text-[18px] text-redFont font-bold min-h-[180px] md:min-h-[100px] text-center w-[40vw] ${objective_text.length < 1 ? "border-solid border-2 border-redFont rounded-md" : ""}`}
                value={objective_text}
                onChange={e => setObjective_text(e.target.value)} />
            </div>
        </div>
    )
}

export default ObjectiveSection;