import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import customAxios from '../../../axiosConfig';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import MainSection from './mainSection';
import MainObjectiveSection from './mainObjectiveSection';
import ObjectiveSection from './objective';
import Reasons from './reasons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function EditBoard() {
    const navigate = useNavigate();
    const userId = useSelector(state => state.login.id);
    async function verifyLogin() {
        try {
            const response = await customAxios.get(`/user/verify/${userId}`);
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
    const dreamBoardId = useSelector(state => state.editBoard.dreamBoardId);

    const editBackground_img = useSelector(state => state.editBoard.background_img);
    const editBackground_img_id = useSelector(state => state.editBoard.background_img_id);
    const [background_img, setBackground_img] = useState(editBackground_img || null);

    const editTitle = useSelector(state => state.editBoard.title);
    const [title, setTitle] = useState(editTitle);

    const editMainObjective_img = useSelector(state => state.editBoard.mainObjective_img);
    const editMainObjective_img_id = useSelector(state => state.editBoard.mainObjective_img_id);
    const [mainObjective_img, setMainObjective_img] = useState(editMainObjective_img);

    const editMainObjective_text = useSelector(state => state.editBoard.mainObjective_text);
    const [mainObjective_text, setMainObjective_text] = useState(editMainObjective_text);

    const editObjective_img = useSelector(state => state.editBoard.objective_img);
    const editObjective_img_id = useSelector(state => state.editBoard.objective_img_id);
    const [objective_img, setObjective_img] = useState(editObjective_img);

    const editObjective_text = useSelector(state => state.editBoard.objective_text);
    const [objective_text, setObjective_text] = useState(editObjective_text);

    const editReasonTitle = useSelector(state => state.editBoard.reasonTitle);
    const [reasonTitle, setReasonTitle] = useState(editReasonTitle);

    const editReasons = useSelector(state => state.editBoard.reasons);

    const [reason1, setReason1] = useState(editReasons[0].title);
    const [reasonImg1, setReasonImg1] = useState(editReasons[0].img);
    const reasonImg1_id = editReasons[0].img_id;
    const [reasonText1, setReasonText1] = useState(editReasons[0].text);

    const [reason2, setReason2] = useState(editReasons[1].title);
    const [reasonImg2, setReasonImg2] = useState(editReasons[1].img);
    const reasonImg2_id = editReasons[1].img_id;
    const [reasonText2, setReasonText2] = useState(editReasons[1].text);

    const [reason3, setReason3] = useState(editReasons[2].title);
    const [reasonImg3, setReasonImg3] = useState(editReasons[2].img);
    const reasonImg3_id = editReasons[2].img_id;
    const [reasonText3, setReasonText3] = useState(editReasons[2].text);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const handleConfirmDelete = () => {
        if(deleteModal === true){
            setDeleteModal(false);
            document.body.style.overflow = 'auto';
        }else if(deleteModal === false){
            setDeleteModal(true);
            document.body.style.overflow = 'hidden'
        }
        
    }

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'cf6ccdpv');
        const response = await axios.post('https://api.cloudinary.com/v1_1/drplvqymz/image/upload', formData);
        return response.data;
    }

    const deleteImageFromCloudinary = async (publicId) => {
        const timestamp = Math.floor(Date.now() / 1000);
        const apiKey = "886949552998293"
        const apiSecret = "wES5lpt-WcVQCo6N7jizWDXGq7E"

        const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

        const signature = CryptoJS.SHA1(signatureString).toString();

        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);

    
        const response = await axios.post("https://api.cloudinary.com/v1_1/drplvqymz/image/destroy", formData);
        return response.data;
    }
    
    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = {
            userId: userId,
            title: title,
            mainObjective_text: mainObjective_text,
            objective_text: objective_text,
            reason_title: reasonTitle,
            background_img: null,
            background_img_id: null,
            mainObjective_img: null,
            mainObjective_img_id: null,
            objective_img: null,
            objective_img_id: null,
            reasons: []
        }
        const reasons = [];

        try {
            setError("");
            setLoading(true);
            if(background_img && background_img !== editBackground_img) {
                deleteImageFromCloudinary(editBackground_img_id);
                const backgroundImgResponse = await uploadImageToCloudinary(background_img);
                formData.background_img = backgroundImgResponse.secure_url;
                formData.background_img_id = backgroundImgResponse.public_id;
            }else{
                formData.background_img = background_img;
                formData.background_img_id = editBackground_img_id;
            }
            
            if(mainObjective_img && mainObjective_img !== editMainObjective_img){
                deleteImageFromCloudinary(editMainObjective_img_id);
                const mainObjectiveImgResponse = await uploadImageToCloudinary(mainObjective_img);
                formData.mainObjective_img = mainObjectiveImgResponse.secure_url;
                formData.mainObjective_img_id = mainObjectiveImgResponse.public_id;
            }else{
                formData.mainObjective_img = mainObjective_img;
                formData.mainObjective_img_id = editMainObjective_img_id;
            }

            if(objective_img && objective_img !== editObjective_img){
                deleteImageFromCloudinary(editObjective_img_id);
                const objectiveImgResponse = await uploadImageToCloudinary(objective_img);
                formData.objective_img = objectiveImgResponse.secure_url;
                formData.objective_img_id = objectiveImgResponse.public_id;
            }else{
                formData.objective_img = objective_img;
                formData.objective_img_id = editObjective_img_id;
            }

            if(reasonImg1 && reasonImg1 !== editReasons[0].img){
                deleteImageFromCloudinary(reasonImg1_id);
                const reasonImg1Response = await uploadImageToCloudinary(reasonImg1);
                reasons.push({title: reason1, img: reasonImg1Response.secure_url, img_id: reasonImg1Response.public_id,text: reasonText1});
            }else{
                reasons.push({title: reason1, img: reasonImg1, img_id: reasonImg1_id,text: reasonText1})
            }

            if(reasonImg2 && reasonImg2 !== editReasons[1].img){
                deleteImageFromCloudinary(reasonImg2_id);
                const reasonImg2Response = await uploadImageToCloudinary(reasonImg2);
                reasons.push({title: reason2, img: reasonImg2Response.secure_url, img_id: reasonImg2Response.public_id,text: reasonText2});
            }else{
                reasons.push({title: reason2, img:reasonImg2, img_id: reasonImg2_id,text: reasonText2});
            }

            if(reasonImg3 && reasonImg3 !== editReasons[2].img){
                deleteImageFromCloudinary(reasonImg3_id);
                const reasonImg3Response = await uploadImageToCloudinary(reasonImg3);
                reasons.push({title: reason3, img: reasonImg3Response.secure_url, img_id: reasonImg3Response.public_id,text: reasonText3});
            }else{
                reasons.push({title: reason3, img: reasonImg3, img_id: reasonImg3_id,text: reasonText3});
            }

            formData.reasons = reasons;

        }catch(err){
            setLoading(false)
            console.error(err)
        }
        
        try{
            const response = await customAxios.put(`http://localhost:8080/dreamboard/${dreamBoardId}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }})
            if(response.status === 200){
                navigate("/dashboard");
            }
        }catch(e){
            setLoading(false)
            console.error("Erro ao editar dreamboard", e);
            setError("Error trying do edit DreamBoard, try again!");
        }
        
    };

    const handleDelete = async () => {
        document.body.style.overflow = 'auto';
        try{
            deleteImageFromCloudinary(editBackground_img_id);
            deleteImageFromCloudinary(editMainObjective_img_id);
            deleteImageFromCloudinary(editObjective_img_id);
            deleteImageFromCloudinary(reasonImg1_id);
            deleteImageFromCloudinary(reasonImg2_id);
            deleteImageFromCloudinary(reasonImg3_id);
            await customAxios.delete(`http://localhost:8080/dreamboard/${dreamBoardId}`);
            navigate("/dashboard");
        }catch(e){
            console.error("Error trying delete Dreamboard", e);
            setError(e.response.data.error);
        }
    }

    

    return (
        <div className="lg:flex items-center justify-center">
            <div className="pb-6 lg:w-[50vw]">
                
                <MainSection background_img={background_img} setBackground_img={setBackground_img}/>

                <div className="flex flex-col items-center justify-center my-4">
    
                    <input type={'text'}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className={`bg-transparent text-3xl text-center text-redFont font-black underline flex-wrap w-[100%] ${title.length < 1 ? "border-b-2 border-solid border-black" : ""}`} />

                    <MainObjectiveSection mainObjective_img={mainObjective_img} setMainObjective_img={setMainObjective_img}  mainObjective_text={mainObjective_text} setMainObjective_text={setMainObjective_text}/>

                    <ObjectiveSection objective_img={objective_img} setObjective_img={setObjective_img} objective_text={objective_text} setObjective_text={setObjective_text}/>

                    <Reasons reasonTitle={reasonTitle} setReasonTitle={setReasonTitle}reason1={reason1}  setReason1={setReason1} reasonImg1={reasonImg1} setReasonImg1={setReasonImg1} reasonText1={reasonText1} setReasonText1={setReasonText1} reason2={reason2} setReason2={setReason2} reasonImg2={reasonImg2} setReasonImg2={setReasonImg2} reasonText2={reasonText2} setReasonText2={setReasonText2} reason3={reason3} setReason3={setReason3} reasonImg3={reasonImg3} setReasonImg3={setReasonImg3} reasonText3={reasonText3} setReasonText3={setReasonText3}/>

                    <div className="flex flex-wrap items-center justify-evenly w-full mt-5">
                        <Link to={'/dashboard'}>
                            <button className="text-white font-bold w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed">
                                Cancel
                            </button>
                        </Link>
                        <button
                            className={`text-white font-bold w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed`}
                            onClick={handleUpload}
                        >
                            {'Edit'}
                        </button>
                        <button
                            className={`flex items-center justify-evenly text-white font-bold w-[180px] h-[40px] bg-[#CD4D55] hover:bg-[#e26870] rounded-md text-xl hover:bg-lightRed my-4 `}
                            onClick={handleConfirmDelete}
                        >
                            {'Delete'}
                        </button>
                    </div>
                    {loading ? <h1 className="text-3xl text-redFont font-black text-center animate-pulse mt-3">Sending data...</h1> : null}
                    <p className='text-2xl text-center text-red-900 font-semibold my-4'>{error}</p>
                    <DeleteModal setError={setError} deleteModal={deleteModal} handleConfirmDelete={handleConfirmDelete} handleDelete={handleDelete}/>
                </div>
            </div>
        </div>
    );
}

function DeleteModal({handleConfirmDelete, deleteModal, handleDelete}){
    return(
        <div className={`${deleteModal === true ? 'block' : 'hidden'} flex flex-col items-center justify-start rounded-md w-[100vw] h-[100vh] bg-white pt-12 fixed left-0 top-0`}>
            <h2 className="mt-2 text-2xl font-bold text-center">Are you sure that you want to delete this dreamboard?</h2>
            <div className="flex flex-wrap items-center justify-center mt-5">
                <button onClick={handleConfirmDelete}
                className="text-white mx-1 sm:mx-4 font-medium w-[170px] h-[40px] bg-red-900 rounded-md text-xl hover:bg-red-800 my-2">
                    Cancel
                </button>
                <button onClick={handleDelete}
                className="text-white mx-1 sm:mx-4 font-medium w-[180px] h-[40px] bg-red-900 rounded-md text-xl hover:bg-red-800 my-2">
                    Delete DreamBoard
                </button>
            </div>
        </div>
    )
}

export default EditBoard;
