import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import editIcon from '../../assets/editIcon.png';


function EditPerfil({id, newPerfilImg, newName, newPerfilPhrase, setNewName, setNewPerfilPhrase, setNewPerfilImg}){
    const [greeting, setGreeting] = useState('');

    const [PerfilImg, setPerfilImg] = useState(newPerfilImg || null);

    useEffect(() => {
        const date = new Date().getHours();
        getHourMessage(date);
    }, []);

    function getHourMessage(hour) {
        if (hour >= 18 || hour < 5) {
            setGreeting("Good Night");
        } else if (hour >= 5 && hour < 11) {
            setGreeting("Good Morning");
        } else if (hour >= 11 && hour < 18) {
            setGreeting("Good Evening");
        }
    }


    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setNewPerfilImg(selectedFile);
        const reader = new FileReader();
        reader.onload = (event) => {
            setPerfilImg(event.target.result);
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
            <div className='flex items-center justify-between pt-5'>
                <div className="flex flex-col justify-center">
                    <div className="flex items-center lg:ml-3">
                        <div {...getRootProps()}
                        alt='Profile pic'
                        className="flex items-start justify-end w-[66px] h-[66px] rounded-full bg-cover cursor-pointer px-5"
                        style={{backgroundImage: PerfilImg ? `url(${PerfilImg})` : ''}} >
                            <img className='w-[20px] h-[20px]' 
                            src={editIcon} />
                            <input {...getInputProps()} className="hidden" />
                        </div>
                        
                        <div className="ml-3">
                            <div className='flex md:flex-nowrap flex-wrap items-start justify-start text-xl text-redFont font-black'>
                                <p className='md:w-[60%]'>{greeting}</p>
                                <input className='w-[100%] bg-transparent border-b-2 border-red-500 mt-1'
                                value={newName}
                                onChange={e => setNewName(e.target.value)} />
                            </div>
                            <input className='bg-transparent border-b-2 border-red-500 text-redFont font-medium' 
                            value={newPerfilPhrase}
                            onChange={e => setNewPerfilPhrase(e.target.value)}/>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4 w-full border-solid border-[1px] border-redFont'></div>
        </div>
    
    )
}

export default EditPerfil;