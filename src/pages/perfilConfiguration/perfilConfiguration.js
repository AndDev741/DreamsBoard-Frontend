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
            <p className='text-xl text-center text-red-900 font-semibold underline'>{error}</p>
            <p className='text-xl text-center text-blue-900 font-semibold underline'>{success}</p>
        </div>
    )
}

export default PerfilConfiguration;