import rigthArrow from '../../assets/RigthArrow.png';
import leftArrow from '../../assets/LeftArrow.png';
import { Link } from "react-router-dom";
function NewBoard(){
    return(
        <div className="lg:flex items-center justify-center bg-bgColor">
            <div className="pb-6 lg:w-[50vw]">
                <div className="flex items-center justify-center w-full h-[241px] bg-bgSecondary lg:w-[100%] rounded-b-md">
                    <h2 className="text-2xl font-black text-redFont">Add your main picture</h2>
                </div>
                <div className="flex flex-col items-center justify-center my-4">
                    <h1 className="text-3xl text-center text-redFont font-black underline">The title of your dream</h1>
                    <div className="flex flex-col items-center justify-center my-6">
                        <div className="flex items-center justify-center w-[80vw] lg:w-[300px] h-[149px] bg-bgSecondary rounded-md">
                            <p>Add a image here</p>
                        </div>
                        <div className="flex flex-row justify-between w-full">
                            <img alt="a arrow to the left"
                            src={leftArrow} className='w-[44px] cursor-pointer' />
                            <h3 className="text-xl text-redFont font-bold mt-2">Your main objective</h3>
                            <img alt="A arrow to the rigth"
                            src={rigthArrow} className='w-[44px] cursor-pointer' />
                        </div>
                    </div>
                    <div className="flex items-center justify-between lg:justify-evenly">
                        <div>
                            <div className="flex items-center justify-center w-[173px] h-[216px] bg-bgSecondary rounded-md">
                                <p>Add a image here</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-[50vw] lg:w-[50%]">
                            <h3 className="text-[18px] text-redFont font-bold text-center w-[40vw]">Put here a short text of what you gonna do to conquist tour objective</h3>
                        </div>
                    </div>
                    <h2 className="mt-5 mb-3 text-2xl font-bold text-redFont">3 Reasons why</h2>
                    <div className="flex items-center justify-center">
                        <div className="mx-6 lg:mx-9">
                            <div className="w-[60px] h-[60px] rounded-full bg-bgSecondary">
                            </div>
                            <p className="">Reason 1</p>
                        </div>
                        <div className="mx-6 lg:mx-9">
                            <div className="w-[60px] h-[60px] rounded-full bg-bgSecondary">
                            </div>
                            <p className="">Reason 1</p>
                        </div>
                        <div className="mx-6 lg:mx-9">
                            <div className="w-[60px] h-[60px] rounded-full bg-bgSecondary">
                            </div>
                            <p className="">Reason 1</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-evenly w-full mt-5">
                        <Link to={'/dashboard'}>
                            <button className="text-white font-medium w-[180px] h-[40px] bg-redFont rounded-md text-xl hover:bg-lightRed">Cancel</button>
                        </Link>
                        <button className="text-white font-medium w-[180px] h-[40px] bg-redFont rounded-md text-xl hover:bg-lightRed">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBoard;