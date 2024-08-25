import loginPC from '../../assets/loginPC.png';
import emailIcon from '../../assets/emailIcon.png';
import unSeePassIcon from '../../assets/unSeePassIcon.png';
import seePassIcon from '../../assets/seePassIcon.png';
import passwordIcon from '../../assets/passwordIcon.png';
import customAxios from '../../axiosConfig';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { idEnter, img_linkEnter, nameEnter, perfil_phraseEnter} from './loginSlice'

function Login(){
    const registerPhrase = useSelector(state => state.login.registerPhrase)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(registerPhrase || "");
    const [inputType ,setInputType] = useState('password');
    const [seePassword, setSeePassword] = useState(seePassIcon);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        setErrorMessage("");
        e.preventDefault();
        sessionStorage.clear();
        try{
            await customAxios.post("http://localhost:8080/logout");      
        }catch(e){
            console.error(e);
        }
        
        try {
            const response = await customAxios.post('http://localhost:8080/login', {
                email,
                password
            });
            if(response.data.id){
                dispatch(idEnter(response.data.id));
                dispatch(img_linkEnter(response.data.img_link));
                dispatch(nameEnter(response.data.name));
                dispatch(perfil_phraseEnter(response.data.perfil_phrase));
                navigate("/dashboard");
            }
        } catch (error) {
                console.error('Erro durante o login: ', error);
                setErrorMessage("Email or password incorrect");
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
                        <h2 className='text-2xl font-semibold'>Login</h2>
                        <Link to={"/register"}><h2 className='text-2xl'>Register</h2></Link>
                        
                    </div>
                    {/*Border */}
                    <div className='flex items-start justify-start w-[100%]'>
                        <div className='border-solid border-b-[3px] border-greenMain w-[50%]'></div>
                    </div>

                    <div className="mt-5 text-4xl md:text-5xl lg:text-[45px] text-center">
                        <h1 className="font-bold">Welcome back!</h1>
                    </div>

                    <div className="my-2 text-greenMain font-medium text-3xl md:text-5xl lg:text-3xl text-center">
                        <h3>Create and manage your</h3>
                        <h3>DreamBoards</h3>
                    </div>

                    <form className='flex flex-col items-center justify-center'
                    onSubmit={handleSubmit}>
                        <div className="mt-8">
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
                        <div className="mt-8">
                            <label htmlFor="password" 
                            className="flex items-center border-solid border-2 border-greenMain rounded-[6px] hover:border-cyan-600">
                                <img className='w-[33px] h-[33px] mx-3 cursor-pointer'
                                src={passwordIcon} />
                                <input name={"password"}
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

                        <div>
                            <h3 className='text-xl underline text-center text-greenMain mt-2'>Forgot your password?</h3>
                        </div>

                        <div className="flex items-center justify-center mt-5">
                            <div>
                                <input type="submit"
                                id="submit"
                                name="submit"
                                value="Enter"
                                className="bg-greenMain hover:bg-[#30b6ad]
                                w-[207px] md:w-[307px] lg:w-[250px] h-[51px] md:h-[70px] lg:h-[60px]
                                text-white text-xl md:text-3xl font-bold rounded-lg cursor-pointer"/>
                            </div>
                        </div>

                        <p className='mt-2 text-xl font-bold text-red-800 text-center'>{errorMessage}</p>
                    </form>
                </div>

                <div className='flex lg:flex-col items-center justify-between lg:w-[550px] lg:h-[580px] lg:bg-greenMain lg:rounded-l-lg'>
                    <img src={loginPC}
                    alt="homan in a playground"
                    className={'w-[100vw]'}/>
                    <p className='text-white font-extrabold text-3xl text-center w-[470px] mb-12 hidden lg:block'>The best way of manage your DreamBoards</p>
                </div>
            </div>
        </div>

        
    )
}

export default Login;