import AddBoard from "./addBoard";
import Perfil from "./perfil"

function Dashboard() {
    return(
        <div className="bg-[#EEFCC7] w-[100%] min-h-[100vh]">
            <Perfil/>
            <h1 className="my-3 text-center text-3xl font-bold">Your Dreams Boards</h1>
            <div className="flex flex-col items-center justify-center mt-3"> 
                <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center">
                    <AddBoard/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

