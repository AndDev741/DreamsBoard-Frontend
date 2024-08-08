import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';

function MainObjectiveSection({setMainObjective_img, mainObjective_text, setMainObjective_text}) {
    const [backgroundImage, setBackgroundImage] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setMainObjective_img(selectedFile)
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
        <div className="flex flex-col items-center justify-center my-6">
            <div {...getRootProps()}
                className="flex items-center justify-center w-[80vw] lg:w-[450px] h-[169px] bg-bgSecondary rounded-md bg-cover border-2 border-dashed border-redFont cursor-pointer"
                style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : `none`, border: backgroundImage ? 'none': '' }}>
                    
                <p className={`text-md text-redFont font-bold mt-2 ${backgroundImage ? 'hidden' : 'block'}`}>Add a image here</p>
                <input {...getInputProps()} className="bg-transparent" />
            </div>

            <div className="flex items-center justify-center">
                <input type={'text'}
                value={mainObjective_text}
                onChange={e => setMainObjective_text(e.target.value)}
                className={`bg-transparent md:text-2xl text-redFont font-bold mt-2 text-center w-[90vw] md:w-[80vw] lg:w-[400px] ${mainObjective_text.length < 1 ? "border-b-2 border-solid border-redFont" : ""}`} />
            </div>
        </div>
    )
}

export default MainObjectiveSection;