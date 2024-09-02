import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import customAxios from '../../../axiosConfig';
import axios from 'axios';
import {userIdEnter, background_imgEnter, titleEnter, mainObjective_imgEnter, mainObjective_textEnter, objective_imgEnter, objective_textEnter, reasonTitleEnter, reasonsEnter} from './editBoard';
import MainSection from './mainSection';
import MainObjectiveSection from './mainObjectiveSection';
import ObjectiveSection from './objective';
import Reasons from './reasons';
import { useDispatch, useSelector } from 'react-redux';
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
    const [background_img, setBackground_img] = useState(editBackground_img || null);

    const editTitle = useSelector(state => state.editBoard.title);
    const [title, setTitle] = useState(editTitle);

    const editMainObjective_img = useSelector(state => state.editBoard.mainObjective_img);
    const [mainObjective_img, setMainObjective_img] = useState(editMainObjective_img);

    const editMainObjective_text = useSelector(state => state.editBoard.mainObjective_text);
    const [mainObjective_text, setMainObjective_text] = useState(editMainObjective_text);

    const editObjective_img = useSelector(state => state.editBoard.objective_img);
    const [objective_img, setObjective_img] = useState(editObjective_img);

    const editObjective_text = useSelector(state => state.editBoard.objective_text);
    const [objective_text, setObjective_text] = useState(editObjective_text);

    const editReasonTitle = useSelector(state => state.editBoard.reasonTitle);
    const [reasonTitle, setReasonTitle] = useState(editReasonTitle);

    const editReasons = useSelector(state => state.editBoard.reasons);

    const [reason1, setReason1] = useState(editReasons[0].title);
    const [reasonImg1, setReasonImg1] = useState(editReasons[0].img);
    const [reasonText1, setReasonText1] = useState(editReasons[0].text);

    const [reason2, setReason2] = useState(editReasons[1].title);
    const [reasonImg2, setReasonImg2] = useState(editReasons[1].img);
    const [reasonText2, setReasonText2] = useState(editReasons[1].text);

    const [reason3, setReason3] = useState(editReasons[2].title);
    const [reasonImg3, setReasonImg3] = useState(editReasons[2].img);
    const [reasonText3, setReasonText3] = useState(editReasons[2].text);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'cf6ccdpv');
        const response = await axios.post('https://api.cloudinary.com/v1_1/drplvqymz/image/upload', formData);
        return response.data.secure_url;
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
            mainObjective_img: null,
            objective_img: null,
            reasons: []
        }
        const reasons = [];

        try {
            setError("");
            setLoading(true);
            if(background_img && background_img !== background_img) {
                const backgroundImgResponse = await uploadImageToCloudinary(background_img);
                formData.background_img = backgroundImgResponse;
            }else{
                formData.background_img = background_img;
            }
            
            if(mainObjective_img && mainObjective_img !== editMainObjective_img){
                const mainObjectiveImgResponse = await uploadImageToCloudinary(mainObjective_img);
                formData.mainObjective_img = mainObjectiveImgResponse;
            }else{
                formData.mainObjective_img = mainObjective_img;
            }

            if(objective_img && objective_img !== editObjective_img){
                const objectiveImgResponse = await uploadImageToCloudinary(objective_img);
                formData.objective_img = objectiveImgResponse;
            }else{
                formData.objective_img = objective_img;
            }

            if(reasonImg1 && reasonImg1 !== editReasons[0].img){
                const reasonImg1Response = await uploadImageToCloudinary(reasonImg1);
                reasons.push({title: reason1, img: reasonImg1Response, text: reasonText1})
            }else{
                reasons.push({title: reason1, img: reasonImg1, text: reasonText1})
            }

            if(reasonImg2 && reasonImg2 !== editReasons[1].img){
                const reasonImg2Response = await uploadImageToCloudinary(reasonImg2);
                reasons.push({title: reason2, img:reasonImg2Response, text: reasonText2});
            }else{
                reasons.push({title: reason2, img:reasonImg2, text: reasonText2});
            }

            if(reasonImg3 && reasonImg3 !== editReasons[2].img){
                const reasonImg3Response = await uploadImageToCloudinary(reasonImg3);
                reasons.push({title: reason3, img: reasonImg3Response, text: reasonText3});
            }else{
                reasons.push({title: reason3, img: reasonImg3, text: reasonText3});
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
        try{
            await customAxios.delete(`http://localhost:8080/dreamboard/${dreamBoardId}`);
            navigate("/dashboard");
        }catch(e){
            console.error("Error trying delete Dreamboard", e);
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
                            onClick={handleDelete}
                        >
                            {'Delete'}
                        </button>
                    </div>
                    {loading ? <h1 className="text-3xl text-redFont font-black text-center animate-pulse mt-3">Sending data...</h1> : null}
                    <p className='text-2xl text-center text-red-900 font-semibold my-4'>{error}</p>
                </div>
            </div>
        </div>
    );
}

export default EditBoard;
