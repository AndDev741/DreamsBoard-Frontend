import AddBoard from "./addBoard";
import Perfil from "./perfil"
import Board from "./board";
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Dashboard() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const id = useSelector(state => state.login.id);
    const img_link = useSelector(state => state.login.img_link);
    const name = useSelector(state => state.login.name);
    const perfil_phrase = useSelector(state => state.login.perfil_phrase);
    const [loading, setLoading] = useState(true);

    const [dashboards, setDashboard] = useState([]);

    useEffect(() => {
       axios.get(`/dreamboard/${id}`)
       .then(response => {
            setDashboard(response.data);
            setLoading(false);
       })
       .catch(error => {
        console.error(error);
        navigate("/")
       })
    }, [])
    
    return(
        <div className="w-[100%] min-h-[100vh] pb-8">
            <Perfil img_Link={img_link} name={name}/>
            <h1 className="mt-2 text-center text-[36px] font-bold">{t('DashboardTitle')}</h1>
            <h2 className="text-center text-[24px] font-ligth">{perfil_phrase}</h2>
            {/* Loading logic */}
            {loading === false ? (
                <div className="flex flex-col lg:flex-row flex-wrap items-center justify-center">
                    {dashboards.length > 0 ? (
                        dashboards.map((dashboard, index) => (
                            <Board id={dashboard.id} background_img={dashboard.background_img} title={dashboard.title}/>
                        ))
                    ) : null}
                    <AddBoard/>
                </div>
            ) : (
            <h1 className="text-xl text-center">{t('DashboardLoading')}</h1>
            )}

        </div>
    )
}

export default Dashboard;

