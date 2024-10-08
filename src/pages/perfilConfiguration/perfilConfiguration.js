import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import customAxios from '../../axiosConfig';
import EditPerfil from "./editPerfil";
import backIcon from "../../assets/BackIcon.png";
import perfilIcon from "../../assets/perfilIcon.png";
import emailIcon from "../../assets/emailIcon.png";
import editEmailIcon from "../../assets/editEmailIcon.png";
import passwordIcon from "../../assets/passwordIcon.png";
import seePassIcon from "../../assets/seePassIcon.png";
import unSeePassIcon from "../../assets/unSeePassIcon.png";
import oldPasswordIcon from "../../assets/oldPasswordIcon.png";
import newPasswordIcon from "../../assets/newPasswordIcon.png";
import deleteIcon from "../../assets/deleteIcon.png";
import logoutIcon from "../../assets/logoutIcon.png";
import languageIcon from "../../assets/languageIcon.png";
import { img_linkEnter, nameEnter, perfil_phraseEnter } from "../authentication/loginSlice";
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

function PerfilConfiguration(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useSelector(state => state.login.id);
    
    async function verifyLogin() {
        try {
            const response = await customAxios.get(`/user/verify/${id}`);
            if(response.data.success){
                return null;
            }else{
                navigate("/");
            }
        } catch(e){
            console.error(e);
            navigate("/");
        }
    }
    useEffect( () => {
        verifyLogin();
    }, [])

    const {t, i18n} = useTranslation();
    let actualLanguage = i18n.language;
    function changeLanguage(lng) {
        i18n.changeLanguage(lng);
        console.log(i18n.language)
        
    }

    const [emailEditError, setEmailEditError] = useState("");
    const [passwordEditError, setPasswordEditError] = useState("");
    const [perfilEditError, setPerfilEditError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);

    
    const img_link = useSelector(state => state.login.img_link);
    const name = useSelector(state => state.login.name);
    const perfil_phrase = useSelector(state => state.login.perfil_phrase);

    const [newName, setNewName] = useState(name || "Put your name here!");
    const [newPerfilPhrase, setNewPerfilPhrase] = useState(perfil_phrase || "Put a nice phrase here!");
    const [newPerfilImg, setNewPerfilImg] = useState(img_link || null);

    const [newEmail, setNewEmail] = useState('');

    const [inputType ,setInputType] = useState('password');
    const [seePassword, setSeePassword] = useState(seePassIcon);
    const [seePassword2, setSeePassword2] = useState(seePassIcon);
    const [inputType2 ,setInputType2] = useState('password');
    
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const EmailValidationSchema = Yup.object().shape({
        email: Yup.string().email(t('YupInvalidEmail')).required(t('YupNecessaryEmail')),
    })

    const PasswordValidationSchema = Yup.object().shape({
        password: Yup.string().min(6, t('YupMinimumPassword')).required(t('YupNecessaryPassword'))
    })

    const handleSeePassword = () => {
        if(seePassword === seePassIcon){
            setSeePassword(unSeePassIcon);
            setInputType("text");
        }else if (seePassword === unSeePassIcon){
            setSeePassword(seePassIcon);
            setInputType("password");
        }
    }

    const handleSeePassword2 = () => {
        if(seePassword2 === seePassIcon){
            setSeePassword2(unSeePassIcon);
            setInputType2("text");
        }else if (seePassword2 === unSeePassIcon){
            setSeePassword2(seePassIcon);
            setInputType2("password");
        }
    }

    const handleLogout = async (e) => {
        e.preventDefault();

        sessionStorage.clear();
        try{
            await customAxios.post("/logout");   
            navigate("/");
        }catch(e){
            console.error(e);
            navigate("/");
        }    
    }

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'cf6ccdpv');
        const response = await axios.post('https://api.cloudinary.com/v1_1/drplvqymz/image/upload', formData);
        return response.data.secure_url;
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        let updatedImgLink = img_link;

        try{
            if(newPerfilImg && newPerfilImg !== img_link){
                updatedImgLink = await uploadImageToCloudinary(newPerfilImg)
            }

            const editData = {
                id: id,
                img_link: updatedImgLink,
                name: newName,
                perfil_phrase: newPerfilPhrase
            }


            const response = customAxios.put("/user/edit", editData);
            dispatch(img_linkEnter(updatedImgLink));
            dispatch(nameEnter(newName));
            dispatch(perfil_phraseEnter(newPerfilPhrase));
            setSuccess("")
            setPerfilEditError("");
            setSuccess((await response).data.success);

        }catch(e){
            console.error("Erro", e);
            setSuccess("");
            setPerfilEditError(t('EditErrorMessage'));
        }

    }

    const handleEmailEdit = async () => {
        const editEmailData = {
            id: id,
            newEmail: newEmail
        }
        setEmailEditError("");
        try{
            await EmailValidationSchema.validate({email: newEmail}, {abortEarly: false});
            try{
                const response = await customAxios.post("/user/editEmail", editEmailData);
                if(response.data.success){
                    navigate("/");
                }
            }catch(e){
                console.error("Error trying to edit email", e);
                setEmailEditError(t('EditEmailErrorMessage'));
            }
        }catch(validationErrors){
            setEmailEditError(validationErrors.errors.join(", "));
        }
    }

    const handlePasswordEdit = async () => {
        const editPassData = {
            id: id,
            oldPass: oldPassword,
            newPass: newPassword
        }

        try{
            await PasswordValidationSchema.validate({password: newPassword}, {abortEarly: false});

            try{
                const response = await customAxios.post("/user/editPassword", editPassData);
                if(response.data.success){
                    navigate("/");
                }
            }catch(e){
                console.error("Error trying to edit the password", e);
                setPasswordEditError(t('EditErrorMessage'));
            }
        }catch(validationErrors){
            setPasswordEditError(validationErrors.errors.join(", "))
        }
    }

    const handleConfirmDelete = () => {
        if(deleteModal === true){
            setDeleteModal(false);
            document.body.style.overflow = 'auto';
        }else if(deleteModal === false){
            setDeleteModal(true);
            document.body.style.overflow = 'hidden'
        }
        
    }
   

    return(
        <div className="mb-12">
            <div className="flex items-center justify-between">
                <h1 className="text-[32px] font-medium m-4">{t('Configuration')}</h1>
                <Link to={"/dashboard"}>
                    <img src={backIcon} alt={t('BackIconAlt')}
                    className="w-[40px] mr-6 cursor-pointer" />
                </Link>
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-evenly items-center lg:items-start">
                <div className="flex flex-col items-center w-[90vw] lg:w-[45vw] min-h-[310px] border-2 border-greenMain rounded-md">
                    <div className="flex items-center mt-3">
                        <img className="w-[30px] h-[30px] mr-2" 
                        src={perfilIcon} alt={t('PerfilIconAlt')}/>
                        <h2 className="text-2xl">{t('EditPerfilTitle')}</h2>
                    </div>
                    <EditPerfil newPerfilImg={newPerfilImg} newName={newName} newPerfilPhrase={newPerfilPhrase} setNewName={setNewName} setNewPerfilPhrase={setNewPerfilPhrase} setNewPerfilImg={setNewPerfilImg}/>

                    <button onClick={handleEdit}
                    className=" text-white font-medium w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed">{t('EditButton')}</button>
                    <p className="text-center text-xl text-blue-700 my-2">{success}</p>
                    <p className="text-center text-xl text-red-700">{perfilEditError}</p>
                </div>

                <div className="flex flex-col items-center justify-between w-[90vw] lg:w-[25vw] min-h-[310px] border-2 border-greenMain rounded-md mt-4 lg:mt-0">
                        <div className="flex items-center mt-3">
                            <img className="w-[30px] h-[30px] mr-2"
                            src={editEmailIcon} alt="Letter email icon" />
                            <h2 className="text-center text-2xl">{t('EditEmailText')}</h2>
                        </div>
                        
                        <form>
                            <label htmlFor="email" 
                            className="flex items-center border-solid border-2 border-greenMain rounded-[6px] hover:border-cyan-600">
                                <img className='w-[30px] h-[30px] mx-3 cursor-pointer'
                                src={emailIcon} alt={t('EmailIconAlt')}/>
                                <input name="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                id="email"
                                type="text"
                                className="bg-transparent w-[70vw] sm:w-[250px] h-[60px] md:h-[50px] text-[16px] pl-4 focus:outline-none"
                                placeholder={t('EditEmailPlaceholder')}/>
                            </label>
                        </form>   

                        <div className="flex flex-col items-center">
                            <p className="text-center text-xl mb-4">{t('EditEmailAndPassPhrase')}</p>
                            <button onClick={handleEmailEdit}
                            className="text-white font-medium w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed mb-3">{t('EditEmailText')}</button>
                            <p className="text-center text-xl text-red-700">{emailEditError}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between w-[90vw] lg:w-[25vw] min-h-[310px] border-2 border-greenMain rounded-md mt-4 lg:mt-0">
                        <div className="flex items-center mt-3">
                            <img className="w-[30px] h-[30px] mr-2"
                            src={passwordIcon} alt={t('PasswordIconAlt')}/>
                            <h2 className="text-center text-2xl">{t('EditPasswordText')}</h2>
                        </div>   
                        <form className="mt-2">
                            <label htmlFor="oldPassword" 
                            className="flex items-center border-solid border-2 border-greenMain rounded-[6px] hover:border-cyan-600">
                                <img className='w-[30px] h-[30px] mx-3 cursor-pointer'
                                src={oldPasswordIcon} alt={t('PasswordIconAlt')}/>
                                <input name={"oldPassword"}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                id="oldPassword"
                                type={inputType}
                                placeholder={t('OldPasswordPlaceholder')}
                                className="bg-transparent w-[55vw] sm:w-[100%] h-[60px] md:h-[50px] text-[16px] pl-4 focus:outline-none"
                                />
                                <img className='w-[33px] h-[33px] mx-3 cursor-pointer'
                                src={seePassword} alt={t('SeePasswordIconAlt')}
                                onClick={handleSeePassword}
                                />
                            </label>

                            <label htmlFor="newPassword" 
                            className="flex items-center border-solid border-2 border-greenMain rounded-[6px] hover:border-cyan-600 mt-3">
                                <img className='w-[30px] h-[30px] mx-3 cursor-pointer'
                                src={newPasswordIcon} alt={t('PasswordIconAlt')}/>
                                <input name={"newPassword"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                id="newPassword"
                                type={inputType2}
                                placeholder={t('NewPasswordPlaceholder')}
                                className="bg-transparent w-[55vw] sm:w-[100%] h-[60px] md:h-[50px] text-[16px] pl-4 focus:outline-none"
                                />
                                <img className='w-[33px] h-[33px] mx-3 cursor-pointer'
                                src={seePassword2} alt={t('SeePasswordIconAlt')}
                                onClick={handleSeePassword2}
                                />
                            </label>
                        </form>   
                        <div className="flex flex-col items-center">
                            <p className="text-center text-xl mb-4">{t('EditEmailAndPassPhrase')}</p>
                            <button onClick={handlePasswordEdit}
                            className="text-white font-medium w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed mb-2">{t('EditPasswordText')}</button>
                            <p className="text-center text-xl text-red-700">{passwordEditError}</p>
                        </div>
                    </div>
                
                
                <div className="flex flex-col lg:flex-row lg:justify-end items-center lg:w-[100%] mt-2">

                    <div className="flex flex-col items-center justify-start w-[90vw] lg:w-[25vw] min-h-[310px] border-2 border-greenMain rounded-md mt-4 lg:mt-0 lg:mr-[13px]">
                        <div className="flex items-center mt-3">
                            <img className="w-[30px] h-[30px] mr-2"
                            src={languageIcon} alt="open door icon"/>
                            <h2 className="text-center text-2xl">{t('ChangeLanguage')}</h2>
                        </div>                   
                        <div className="flex items-center justify-evenly mt-[20%] font-bold">
                            <div onClick={() => changeLanguage('en')}
                                className={`${actualLanguage === 'en' ? 'bg-greenMain  text-white rounded-md' : 'hover:bg-green-200'} text-center border-solid border-2 border-greenMain rounded-md mx-2 min-w-[100px] p-3 cursor-pointer `}>
                                    <p>English</p>
                                </div>
                                
                                <div onClick={() => changeLanguage('pt')}
                                className={`${actualLanguage === 'pt' || actualLanguage === 'pt-BR' ? 'bg-greenMain  text-white rounded-md' : 'hover:bg-green-200'} text-center border-solid border-2 border-greenMain rounded-md mx-2 min-w-[100px] p-3 cursor-pointer `}>
                                    <p>Portuguese</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between w-[90vw] lg:w-[25vw] min-h-[310px] border-2 border-greenMain rounded-md mt-4 lg:mt-0 lg:mr-[13px]">
                        <div className="flex items-center mt-3">
                            <img className="w-[30px] h-[30px] mr-2"
                            src={logoutIcon} alt="open door icon"/>
                            <h2 className="text-center text-2xl">{t('MakeLogoutText')}</h2>
                        </div>                   
                        <div className="flex flex-col items-center">
                            <p className="text-center text-2xl mb-4 p-1">{t('MakeLogoutPhrase')}</p>
                            <button onClick={handleLogout}
                            className="text-white font-medium w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed mb-3">{t('LogoutText')}</button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between w-[90vw] lg:w-[25vw] min-h-[310px] border-2 border-greenMain rounded-md mt-4 lg:mt-0 lg:mr-[13px]">
                        <div className="flex items-center mt-3">
                            <img className="w-[30px] h-[30px] mr-2"
                            src={deleteIcon} alt="trash icon"/>
                            <h2 className="text-center text-2xl">{t('DeleteAccountText')}</h2>
                        </div>   
                        <div className="flex flex-col items-center">
                            <p className="text-center text-2xl mb-4">{t('DeleteAccountPhrase')}</p>
                            <button onClick={handleConfirmDelete}
                            className="text-white font-medium w-[180px] h-[40px] bg-[#CD4D55] hover:bg-[#e26870] rounded-md text-xl hover:bg-lightRed mb-3">{t('DeleteText')}</button>
                        </div>
                    </div>
                </div>
                <DeleteModal deleteModal={deleteModal} handleConfirmDelete={handleConfirmDelete}/>
            </div>
        </div>
    )
}

