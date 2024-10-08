import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import editIcon from '../../assets/editIcon.png';
import { useTranslation } from 'react-i18next';


function EditPerfil({newPerfilImg, newName, newPerfilPhrase, setNewName, setNewPerfilPhrase, setNewPerfilImg}){

    const [PerfilImg, setPerfilImg] = useState(newPerfilImg || null);

    const { t } = useTranslation();
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
        const date = new Date().getHours();
        getHourMessage(date);
    }, [getHourMessage]);

    function getHourMessage(hour) {
        if (hour >= 18 || hour < 5) {
            setGreeting(t('GoodNigth'));
        } else if (hour >= 5 && hour < 11) {
            setGreeting(t('GoodMorning'));
        } else if (hour >= 11 && hour < 18) {
            setGreeting(t('GoodEvening'));
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
            <div className='flex items-center p-5'>
                <div className="flex flex-col justify-center">
                    <div className="flex flex-col items-center lg:ml-3">
                        
                        <div className='md:flex md:items-center justify-center w-[110%]'>
                            <div {...getRootProps()}
                            className='flex flex-col items-center cursor-pointer'>
                                <input {...getInputProps()}
                                className='hidden' />
                                <img
                                alt={t('ProfilePicAlt')}
                                className="flex items-start w-[100px] md:w-[80px] h-[100px] md:h-[80px] rounded-full bg-cover"
                                src={PerfilImg}
                                />
                                <div className='flex'>
                                    <p className='text-center'>{t('EditPerfilImgPhrase')}</p>
                                    <img src={editIcon} alt={t('EditIconAlt')}
                                    className='w-[20px] h-[20px] ml-1' />
                                </div>
                            </div>

                            {/* DESKTOP */}
                            <div className='hidden md:flex items-center text-xl font-black md:mt-[-20px]'>
                                <p>{greeting}</p>
                                <input className='text-[#3A807A] bg-transparent border-b-2 border-greenMain w-[50%] ml-2'
                                value={newName}
                                onChange={e => setNewName(e.target.value)} />
                                <img src={editIcon} alt={t('EditIconAlt')}
                                className='w-[20px] h-[20px] ml-1' />
                            </div>
                        </div>

                        
                        <div className='md:hidden text-xl font-black mt-5'>
                            <p>{greeting}</p>
                            <br/>
                            <div className='flex items-center'>
                                <input className='text-[#3A807A] bg-transparent border-b-2 border-greenMain w-[70%] mt-[-20px]'
                                value={newName}
                                onChange={e => setNewName(e.target.value)} />
                                <img src={editIcon} alt={t('EditIconAlt')}
                                className='w-[20px] h-[20px] ml-1' />
                            </div>
                        </div>

                        

                        <div className="flex flex-col items-center justify-center mt-5">
                            <p className='text-xl'>{t('YourPerfilPhrase')}</p>
                           <div className='flex items-center'>
                            <input className='bg-transparent border-b-2 border-greenMain text-center text-[24px] font-ligth' 
                                value={newPerfilPhrase}
                                onChange={e => setNewPerfilPhrase(e.target.value)}/>
                                <img src={editIcon} alt={t('EditIconAlt')}
                                    className='w-[20px] h-[20px] ml-1' />
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    )
}

export default EditPerfil;