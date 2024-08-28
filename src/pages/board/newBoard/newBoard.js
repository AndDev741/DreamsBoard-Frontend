import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import customAxios from '../../../axiosConfig';
import axios from 'axios';
import { editModeEnter, userIdEnter, background_imgEnter, titleEnter, mainObjective_imgEnter, mainObjective_textEnter, objective_imgEnter, objective_textEnter, reasonTitleEnter, reasonsEnter} from './newBoardSlice';
import MainSection from './mainSection';
import MainObjectiveSection from './mainObjectiveSection';
import ObjectiveSection from './objective';
import Reasons from './reasons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function NewBoard() {
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

    const edit = useSelector(state => state.newBoard.editMode);
    const [editMode, setEditMode] = useState(edit);
    const dispatch = useDispatch();
    
    
    const dreamBoardId = useSelector(state => state.newBoard.dreamBoardId);
    const editBackground_img = useSelector(state => state.newBoard.background_img);
    const [background_img, setBackground_img] = useState(editBackground_img || null);
    const editTitle = useSelector(state => state.newBoard.title);
    const [title, setTitle] = useState(editTitle || 'Write here the title');
    const editMainObjective_img = useSelector(state => state.newBoard.mainObjective_img);
    const [mainObjective_img, setMainObjective_img] = useState(editMainObjective_img || null);
    const editMainObjective_text = useSelector(state => state.newBoard.mainObjective_text);
    const [mainObjective_text, setMainObjective_text] = useState(editMainObjective_text || 'Write here your main goal!');
    const editObjective_img = useSelector(state => state.newBoard.objective_img);
    const [objective_img, setObjective_img] = useState(editObjective_img || null);
    const editObjective_text = useSelector(state => state.newBoard.objective_text);
    const [objective_text, setObjective_text] = useState(editObjective_text || 'Put here a short text of what you gonna do to conquist your goal');

    const editReasonTitle = useSelector(state => state.newBoard.reasonTitle);
    const [reasonTitle, setReasonTitle] = useState(editReasonTitle || 'Write here 3 big reasons or goals');

    const editReasons = useSelector(state => state.newBoard.reasons);
    const [reason1, setReason1] = useState(editReasons.length > 0 ? editReasons[0].title : 'put a title');
    const [reasonImg1, setReasonImg1] = useState(editReasons.length > 0 ? editReasons[0].img : null);
    const [reasonText1, setReasonText1] = useState(editReasons.length > 0 ? editReasons[0].text : 'Edit here with the text of your reason or goal');

    const [reason2, setReason2] = useState(editReasons.length > 0 ? editReasons[1].title : 'put a title');
    const [reasonImg2, setReasonImg2] = useState(editReasons.length > 0 ? editReasons[1].img : null);
    const [reasonText2, setReasonText2] = useState(editReasons.length > 0 ? editReasons[1].text : 'Edit here with the text of your reason or goal');

    const [reason3, setReason3] = useState(editReasons.length > 0 ? editReasons[2].title : 'put a title');
    const [reasonImg3, setReasonImg3] = useState(editReasons.length > 0 ? editReasons[2].img : null);
    const [reasonText3, setReasonText3] = useState(editReasons.length > 0 ? editReasons[2].text : 'Edit here with the text of your reason or goal');

    
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

        //Upar imagens na nuvem
        try {
            setLoading(true)
            if(background_img) {
                const backgroundImgResponse = await uploadImageToCloudinary(background_img);
                formData.background_img = backgroundImgResponse;
            }
            if(mainObjective_img){
                const mainObjectiveImgResponse = await uploadImageToCloudinary(mainObjective_img);
                formData.mainObjective_img = mainObjectiveImgResponse;
            }
            if(objective_img){
                const objectiveImgResponse = await uploadImageToCloudinary(objective_img);
                formData.objective_img = objectiveImgResponse;
            }
            if(reasonImg1){
                const reasonImg1Response = await uploadImageToCloudinary(reasonImg1);
                reasons.push({title: reason1, img: reasonImg1Response, text: reasonText1})
            }
            if(reasonImg2){
                const reasonImg2Response = await uploadImageToCloudinary(reasonImg2);
                reasons.push({title: reason2, img:reasonImg2Response, text: reasonText2});
            }
            if(reasonImg3){
                const reasonImg3Response = await uploadImageToCloudinary(reasonImg3);
                reasons.push({title: reason3, img: reasonImg3Response, text: reasonText3});
            }

            formData.reasons = reasons;

        }catch(err){
            console.error(err)
        }
        
        try {

            if(editMode === true){
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

            }else {
                try{
                    const response = await customAxios.post('http://localhost:8080/dreamboard', formData, {
                        headers: {
                            'Content-Type': 'application/json'
                    }})
                    if(response.status === 200){
                        navigate("/dashboard");
                    }
                }catch(e){
                    setLoading(false)
                    console.error(e);
                    if(e.response.data.error === "errorDreamboard"){
                        setError("Please, include all the images and phrases")
                    }else if(e.response.data.error){
                        setError(e.response.data.error);
                    }else{
                        setError("An unknown error ocurred");
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

    const handleDelete = async () => {
        try{
            await customAxios.delete(`http://localhost:8080/dreamboard/${dreamBoardId}`);
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


        <div className="lg:flex items-center justify-center">
            <div className="pb-6 lg:w-[50vw]">
                
                <MainSection background_img={background_img} setBackground_img={setBackground_img}/>
                <h3 className={`${background_img ? "hidden" : 'block'} text-3xl font-bold text-center mt-2 animate-pulse mb-[250px]`}>
                    Lets start chosing a image that reminds you of your dream
                </h3>

                <div className="flex flex-col items-center justify-center my-4">
                    
                    <div className={`${background_img ? 'block' : 'hidden'}`}>

                    <input type={'text'}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className={`bg-transparent text-3xl text-center text-redFont font-black underline flex-wrap w-[100%] ${title.length < 1 ? "border-b-2 border-solid border-black" : ""}`} />

                    <h3 className={`${title === "Write here the title" ? "block" : 'hidden'} text-3xl font-bold text-center mt-4 animate-pulse mb-[250px]`}>
                        Now, the title of your Dream
                    </h3>

                    <div className={`${title === "Write here the title" ? 'hidden' : 'block'}`}>

                        <MainObjectiveSection mainObjective_img={mainObjective_img} setMainObjective_img={setMainObjective_img}  mainObjective_text={mainObjective_text} setMainObjective_text={setMainObjective_text}/>

                        <h3 className={`${mainObjective_img && mainObjective_text !== "Write here your main goal!" ? 'hidden' : 'block'} text-3xl font-bold text-center mt-4 animate-pulse mb-[250px]`}>
                            Your main goal: Choose an image that reminds you your biggest goal, and a title too!
                        </h3>

                        <div className={`${mainObjective_img && mainObjective_text === "Write here your main goal!" ? 'hidden' : 'block'} `}>
                            <ObjectiveSection objective_img={objective_img} setObjective_img={setObjective_img} objective_text={objective_text} setObjective_text={setObjective_text}/>

                            <h3 className={`${objective_img && objective_text !== "Put here a short text of what you gonna do to conquist your goal" ? "hidden" : 'block'} text-3xl font-bold text-center mt-4 animate-pulse mb-[250px]`}>
                                What you gonna do to make this dream real?
                            </h3>

                            <div className={`${objective_img && objective_text === "Put here a short text of what you gonna do to conquist your goal" ? "hidden" : 'block'}`}>
                                <Reasons reasonTitle={reasonTitle} setReasonTitle={setReasonTitle}reason1={reason1}  setReason1={setReason1} reasonImg1={reasonImg1} setReasonImg1={setReasonImg1} reasonText1={reasonText1} setReasonText1={setReasonText1} reason2={reason2} setReason2={setReason2} reasonImg2={reasonImg2} setReasonImg2={setReasonImg2} reasonText2={reasonText2} setReasonText2={setReasonText2} reason3={reason3} setReason3={setReason3} reasonImg3={reasonImg3} setReasonImg3={setReasonImg3} reasonText3={reasonText3} setReasonText3={setReasonText3}/>
                                <h3 className={`${reasonImg3 ? "hidden" : 'block'} text-3xl font-bold text-center mt-4 animate-pulse mb-[250px]`}>
                                In this part, you can choose to put 3 big reasons to fight for your dream, or 3 big goals you want to conquist
                            </h3>
                            </div>
                        </div>
                    </div>

                    </div>

                    <div className="flex flex-wrap items-center justify-evenly w-full mt-5">
                        <Link to={'/dashboard'}>
                            <button className="text-white font-bold w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed">
                                Cancel
                            </button>
                        </Link>
                        <button
                            className={`${reasonImg3 ? "block" : "hidden"} text-white font-bold w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed`}
                            onClick={handleUpload}
                        >
                            {editMode === true ? 'Edit' : 'Save'}
                        </button>
                        <button
                            className={`flex items-center justify-evenly text-white font-bold w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed my-4 ${editMode === true ? 'block' : 'hidden'}`}
                            onClick={handleDelete}
                        >
                            {editMode === true ? 'Delete' : ''}
                        </button>
                    </div>
                    {loading ? <h1 className="text-3xl text-redFont font-black text-center animate-pulse mt-3">Sending data...</h1> : null}
                    <p className='text-2xl text-center text-red-900 font-semibold my-4'>{error}</p>
                </div>
            </div>
        </div>
    );
}

export default NewBoard;
