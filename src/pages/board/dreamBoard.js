import customAxios from '../../axiosConfig';
import { useEffect, useState } from "react";
import { useSelector, UseSelector } from "react-redux";
import { Link } from 'react-router-dom';

function DreamBoard(){
    const dreamboardId = useSelector(state => state.dreamBoard.id);
    console.log(dreamboardId)
    const [backgroundImg, setBackgroundImg] = useState('');
    const [mainObjectiveImg, setMainObjectiveImg] = useState('');
    const [mainObjectiveText, setMainObjectiveText] = useState('');
    const [objectiveImg, setObjectiveImg] = useState('');
    const [objectiveText, setObjectiveText] = useState('');
    const [reasonTitle, setReasonTitle] = useState('');
    const [reasons, setReasons] = useState([]);
    const [title, setTitle] = useState('');

    const [modal, setModal] = useState(true);
    const [modal1, setModal1] = useState(true);
    const [modal2, setModal2] = useState(true);


    useEffect(() => {
        try{
            async function getDreamBoard() {
                const response = customAxios.get(`http://localhost:8080/dreamboard/getDreamBoard/${dreamboardId}`);
                setBackgroundImg((await response).data.background_img)
                setMainObjectiveImg((await response).data.mainObjectiveImg)
                setMainObjectiveText((await response).data.mainObjective_text);
                setObjectiveImg((await response).data.objective_img);
                setObjectiveText((await response).data.objective_text);
                setReasonTitle((await response).data.reason_title);
                setReasons((await response).data.reasons);
                setTitle((await response).data.title);
            }
            getDreamBoard();
        }catch (err){
            alert("Error trying get DreamBoard");
        }
        
    }, [])
    return(
        <div className="md:flex items-center justify-center bg-bgColor">
            <div className="pb-6 md:w-[80vw] lg:w-[50vw]">

                <div className="bg-bgSecondary rounded-b-md">
                    <div className={`flex flex-col items-center justify-center w-full h-[241px] bg-bgSecondary lg:w-[100%] bg-cover rounded-b-md`}
                    style={{backgroundImage: `url(${backgroundImg})`}}>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center my-4">
                    <h1 className={`text-2xl lg:text-3xl text-center text-redFont font-black underline flex-wrap w-[100%]`}>{title}</h1>
                </div>

                <div className="flex flex-col items-center justify-center my-6">
                    <div className="flex items-center justify-center w-[80vw] lg:w-[450px] h-[169px] bg-bgSecondary rounded-md bg-cover"
                    style={{ backgroundImage:`url(${mainObjectiveImg})`}} >
                    </div>

                    <div className="flex items-center justify-center">
                        <h2 className={`bg-transparent md:text-2xl text-redFont font-bold mt-2 text-center w-[90vw] md:w-[80vw] lg:w-[400px]`}>{mainObjectiveText}</h2>
                    </div>
                </div>

                <div className="flex items-center justify-between lg:justify-evenly">
                    <div>
                        <div className="flex items-center justify-center w-[173px] h-[216px] bg-bgSecondary rounded-md bg-cover"
                        style={{backgroundImage: `url(${objectiveImg})`}}></div>
                    </div>  
                    <div className="flex items-center justify-center w-[50vw] lg:w-[50%]">
                        <h2 className={`bg-transparent text-[18px] text-redFont font-bold min-h-[180px] md:min-h-[100px] text-center w-[40vw]`}
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
                                    <button className="w-[60px] h-[60px] rounded-full bg-bgSecondary bg-cover"
                                    style={{backgroundImage: `url(${reason.img})`}}
                                    onClick={e => index == 0 ? setModal(!modal) : index == 1 ? setModal1(!modal1) : setModal2(!modal2)}></button>
                                    <h3 className="bg-transparent w-[85px] text-center">{reason.title}</h3>
                                </div>
                                <ReasonDetails img={reason.img} text={reason.text} modal={index == 0 ? modal : index == 1 ? modal1 : modal2} />
                                
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-evenly w-full mt-5">
                        <Link to={'/dashboard'}>
                            <button className="text-white font-medium w-[180px] h-[40px] bg-redFont rounded-md text-xl hover:bg-lightRed">
                                Cancel
                            </button>
                        </Link>
                        <button className="text-white font-medium w-[180px] h-[40px] bg-redFont rounded-md text-xl hover:bg-lightRed">Edit</button>
                </div>

            </div>
        </div>
            
    )
}

function ReasonDetails({img, text, modal}){
    return(
        <div className={`bg-[#D9AB91] w-[40vw] md:w-[185px] md:min-h-[225px] rounded-md border-redFont border-solid border-2 ${modal ? 'block' : 'hidden'} mx-1 md:mx-4 mt-2`}>
            <div className="flex flex-col items-center justify-evenly h-full px-1 py-2 md:px-3" >
                <div>
                    <div className={`flex items-center md:my-2 justify-center w-[80px] h-[80px] rounded-full bg-cover border-2 border-redFont`} 
                    style={{backgroundImage: `url(${img})`}}>
                    </div>
                </div>
                <div>
                    <h3 className={`bg-transparent text-center text-redFont font-bold w-[100%] h-[100px] `}>{text}</h3>
                </div>
            </div>
        </div>
    )
}

export default DreamBoard;