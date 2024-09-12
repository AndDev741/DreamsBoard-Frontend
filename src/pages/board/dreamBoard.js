import customAxios from '../../axiosConfig';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { dreamBoardIdEnter , userIdEnter, background_imgEnter, background_img_idEnter,titleEnter, mainObjective_imgEnter, mainObjective_img_idEnter,mainObjective_textEnter, objective_imgEnter, objective_img_idEnter,objective_textEnter, reasonTitleEnter, reasonsEnter } from './editBoard/editBoardSlice';
import { useTranslation } from 'react-i18next';

function DreamBoard(){
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dreamboardId = useSelector(state => state.dreamBoard.id);
    const userId = useSelector(state => state.login.id);

    const [backgroundImg, setBackgroundImg] = useState('');
    const [backgroundImg_id, setBackgroundImg_id] = useState(null);
    const [mainObjectiveImg, setMainObjectiveImg] = useState('');
    const [mainObjectiveImg_id, setMainObjectiveImg_id] = useState(null);
    const [mainObjectiveText, setMainObjectiveText] = useState('');
    const [objectiveImg, setObjectiveImg] = useState('');
    const [objectiveImg_id, setObjectiveImg_id] = useState(null);
    const [objectiveText, setObjectiveText] = useState('');
    const [reasonTitle, setReasonTitle] = useState('');
    const [reasons, setReasons] = useState([]);
    const [title, setTitle] = useState('');

    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(true);
    const [modal1, setModal1] = useState(true);
    const [modal2, setModal2] = useState(true);


    useEffect(() => {
            async function getDreamBoard() {
                try{
                    const response = await customAxios.get(`/dreamboard/getDreamBoard/${dreamboardId}`);
                    setBackgroundImg((response).data.background_img);
                    setBackgroundImg_id((response).data.background_img_id);
                    setMainObjectiveImg((response).data.mainObjectiveImg);
                    setMainObjectiveImg_id((response).data.mainObjectiveImg_id);
                    setMainObjectiveText((response).data.mainObjective_text);
                    setObjectiveImg((response).data.objective_img);
                    setObjectiveImg_id((response).data.objective_img_id);
                    setObjectiveText((response).data.objective_text);
                    setReasonTitle((response).data.reason_title);
                    setReasons((response).data.reasons);
                    setTitle((response).data.title);
                    setLoading(false);
                }catch (err){
                    navigate("/");
                }
            }
            getDreamBoard();
    }, [])

    const handleEdit = () => {
        dispatch(dreamBoardIdEnter(dreamboardId));
        dispatch(userIdEnter(userId));
        dispatch(background_imgEnter(backgroundImg));
        dispatch(background_img_idEnter(backgroundImg_id));
        dispatch(titleEnter(title));
        dispatch(mainObjective_imgEnter(mainObjectiveImg));
        dispatch(mainObjective_img_idEnter(mainObjectiveImg_id));
        dispatch(mainObjective_textEnter(mainObjectiveText));
        dispatch(objective_imgEnter(objectiveImg));
        dispatch(objective_img_idEnter(objectiveImg_id));
        dispatch(objective_textEnter(objectiveText));
        dispatch(reasonTitleEnter(reasonTitle));
        dispatch(reasonsEnter(reasons));

        navigate("/editBoard");
    }

    return(
        <div className="md:flex items-center justify-center">
            {loading === false ? (
                <div className="pb-6 md:w-[80vw] lg:w-[50vw]">

                <div className="rounded-b-md">
                    <div className={`flex flex-col items-center justify-center w-full h-[241px] lg:w-[100%] bg-cover rounded-b-md`}
                    style={{backgroundImage: `url(${backgroundImg})`}}>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center my-4">
                    <h1 className={`text-3xl text-center font-black underline flex-wrap w-[100%]`}>{title}</h1>
                </div>

                <div className="flex flex-col items-center justify-center my-8">
                    <div className="flex items-center justify-center w-[90vw] lg:w-[550px] h-[169px] lg:h-[250px]  rounded-md bg-cover"
                    style={{ backgroundImage:`url(${mainObjectiveImg})`}} >
                    </div>

                    <div className="flex items-center justify-center">
                        <h2 className={`bg-transparent text-2xl font-bold mt-2 text-center w-[90vw] md:w-[80vw] lg:w-[400px]`}>{mainObjectiveText}</h2>
                    </div>
                </div>

                <div className="flex items-center justify-between lg:justify-evenly my-6">
                    <div>
                        <div className="flex items-center justify-center w-[173px] lg:w-[200px] h-[270px] rounded-md bg-cover ml-5 md:ml-0"
                        style={{backgroundImage: `url(${objectiveImg})`}}></div>
                    </div>  
                    <div className="flex items-center justify-center w-[50vw] lg:w-[50%]">
                        <h2 className={`bg-transparent text-[18px] font-bold min-h-[180px] md:min-h-[100px] text-center w-[40vw]`}
                         >{objectiveText}</h2>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <h2 type='text'
                    className={`bg-transparent text-center mt-5 mb-3 text-2xl font-bold text-redFont w-[90%] lg:w-[100%`} >{reasonTitle}</h2>
                    <div className="flex items-center justify-evenly text-center mt-3 flex-wrap">
                        {reasons.map((reason, index) => (
                            <div>
                                <div className={`flex flex-col items-center mx-6 lg:mx-9 cursor-pointer mt-2`}>
                                    <button className="w-[60px] h-[60px] rounded-full bg-cover"
                                    style={{backgroundImage: `url(${reason.img})`}}
                                    onClick={e => index === 0 ? setModal(!modal) : index === 1 ? setModal1(!modal1) : setModal2(!modal2)}></button>
                                    <h3 className="bg-transparent w-[95px] text-center">{reason.title}</h3>
                                </div>
                                <ReasonDetails img={reason.img} text={reason.text} modal={index === 0 ? modal : index === 1 ? modal1 : modal2} />
                                
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-evenly w-full mt-5">
                        <Link to={'/dashboard'}>
                            <button className="text-white font-medium w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed">
                                {t('Back')}
                            </button>
                        </Link>
                        <button onClick={handleEdit}
                        className="text-white font-medium w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed">{t('EditButton')}</button>
                </div>

            </div>
            ) : (
                <h1>{t('Loading')}</h1>
            )}
        </div>
            
    )
}

function ReasonDetails({img, text, modal}){
    return(
        <div className={`bg-[#32dace] w-[40vw] md:w-[185px] min-h-[225px] rounded-md border-[#31cac0] border-solid border-2 ${modal ? 'block' : 'hidden'} mx-1 md:mx-4 mt-2 pb-4`}>
            <div className="flex flex-col items-center justify-evenly h-full px-1 py-2 md:px-3" >
                <div>
                    <div className={`flex items-center md:my-2 justify-center w-[80px] h-[80px] rounded-full bg-cover border-2 border-[#1d5f5b]`} 
                    style={{backgroundImage: `url(${img})`}}>
                    </div>
                </div>
                <div>
                    <h3 className={`bg-transparent text-center text-redFont font-bold w-[100%] h-[100px]`}>{text}</h3>
                </div>
            </div>
        </div>
    )
}

export default DreamBoard;