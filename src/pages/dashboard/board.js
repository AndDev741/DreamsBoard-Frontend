import { idEnter } from "../board/dreamBoardSlice";
import { useDispatch, UseDispatch } from "react-redux";
import { useNavigate } from "react-router";

function Board({id, background_img, title}){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const goToDreamBoard = () => {
        dispatch(idEnter(id));
        navigate("/dreamBoard");
    }
    return(
        <div onClick={goToDreamBoard}
        className="w-[90vw] h-[200px] md:h-[240px] md:w-[500px] rounded-[6px] my-8 cursor-pointer lg:mx-10">
            <div className={`flex items-center justify-center w-full h-full rounded-[6px] bg-[#D9D5A7] hover:bg-[#D9AB91] bg-cover hover:border-2 hover:border-yellow-300`}
            style={{backgroundImage: background_img ? `url(${background_img})` : null}}>
            </div>
            <h1 className="text-2xl lg:text-3xl text-center text-[#3A807A] font-black underline mt-2">{title}</h1>
        </div>
    )
}

export default Board;