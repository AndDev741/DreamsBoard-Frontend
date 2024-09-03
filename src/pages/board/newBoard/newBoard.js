import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import customAxios from '../../../axiosConfig';
import axios from 'axios';
import MainSection from './mainSection';
import MainObjectiveSection from './mainObjectiveSection';
import ObjectiveSection from './objective';
import Reasons from './reasons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function NewBoard() {
    const navigate = useNavigate();
    const userId = useSelector(state => state.login.id)
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
    
    
    const [background_img, setBackground_img] = useState(null);
    const [title, setTitle] = useState('Write here the title');
    const [mainObjective_img, setMainObjective_img] = useState(null);
    const [mainObjective_text, setMainObjective_text] = useState('Write here your main goal!');
    const [objective_img, setObjective_img] = useState(null);
    const [objective_text, setObjective_text] = useState('Put here a short text of what you gonna do to conquist your goal');
    const [reasonTitle, setReasonTitle] = useState('Write here 3 big reasons or goals');

    const [reason1, setReason1] = useState('put a title');
    const [reasonImg1, setReasonImg1] = useState(null);
    const [reasonText1, setReasonText1] = useState('Edit here with the text of your reason or goal');

    const [reason2, setReason2] = useState('put a title');
    const [reasonImg2, setReasonImg2] = useState(null);
    const [reasonText2, setReasonText2] = useState('Edit here with the text of your reason or goal');

    const [reason3, setReason3] = useState('put a title');
    const [reasonImg3, setReasonImg3] = useState(null);
    const [reasonText3, setReasonText3] = useState('Edit here with the text of your reason or goal');

    
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
            setLoading(true)
            if(background_img) {
                const backgroundImgResponse = await uploadImageToCloudinary(background_img);
                formData.background_img = backgroundImgResponse.secure_url;
                formData.background_img_id = backgroundImgResponse.public_id;
            }
            if(mainObjective_img){
                const mainObjectiveImgResponse = await uploadImageToCloudinary(mainObjective_img);
                formData.mainObjective_img = mainObjectiveImgResponse.secure_url;
                formData.mainObjective_img_id = mainObjectiveImgResponse.public_id;
            }

            if(objective_img){
                const objectiveImgResponse = await uploadImageToCloudinary(objective_img);
                formData.objective_img = objectiveImgResponse.secure_url;
                formData.objective_img_id = objectiveImgResponse.public_id;
            }

            if(reasonImg1){
                const reasonImg1Response = await uploadImageToCloudinary(reasonImg1);
                reasons.push({title: reason1, img: reasonImg1Response.secure_url, img_id: reasonImg1Response.public_id,text: reasonText1});
            }

            if(reasonImg2 ){
                const reasonImg2Response = await uploadImageToCloudinary(reasonImg2);
                reasons.push({title: reason2, img:reasonImg2Response.secure_url, img_id: reasonImg2Response.public_id,text: reasonText2});
            }

            if(reasonImg3){
                const reasonImg3Response = await uploadImageToCloudinary(reasonImg3);
                reasons.push({title: reason3, img: reasonImg3Response.secure_url, img_id: reasonImg3Response.public_id,text: reasonText3});
            }
            formData.reasons = reasons;

        }catch(err){
            setLoading(false)
            console.error(err)
        }
        

        try{
            const response = await customAxios.post('http://localhost:8080/dreamboard', formData, {
                headers: {
                    'Content-Type': 'application/json'
            }})
            if(response.status === 200){
                navigate("/dashboard");
            }
        }catch(err){
            setLoading(false)
            console.error(err);
            if(err.response.data.status === "errorMissing"){
                setError("Please, include all the images and text necessaries");
            }else{
                setError("An error ocurred trying to save the dreamBoard");
            }
        }
        
    };

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
                            Save
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
