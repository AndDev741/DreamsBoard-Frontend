import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { useTranslation } from "react-i18next";

function MainObjectiveSection({mainObjective_img, setMainObjective_img, mainObjective_text, setMainObjective_text}) {
    const {t} = useTranslation();
    const [backgroundImage, setBackgroundImage] = useState(mainObjective_img || null);

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
        maxSize: 10000000,
    });

    return(
        <div className="flex flex-col items-center justify-center my-6">
            <div {...getRootProps()}
                className="flex items-center justify-center w-[90vw] lg:w-[550px] h-[169px] lg:h-[250px] bg-[#31cac0] hover:bg-[#41e0d6] rounded-md bg-cover border-redFont cursor-pointer"
                style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : `none`, border: backgroundImage ? 'none': '' }}>
                    
                <p className={`text-xl text-redFont font-bold mt-2 ${backgroundImage ? 'hidden' : 'block'}`}>{t('BackgroundImagesPhrase')}</p>
                <input {...getInputProps()} className="bg-transparent" />
            </div>

            <div className="flex items-center justify-center">
                <input type={'text'}
                value={mainObjective_text}
                onChange={e => setMainObjective_text(e.target.value)}
                className={`bg-transparent text-2xl font-bold mt-2 text-center w-[90vw] md:w-[80vw] lg:w-[500px] ${mainObjective_text.length < 1 ? "border-b-2 border-solid border-black" : ""}`} />
            </div>
        </div>
    )
}

export default MainObjectiveSection;