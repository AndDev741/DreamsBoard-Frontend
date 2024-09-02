import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';

function MainSection({background_img, setBackground_img}){
    const [backgroundImage, setBackgroundImage] = useState(background_img || '');

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setBackground_img(selectedFile)

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target.result;
            setBackgroundImage(base64String);            

        };
        reader.readAsDataURL(selectedFile);

        return () => {
            reader.abort();
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
          'image/*': ['.jpeg', '.png']   
        },
    });

    return(
        <div {...getRootProps()} className="bg-bgSecondary rounded-b-md">
            <div className="flex flex-col items-center justify-center w-full h-[241px] bg-[#31cac0] lg:w-[100%]  cursor-pointer bg-cover rounded-b-md hover:bg-[#41e0d6] p-2"
                style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : `none`, border: backgroundImage ? 'none': '' }}>
                <h2 className={`text-center text-2xl font-bold ${backgroundImage? 'hidden' : 'block'}`}>Click or drop here the image</h2>
                <input {...getInputProps()} className="bg-transparent " />
            </div>
        </div>
    )
}

export default MainSection;