function DeleteModal({handleConfirmDelete, setError, id, deleteModal}){
    const navigate = useNavigate();
    const {t} = useTranslation()

    const handleDelete = (e) => {
        e.preventDefault();

        try{
            customAxios.delete(`/user/${id}`);
            navigate("/");
        }catch(e){
            console.error(e);
            handleConfirmDelete();
            setError(t('DeleteErrorMessage'))
        }
    }
    return(
        <div className={`${deleteModal === true ? 'block' : 'hidden'} flex flex-col items-center justify-start rounded-md w-[100vw] h-[100vh] bg-white pt-12 p-3 fixed left-0 top-0`}>
            <h2 className="mt-2 text-2xl font-bold text-center">{t('DeleteAccountConfirmation')}</h2>
            <div className="flex items-center justify-center mt-5 m-1">
                <button onClick={handleConfirmDelete}
                className="text-white mx-1 lg:mx-4 font-medium w-[180px] h-[40px] bg-red-900 rounded-md text-xl hover:bg-red-800 my-2">
                    {t('Cancel')}
                </button>
                <button onClick={handleDelete}
                className="text-white mx-1 lg:mx-4 font-medium w-[180px] h-[40px] bg-red-900 rounded-md text-xl hover:bg-red-800 my-2">
                   {t('DeleteAccountText')}
                </button>
            </div>
        </div>
    )
}

export default PerfilConfiguration;