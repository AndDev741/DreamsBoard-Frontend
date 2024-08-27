import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import customAxios from '../../axiosConfig';
import EditPerfil from "./editPerfil";
import backIcon from "../../assets/BackIcon.png";
import perfilIcon from "../../assets/perfilIcon.png";
import deleteIcon from "../../assets/deleteIcon.png";
import logoutIcon from "../../assets/logoutIcon.png";
import { img_linkEnter, nameEnter, perfil_phraseEnter } from "../authentication/loginSlice";

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

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);

    
    const img_link = useSelector(state => state.login.img_link);
    const name = useSelector(state => state.login.name);
    const perfil_phrase = useSelector(state => state.login.perfil_phrase);

    const [newName, setNewName] = useState(name || "Put your name here!");
    const [newPerfilPhrase, setNewPerfilPhrase] = useState(perfil_phrase || "Put a nice phrase here!");
    const [newPerfilImg, setNewPerfilImg] = useState(img_link || null);
    const [perfilImg, setPerfilImg] = useState(img_link);

    const handleLogout = async (e) => {
        e.preventDefault();

        sessionStorage.clear();
        try{
            await customAxios.post("http://localhost:8080/logout");   
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
        console.log(updatedImgLink)

        try{
            if(newPerfilImg && newPerfilImg !== img_link){
                updatedImgLink = await uploadImageToCloudinary(newPerfilImg)
                setPerfilImg(updatedImgLink);
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
            setError("");
            setSuccess((await response).data.success);

        }catch(e){
            console.error("Erro", e);
            setSuccess("");
            setError("An error ocurred trying to edit, try again");
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
                <h1 className="text-[32px] font-medium m-4">Configuration</h1>
                <Link to={"/dashboard"}>
                    <img src={backIcon}
                    className="w-[40px] mr-6 cursor-pointer" />
                </Link>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-evenly items-center">
                <div className="flex flex-col items-center w-[90vw] lg:w-[45vw] min-h-[300px] border-2 border-greenMain rounded-md">
                    <div className="flex items-center mt-3">
                        <img className="w-[30px] h-[30px] mr-2"
                        src={perfilIcon} />
                        <h2 className="text-2xl">Edit your perfil</h2>
                    </div>
                    <EditPerfil newPerfilImg={newPerfilImg} newName={newName} newPerfilPhrase={newPerfilPhrase} setNewName={setNewName} setNewPerfilPhrase={setNewPerfilPhrase} setNewPerfilImg={setNewPerfilImg}/>

                    <button onClick={handleEdit}
                    className=" text-white font-medium w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed mb-3">Edit</button>
                </div>

                <div className="flex flex-col items-center justify-between w-[90vw] lg:w-[25vw] min-h-[300px] border-2 border-greenMain rounded-md mt-4">
                    <div className="flex items-center mt-3">
                        <img className="w-[30px] h-[30px] mr-2"
                        src={logoutIcon} />
                        <h2 className="text-center text-2xl">Make Logout</h2>
                    </div>                   
                    <div className="flex flex-col items-center">
                        <p className="text-center text-2xl mb-4">You can make login later!</p>
                        <button onClick={handleLogout}
                        className="text-white font-medium w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed mb-3">Logout</button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between w-[90vw] lg:w-[25vw] min-h-[300px] border-2 border-greenMain rounded-md mt-4">
                    <div className="flex items-center mt-3">
                        <img className="w-[30px] h-[30px] mr-2"
                        src={deleteIcon} />
                        <h2 className="text-center text-2xl">Delete account</h2>
                    </div>   
                    <div className="flex flex-col items-center">
                        <p className="text-center text-2xl mb-4">This action cannot be undone!</p>
                        <button onClick={handleConfirmDelete}
                        className="text-white font-medium w-[180px] h-[40px] bg-[#CD4D55] hover:bg-[#e26870] rounded-md text-xl hover:bg-lightRed mb-3">Delete</button>
                    </div>
                </div>
                <DeleteModal deleteModal={deleteModal} handleConfirmDelete={handleConfirmDelete}/>
            </div>

            
        </div>
    )
}

function DeleteModal({handleConfirmDelete, setError, id, deleteModal}){
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault();

        try{
            customAxios.delete(`/user/${id}`);
            navigate("/");
        }catch(e){
            console.error(e);
            handleConfirmDelete();
            setError("Error trying delete Account, try again")
        }
    }
    return(
        <div className={`${deleteModal === true ? 'block' : 'hidden'} flex flex-col items-center justify-start rounded-md w-[100vw] h-[100vh] bg-white pt-12 p-3 fixed left-0 top-0`}>
            <h2 className="mt-2 text-2xl font-bold text-center">Are you sure that you want to delete your account?</h2>
            <div className="flex items-center justify-center mt-5">
                <button onClick={handleConfirmDelete}
                className="text-white mx-4 font-medium w-[180px] h-[40px] bg-red-900 rounded-md text-xl hover:bg-red-800 my-2">
                    Cancel
                </button>
                <button onClick={handleDelete}
                className="text-white mx-4 font-medium w-[180px] h-[40px] bg-red-900 rounded-md text-xl hover:bg-red-800 my-2">
                    Delete account
                </button>
            </div>
        </div>
    )
}

export default PerfilConfiguration;