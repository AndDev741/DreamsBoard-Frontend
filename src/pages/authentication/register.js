import loginPC from '../../assets/loginPC.png';
import nameIcon from '../../assets/nameIcon.png';
import emailIcon from '../../assets/emailIcon.png';
import unSeePassIcon from '../../assets/unSeePassIcon.png';
import seePassIcon from '../../assets/seePassIcon.png';
import passwordIcon from '../../assets/passwordIcon.png';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { registerEnter } from './loginSlice';

function Register(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [inputType ,setInputType] = useState('password');
    const [seePassword, setSeePassword] = useState(seePassIcon);

    async function handleSubmit(e){
        e.preventDefault();

        const registerData = {name: name, email: email, password: password};

        try{
            const response = await axios.post("http://localhost:8080/register", registerData);
            console.log(response)
            if(response.data.status === "success"){
                dispatch(registerEnter("Now, use your new account to make login!"));
                navigate("/");
            }
        }catch(err){
            console.error(err);
            setErrorMessage(err.response.data.error);
        }
    }

    const handleSeePassword = () => {
        if(seePassword === seePassIcon){
            setSeePassword(unSeePassIcon);
            setInputType("text");
        }else if (seePassword === unSeePassIcon){
            setSeePassword(seePassIcon);
            setInputType("password");
        }
    }

    return(
        <div className="flex flex-col lg:flex-row items-center justify-start lg:bg-white min-h-screen">
            <div className='flex flex-col lg:flex-row-reverse items-center justify-center w-full h-full'>
                <div className='flex flex-col items-center justify-start w-full h-full lg:w-[550px] lg:h-[580px] lg:border-solid lg:border-2 border-greenMain lg:rounded-r-lg'>

                    <div className='flex items-center justify-evenly w-[100%] h-[67px]'>
                        <Link to={"/"}><h2 className='text-2xl'>Login</h2></Link>
                        <h2 className='text-2xl font-semibold'>Register</h2>
                        
                    </div>
                    {/*Border */}
                    <div className='flex items-start justify-end w-[100%]'>
                        <div className='border-solid border-b-[3px] border-greenMain w-[50%]'></div>
                    </div>

                    <div className="mt-2 text-4xl md:text-[40px]">
                        <h1 className=" font-bold text-center">Welcome to DreamBoard!</h1>
                    </div>

                    <div className="mt-2 mx-2 sm:mx-0 text-greenMain font-medium text-3xl md:text-4xl lg:text-3xl text-center">
                        <h3>Start getting inspired </h3>
                        <h3>by creating your dreamBoards!</h3>
                    </div>

                    <form className='flex flex-col items-center justify-center'
                    onSubmit={handleSubmit}>
                        <div className="mt-5 lg:mt-4">
                            <label htmlFor="name" 
                            className="flex items-center border-solid border-2 border-greenMain rounded-[6px] hover:border-cyan-600">
                                <img className='w-[33px] h-[33px] mx-3 cursor-pointer'
                                src={nameIcon}/>
                                <input name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                type="text"
                                className="bg-transparent w-[80vw] sm:w-[395px] md:w-[510px] lg:w-[395px] h-[60px] md:h-[70px] lg:h-[60px] text-2xl md:text-2xl pl-4 focus:outline-none"
                                placeholder="And Dev"/>
                            </label>
                            
                        </div>
                        <div className="mt-5 lg:mt-4">
                            <label htmlFor="email" 
                            className="flex items-center border-solid border-2 border-greenMain rounded-[6px] hover:border-cyan-600">
                                <img className='w-[33px] h-[33px] mx-3 cursor-pointer'
                                src={emailIcon}/>
                                <input name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                type="text"
                                className="bg-transparent w-[80vw] sm:w-[395px] md:w-[510px] lg:w-[395px] h-[60px] md:h-[70px] lg:h-[60px] text-2xl md:text-2xl pl-4 focus:outline-none"
                                placeholder="email@gmail.com"/>
                            </label>
                           
                        </div>
                        <div className="mt-5 lg:mt-4">
                            <label htmlFor="password" 
                            className="flex items-center border-solid border-2 border-greenMain rounded-[6px] hover:border-cyan-600">
                                <img className='w-[33px] h-[33px] mx-3 cursor-pointer'
                                src={passwordIcon} />
                                <input name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                type={inputType}
                                placeholder="************"
                                className="bg-transparent w-[65vw] sm:w-[340px] md:w-[450px] lg:w-[340px] h-[60px] md:h-[70px] lg:h-[60px] text-2xl md:text-2xl pl-4 focus:outline-none"
                                />
                                <img className='w-[33px] h-[33px] mx-3 cursor-pointer'
                                src={seePassword}
                                onClick={handleSeePassword}
                                />
                            </label>
                            
                        </div>

                        <div className="flex items-center justify-center mt-5 lg:mt-8">
                            <div>
                                <input type="submit"
                                id="submit"
                                name="submit"
                                value="Create account"
                                className="bg-greenMain hover:bg-[#30b6ad]
                                w-[207px] md:w-[307px] lg:w-[250px] h-[51px] md:h-[70px] lg:h-[60px]
                                text-white text-xl md:text-3xl font-bold rounded-lg cursor-pointer"/>
                            </div>                            
                        </div>
                        <p className='my-2 text-2xl font-bold text-red-700'>{errorMessage}</p>
                    </form>
                </div>
                <div className='flex lg:flex-col items-center justify-between lg:w-[550px] lg:h-[580px] lg:bg-greenMain lg:rounded-l-lg'>
                    <img src={loginPC}
                    alt="homan in a playground"
                    className={'w-[100vw]'}/>
                    <p className='text-white font-black text-3xl text-center w-[470px] mb-12 hidden lg:block'>The best way of manage your DreamBoards</p>
                </div>
            </div>
        </div>

        
    )
}

export default Register;