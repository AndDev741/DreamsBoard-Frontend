import { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { background_imgEnter } from "./newBoardSlice";

function MainSection({background_img, setBackground_img}){
    const dispatch = useDispatch();
    const [file, setFile] = useState();
    const [backgroundImage, setBackgroundImage] = useState(background_img || '');

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
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
            <div className="flex flex-col items-center justify-center w-full h-[241px] bg-bgSecondary lg:w-[100%]  cursor-pointer bg-cover border-dashed border-2 border-redFont rounded-b-md"
                style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : `none`, border: backgroundImage ? 'none': '' }}>
                <h2 className={`text-center text-2xl font-black text-redFont ${backgroundImage? 'hidden' : 'block'}`}>Add your main picture or Drop</h2>
                <input {...getInputProps()} className="bg-transparent " />
            </div>
        </div>
    )
}

export default MainSection;