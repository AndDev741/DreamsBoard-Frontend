import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import settingsIcon from '../../assets/settingsIcon.png';

function Perfil({img_Link, name}){
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
        const date = new Date().getHours();
        getHourMessage(date);
    }, []);

    function getHourMessage(hour) {
        if (hour >= 18 || hour < 5) {
            setGreeting("Good Night");
        } else if (hour >= 5 && hour < 11) {
            setGreeting("Good Morning");
        } else if (hour >= 11 && hour < 18) {
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
                            <h2 className="hidden md:block text-xl font-black">{greeting} <span className='text-[#3A807A]
                            '>{name}</span></h2>
                            <h2 className="block md:hidden text-xl font-black">{greeting} <br/> <span className='text-[#3A807A]
                            '>{name}</span></h2>
                        </div>
                    </div>
                </div>
                <Link to={"/configuration"}>
                    <div className='flex flex-col items-center justify-center mr-5 md:mt-[-25px] cursor-pointer'>
                        <img alt='Settings icon'
                        src={settingsIcon}
                        className="w-[50px] hover:scale-90"/>
                    </div>
                </Link>
            </div>
            <div className='mt-4 w-full border-solid border-[1px] border-[#2C9C94]'></div>
        </div>
    
    )
}

export default Perfil;