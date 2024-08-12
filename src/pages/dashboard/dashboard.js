import AddBoard from "./addBoard";
import Perfil from "./perfil"
import Board from "./board";
import axios from '../../axiosConfig';
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Dashboard() {
    const navigate = useNavigate();
    const id = useSelector(state => state.login.id);
    const img_link = useSelector(state => state.login.img_link);
    const name = useSelector(state => state.login.name);
    const perfil_phrase = useSelector(state => state.login.perfil_phrase);

    const [dashboards, setDashboard] = useState([]);

    useEffect(() => {
       axios.get(`/dreamboard/${id}`)
       .then(response => {
            setDashboard(response.data);
       })
       .catch(error => {
        console.error(error);
        navigate("/")
       })
    }, [])
    

    return(
        <div className="bg-[#EEFCC7] w-[100%] min-h-[100vh] pb-8">
            <Perfil img_Link={img_link} name={name} perfil_phrase={perfil_phrase}/>
            <h1 className="mt-2 text-center text-3xl font-bold">Your Dreams Boards</h1>
            <div className="flex flex-col items-center justify-center"> 
                <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center">
                    {dashboards.length > 0 ? (
                        dashboards.map((dashboard, index) => (
                            <Board id={dashboard.id} background_img={dashboard.background_img} title={dashboard.title}/>
                        ))
                    ) : null}
                    <AddBoard/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

