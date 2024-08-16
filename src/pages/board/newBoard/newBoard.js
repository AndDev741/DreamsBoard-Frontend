import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import customAxios from '../../../axiosConfig';
import axios from 'axios';
import { editModeEnter, userIdEnter, background_imgEnter, titleEnter, mainObjective_imgEnter, mainObjective_textEnter, objective_imgEnter, objective_textEnter, reasonTitleEnter, reasonsEnter, dreamBoardIdEnter } from './newBoardSlice';
import MainSection from './mainSection';
import MainObjectiveSection from './mainObjectiveSection';
import ObjectiveSection from './objective';
import Reasons from './reasons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import trashIcon from '../../../assets/trashIcon.png';

function NewBoard() {
    const edit = useSelector(state => state.newBoard.editMode);
    const [editMode, setEditMode] = useState(edit);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const dreamBoardId = useSelector(state => state.newBoard.dreamBoardId);
    const userId = useSelector(state => state.login.id);
    const editBackground_img = useSelector(state => state.newBoard.background_img);
    const [background_img, setBackground_img] = useState(editBackground_img || null);
    const editTitle = useSelector(state => state.newBoard.title);
    const [title, setTitle] = useState(editTitle || 'The title of your dream');
    const editMainObjective_img = useSelector(state => state.newBoard.mainObjective_img);
    const [mainObjective_img, setMainObjective_img] = useState(editMainObjective_img || null);
    const editMainObjective_text = useSelector(state => state.newBoard.mainObjective_text);
    const [mainObjective_text, setMainObjective_text] = useState(editMainObjective_text || 'Your main objective');
    const editObjective_img = useSelector(state => state.newBoard.objective_img);
    const [objective_img, setObjective_img] = useState(editObjective_img || null);
    const editObjective_text = useSelector(state => state.newBoard.objective_text);
    const [objective_text, setObjective_text] = useState(editObjective_text || 'Put here a short text of what you gonna do to conquist your objective');

    const editReasonTitle = useSelector(state => state.newBoard.reasonTitle);
    const [reasonTitle, setReasonTitle] = useState(editReasonTitle || '[Edit here] Click in the reasons to edit');

    const editReasons = useSelector(state => state.newBoard.reasons);
    const [reason1, setReason1] = useState(editReasons.length > 0 ? editReasons[0].title : 'edit here');
    const [reasonImg1, setReasonImg1] = useState(editReasons.length > 0 ? editReasons[0].img : null);
    const [reasonText1, setReasonText1] = useState(editReasons.length > 0 ? editReasons[0].text : 'Edit here with the text of your reason');

    const [reason2, setReason2] = useState(editReasons.length > 0 ? editReasons[1].title : 'edit here');
    const [reasonImg2, setReasonImg2] = useState(editReasons.length > 0 ? editReasons[1].img : null);
    const [reasonText2, setReasonText2] = useState(editReasons.length > 0 ? editReasons[1].text : 'Edit here with the text of your reason');

    const [reason3, setReason3] = useState(editReasons.length > 0 ? editReasons[2].title : 'edit here');
    const [reasonImg3, setReasonImg3] = useState(editReasons.length > 0 ? editReasons[2].img : null);
    const [reasonText3, setReasonText3] = useState(editReasons.length > 0 ? editReasons[2].text : 'Edit here with the text of your reason');
    
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'cf6ccdpv');
        const response = await axios.post('https://api.cloudinary.com/v1_1/drplvqymz/image/upload', formData);
        return response.data;
    }
    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const reasonsData = new FormData();
        const reasons = [];
        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('mainObjective_text', mainObjective_text);
        formData.append('objective_text', objective_text);
        formData.append('reason_title', reasonTitle);

        //Upar imagens na nuvem
        try {
            setLoading(true)
            if(background_img) {
                const backgroundImgResponse = await uploadImageToCloudinary(background_img);
                formData.append('background_img', backgroundImgResponse.secure_url);
            }
            if(mainObjective_img){
                const mainObjectiveImgResponse = await uploadImageToCloudinary(mainObjective_img);
                formData.append('mainObjective_img', mainObjectiveImgResponse.secure_url);
            }
            if(objective_img){
                const objectiveImgResponse = await uploadImageToCloudinary(objective_img);
                formData.append('objective_img', objectiveImgResponse.secure_url);
            }
            if(reasonImg1){
                const reasonImg1Response = await uploadImageToCloudinary(reasonImg1);
                reasons.push({title: reason1, img: reasonImg1Response.secure_url, text: reasonText1})
            }
            if(reasonImg2){
                const reasonImg2Response = await uploadImageToCloudinary(reasonImg2);
                reasons.push({title: reason2, img:reasonImg2Response.secure_url, text: reasonText2});
            }
            if(reasonImg3){
                const reasonImg3Response = await uploadImageToCloudinary(reasonImg3);
                reasons.push({title: reason3, img: reasonImg3Response.secure_url, text: reasonText3});
            }
        }catch(err){
            console.error(err)
        }
        
        try {
            if(editMode === true){
                reasons.forEach((reason, index) => {
                    formData.append(`${index}[title]`, reason.title);
                    formData.append(`${index}[img]`, reason.img);
                    formData.append(`${index}[text]`, reason.text);
                });

                try{
                    const response = customAxios.put(`http://localhost:8080/dreamboard/${dreamBoardId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }})
                    console.log((await response).status);
                    if((await response).status === 200){
                        navigate("/dashboard");
                    }
                }catch(e){
                    console.error("Erro ao editar dreamboard", e);
                    setLoading(false)
                    setError("Error trying do edit DreamBoard, try again!");
                }
                

            }else {

                const response = customAxios.post('http://localhost:8080/dreamboard', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                const dreamboardId = (await response).data;
                try{
                    if(dreamboardId != null){
                        reasonsData.append("dreamboardId", dreamboardId)

                        reasons.forEach((reason, index) => {
                            reasonsData.append(`${index}[title]`, reason.title);
                            reasonsData.append(`${index}[img]`, reason.img);
                            reasonsData.append(`${index}[text]`, reason.text);
                        });

                        const response = customAxios.post(`http://localhost:8080/dreamboard/reasons`, reasonsData, { 
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }})

                        if((await response).data.status === "success"){
                            navigate("/dashboard");
                        }
                    }
                }catch(err){
                    console.error(err.data.status);
                    setLoading(false)
                    if(err.status === "errorMissing"){
                        setError("Please, include all the images and text necessaries");
                    }else{
                        setError("An error ocurred trying to save the dreamBoard");
                    }
                    
                }
            }

        } catch(err){
            setLoading(false)
            console.error(err);
            if(err.response.data.status === "errorMissing"){
                setError("Please, include all the images and text necessaries");
            }else{
                setError("An error ocurred trying to save the dreamBoard");
            }
        }
        
    };

    const handleDelete = () => {
        try{
            const response = customAxios.delete(`http://localhost:8080/dreamboard/${dreamBoardId}`);
            navigate("/dashboard");
        }catch(e){
            console.error("Error trying delete Dreamboard", e);
        }
    }

    useEffect(() => {
        dispatch(editModeEnter(false));
        dispatch(userIdEnter(null));
        dispatch(background_imgEnter(null));
        dispatch(titleEnter(''));
        dispatch(mainObjective_imgEnter(null));
        dispatch(mainObjective_textEnter(''));
        dispatch(objective_imgEnter(null));
        dispatch(objective_textEnter(''));
        dispatch(reasonTitleEnter(''));
        dispatch(reasonsEnter([]));
    }, [])

    return (


        <div className="lg:flex items-center justify-center bg-bgColor">
            <div className="pb-6 lg:w-[50vw]">
                
                <MainSection background_img={background_img} setBackground_img={setBackground_img}/>

                <div className="flex flex-col items-center justify-center my-4">
                    <input type={'text'}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className={`bg-transparent text-2xl lg:text-3xl text-center text-redFont font-black underline flex-wrap w-[100%] ${title.length < 1 ? "border-b-2 border-solid border-redFont" : ""}`} />
                    
                    <MainObjectiveSection mainObjective_img={mainObjective_img} setMainObjective_img={setMainObjective_img}  mainObjective_text={mainObjective_text} setMainObjective_text={setMainObjective_text}/>

                    <ObjectiveSection objective_img={objective_img} setObjective_img={setObjective_img} objective_text={objective_text} setObjective_text={setObjective_text}/>
                    
                    <Reasons reasonTitle={reasonTitle} setReasonTitle={setReasonTitle}reason1={reason1}  setReason1={setReason1} reasonImg1={reasonImg1} setReasonImg1={setReasonImg1} reasonText1={reasonText1} setReasonText1={setReasonText1} reason2={reason2} setReason2={setReason2} reasonImg2={reasonImg2} setReasonImg2={setReasonImg2} reasonText2={reasonText2} setReasonText2={setReasonText2} reason3={reason3} setReason3={setReason3} reasonImg3={reasonImg3} setReasonImg3={setReasonImg3} reasonText3={reasonText3} setReasonText3={setReasonText3}/>

                    <div className="flex flex-wrap items-center justify-evenly w-full mt-5">
                        <Link to={'/dashboard'}>
                            <button className="text-white font-medium w-[180px] h-[40px] bg-redFont rounded-md text-xl hover:bg-lightRed">
                                Cancel
                            </button>
                        </Link>
                        <button
                            className="text-white font-medium w-[180px] h-[40px] bg-redFont rounded-md text-xl hover:bg-lightRed"
                            onClick={handleUpload}
                        >
                            {editMode === true ? 'Edit' : 'Save'}
                        </button>
                        <button
                            className={`flex items-center justify-evenly text-white font-medium w-[180px] h-[40px] bg-redFont rounded-md text-xl hover:bg-lightRed my-4 ${editMode === true ? 'block' : 'hidden'}`}
                            onClick={handleDelete}
                        >
                            {editMode === true ? 'Delete' : ''}
                        </button>
                    </div>
                    {loading ? <h1 className="text-3xl text-redFont font-black text-center animate-pulse mt-3">Sending data...</h1> : null}
                    <p className='text-xl text-center text-red-900 font-semibold my-4'>{error}</p>
                </div>
            </div>
        </div>
    );
}

export default NewBoard;
