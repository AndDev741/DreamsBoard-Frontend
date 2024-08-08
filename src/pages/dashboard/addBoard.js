import {Link} from 'react-router-dom'

function AddBoard(){
    return(
        <Link to={'/newBoard'}>
            <div className="w-[90vw] h-[240px] md:w-[500px] border-dashed border-redFont border-2 rounded-[6px] my-5 cursor-pointer mx-4">
                <div className="flex items-center justify-center w-full h-full bg-[#D9D5A7] hover:bg-[#D9AB91] ">
                    <h1 className="text-3xl font-bold text-center">Add Dream Board</h1>
                </div>
            </div>
        </Link>
    )
}

export default AddBoard;