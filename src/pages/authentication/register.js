import loginPC from '../../assets/loginPC.png';
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
            setErrorMessage("Email is already in use");
        }
    }

    return(
        <div className="flex flex-col lg:flex-row items-center justify-center bg-[#EEFCC7] lg:bg-white min-h-screen">
            <div className='flex flex-col lg:flex-row-reverse items-center justify-center w-full h-full'>
                
                <div className='flex flex-col items-center justify-center lg:w-[550px] lg:h-[580px] lg:bg-[#EEFCC7] lg:rounded-r-lg'>
                    <div className="mt-2 text-redFont text-4xl md:text-5xl lg:text-4xl font-black text-center">
                        <h1 className="">Welcome to</h1>
                        <h1>DreamBoards</h1>
                    </div>

                    <div className="mt-3 lg:mt-1 text-lightRed font-medium text-3xl md:text-2xl lg:text-3xl text-center">
                        <h3>Create and manage your</h3>
                        <h3>DreamBoards</h3>
                    </div>

                    <form className='flex flex-col items-center justify-center'
                    onSubmit={handleSubmit}>
                        <div className="mt-5 lg:mt-1">
                            <label htmlFor="name" 
                            className="text-ligthGray text-xl md:text-2xl">Name</label>
                            <br/>
                            <input name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            type="text"
                            className="bg-[#EEEBEA] border border-lightRed rounded-lg w-[80vw] lg:w-[450px] h-[60px] md:h-[70px] lg:h-[60px] text-2xl md:text-2xl pl-4
                            focus:ring-redFont focus:border-redFont"
                            placeholder="And Dev"/>
                        </div>
                        <div className="mt-5 lg:mt-1">
                            <label htmlFor="email" 
                            className="text-ligthGray text-xl md:text-2xl">Email</label>
                            <br/>
                            <input name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="text"
                            className="bg-[#EEEBEA] border border-lightRed rounded-lg w-[80vw] lg:w-[450px] h-[60px] md:h-[70px] lg:h-[60px] text-2xl md:text-2xl pl-4
                            focus:ring-redFont focus:border-redFont"
                            placeholder="email@gmail.com"/>
                        </div>
                        <div className="mt-5 lg:mt-1">
                            <label htmlFor="password" 
                            className="text-ligthGray text-xl md:text-2xl">Password</label>
                            <br/>
                            <input name="password"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            className="bg-[#EEEBEA] border border-lightRed rounded-lg w-[80vw] lg:w-[450px] h-[60px] md:h-[70px] lg:h-[60px] text-2xl md:text-2xl pl-4
                            focus:ring-redFont focus:border-redFont"
                            />
                        </div>
                        <div className="flex items-center justify-center mt-5 lg:mt-2">
                            <div>
                                <input type="submit"
                                id="submit"
                                name="submit"
                                value="Create account"
                                className="bg-redFont hover:bg-lightRed
                                w-[207px] md:w-[307px] lg:w-[220px] h-[51px] md:h-[70px] lg:h-[50px]
                                text-white text-xl md:text-3xl lg:text-2xl font-bold rounded-lg cursor-pointer"/>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-3 mt:mt-1">
                            <Link to={'/'} className="text-center text-redFont text-xl md:text-2xl underline cursor-pointer">Already have an account? Make login</Link>
                            <p className='text-xl text-red-900 font-semibold'>{errorMessage}</p>
                        </div>
                    </form>
                </div>

                <div className='flex lg:flex-col items-center justify-between lg:w-[550px] lg:h-[580px] lg:bg-redFont lg:rounded-l-lg'>
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