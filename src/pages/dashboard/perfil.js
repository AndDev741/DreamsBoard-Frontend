import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import settingsIcon from '../../assets/settingsIcon.png';

function Perfil({img_Link, name, perfil_phrase}){
    const [greeting, setGreeting] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const date = new Date().getHours();
        getHourMessage(date);
    }, []);

    function getHourMessage(hour) {
        if (hour >= 18 || hour < 5) {
            setGreeting("Good Night");
        } else if (hour >= 5 && hour < 10) {
            setGreeting("Good Morning");
        } else if (hour >= 10 && hour < 18) {
            setGreeting("Good Evening");
        }
    }
    
    return(
        <div>
            <div className='flex items-center justify-between pt-5'>
                <div className="flex flex-col justify-center">
                    <div className="flex items-center ml-3">
                        <img alt='Profile pic'
                        className="w-[70px] h-[70px] rounded-full"
                        src={`${img_Link}`} />
                        <div className="ml-3">
                            <h2 className="text-xl text-redFont font-black">{greeting} - {name}</h2>
                            <p className='text-redFont font-medium'>{perfil_phrase}</p>
                        </div>
                    </div>
                </div>
                <Link to={"/configuration"}>
                    <div className='flex flex-col items-center justify-center mr-5 cursor-pointer'>
                        <img src={settingsIcon}
                        className="w-[50px]"/>
                    </div>
                </Link>
            </div>
            <div className='mt-4 w-full border-solid border-[1px] border-redFont'></div>
        </div>
    
    )
}

export default Perfil;