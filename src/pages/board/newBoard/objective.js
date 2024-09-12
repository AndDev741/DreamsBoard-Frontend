import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { useTranslation } from "react-i18next";

function ObjectiveSection({objective_img, setObjective_img, objective_text, setObjective_text}){
    const {t} = useTranslation();
    const [backgroundImage, setBackgroundImage] = useState(objective_img || null);

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
        maxSize: 10000000,
    });

    return(
        <div className="flex items-center justify-between md:justify-evenly">
            <div>
                <div {...getRootProps()} 
                className="flex items-center justify-center w-[173px] lg:w-[200px] h-[270px] bg-[#31cac0] hover:bg-[#41e0d6] rounded-md bg-cover cursor-pointer ml-5 md:ml-0"
                style={{backgroundImage: backgroundImage ? `url(${backgroundImage})` : '', border: backgroundImage ? 'none': ''}}>
                    <p  className={`text-center text-xl text-redFont font-bold mt-2 p-1 ${backgroundImage ? 'hidden' : 'block'}`}>{t('BackgroundImagesPhrase')}</p>
                    <input {...getInputProps()} className="hidden" />
                </div>
            </div>
            <div className="flex items-center justify-center w-[50vw] lg:w-[50%]">
                <textarea className={`bg-transparent text-[18px] text-redFont font-bold min-h-[150px] md:min-h-[100px] text-center w-[40vw] ${objective_text.length < 1 ? "border-solid border-2 border-redFont rounded-md" : ""}`}
                value={objective_text}
                onChange={e => setObjective_text(e.target.value)} />
            </div>
        </div>
    )
}

export default ObjectiveSection;