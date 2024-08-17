import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import customAxios from '../../axiosConfig';
import EditPerfil from "./editPerfil";
import { img_linkEnter, nameEnter, perfil_phraseEnter } from "../authentication/loginSlice";

function PerfilConfiguration(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);

    const id = useSelector(state => state.login.id);
    const img_link = useSelector(state => state.login.img_link);
    const name = useSelector(state => state.login.name);
    const perfil_phrase = useSelector(state => state.login.perfil_phrase);

    const [newName, setNewName] = useState(name || "Put your name here!");
    const [newPerfilPhrase, setNewPerfilPhrase] = useState(perfil_phrase || "Put a nice phrase here!");
    const [newPerfilImg, setNewPerfilImg] = useState(img_link || null);
    const [perfilImg, setPerfilImg] = useState("");

    const handleLogout = async (e) => {
        e.preventDefault();

        sessionStorage.clear();
        try{
            await axios.post("http://localhost:8080/logout");   
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
        return response.data;
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        const editData = {
            id: id,
            name: newName,
            perfil_phrase: newPerfilPhrase
        }
        try{
            if(newPerfilImg){
                const response = await uploadImageToCloudinary(newPerfilImg);
                setPerfilImg((await response).secure_url);
                editData.img_link = perfilImg;
            }
        }catch(e){
            console.error("Error trying upload perfil photo", e);
            setError("An error ocurred trying to edit, try again");
        }

        try{
            const response = customAxios.put("/user/edit", editData);
            dispatch(img_linkEnter(perfilImg));
            dispatch(nameEnter(newName));
            dispatch(perfil_phraseEnter(newPerfilPhrase));
            setSuccess((await response).data.success);
        }catch(e){
            console.error("Erro", e);
            setError("An error ocurred trying to edit, try again");
        }

    }

    const handleConfirmDelete = () => {
        setDeleteModal(!deleteModal);
    }
   

    return(
        <div className="bg-[#EEFCC7] w-[100%] min-h-[100vh] pb-8">
            <EditPerfil id={id} newPerfilImg={newPerfilImg} setNewPerfilImg={setNewPerfilImg} newName={newName} setNewName={setNewName} newPerfilPhrase={newPerfilPhrase} setNewPerfilPhrase={setNewPerfilPhrase}/>
            <div className="flex flex-wrap items-center justify-evenly mt-5">
                <button onClick={handleEdit}
                className="text-white font-medium w-[180px] h-[40px] bg-redFont rounded-md text-xl hover:bg-lightRed my-2">
                    Edit
                </button>
                <Link to={"/dashboard"}>
                    <button className="text-white font-medium w-[180px] h-[40px] bg-redFont rounded-md text-xl hover:bg-lightRed my-2">
                        Go back
                    </button>
                </Link>
                <button onClick={handleLogout}
                className="text-white font-medium w-[180px] h-[40px] bg-redFont rounded-md text-xl hover:bg-lightRed my-2">
                    Logout
                </button>
            </div>
            <div className="flex items-center justify-center">
            <button onClick={handleConfirmDelete}
                className="text-white font-medium w-[180px] h-[40px] bg-red-900 rounded-md text-xl hover:bg-red-800 my-2">
                    Delete account
                </button>
            </div>
            <div className="flex items-center justify-center">
                <DeleteModal handleConfirmDelete={handleConfirmDelete} setError={setError} id={id} deleteModal={deleteModal}/>
            </div>
            <p className='text-xl text-center text-red-900 font-semibold underline'>{error}</p>
            <p className='text-xl text-center text-blue-900 font-semibold underline'>{success}</p>
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
        <div className={`${deleteModal === true ? 'block' : 'hidden'} flex flex-col items-center justify-start rounded-md w-[100vw] h-[400px] bg-bgSecondary fixed top-0`}>
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