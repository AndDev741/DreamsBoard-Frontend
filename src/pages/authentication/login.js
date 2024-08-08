import loginPC from '../../assets/loginPC.png';
import axios from '../../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { idEnter, img_linkEnter, nameEnter, perfil_phraseEnter} from './loginSlice'

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {
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

    return(
        <div className="flex flex-col lg:flex-row items-center justify-center bg-[#EEFCC7] lg:bg-white min-h-screen">
            <div className='flex flex-col lg:flex-row-reverse items-center justify-center w-full h-full'>
                
                <div className='flex flex-col items-center justify-center lg:w-[550px] lg:h-[580px] lg:bg-[#EEFCC7] lg:rounded-r-lg'>
                    <div className="mt-2 text-redFont text-4xl md:text-5xl lg:text-5xl font-black text-center">
                        <h1 className="">Bem vindo</h1>
                        <h1>de volta!</h1>
                    </div>

                    <div className="mt-3 text-lightRed font-medium text-3xl md:text-4xl lg:text-3xl text-center">
                        <h3>Crie e gerencie seus</h3>
                        <h3>quadros de sonhos</h3>
                    </div>

                    <form className='flex flex-col items-center justify-center'
                    onSubmit={handleSubmit}>
                        <div className="mt-5">
                            <label htmlFor="email" 
                            className="text-ligthGray text-xl md:text-3xl">Email</label>
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
                        <div className="mt-5 md:mt-5">
                            <label htmlFor="password" 
                            className="text-ligthGray text-xl md:text-3xl">Senha</label>
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
                        <div className="flex items-center justify-center mt-5">
                            <div>
                                <input type="submit"
                                id="submit"
                                name="submit"
                                value="Entrar"
                                className="bg-redFont hover:bg-lightRed
                                w-[207px] md:w-[307px] lg:w-[250px] h-[51px] md:h-[70px] lg:h-[60px]
                                text-white text-xl md:text-3xl font-bold rounded-lg cursor-pointer"/>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-3">
                            <Link to={"/register"} className="text-redFont text-xl md:text-3xl underline cursor-pointer">Registre-se</Link>
                            <p className='text-xl text-center text-red-900 font-semibold'>{errorMessage}</p>
                        </div>
                    </form>
                </div>

                <div className='flex lg:flex-col items-center justify-between lg:w-[550px] lg:h-[580px] lg:bg-redFont lg:rounded-l-lg'>
                    <img src={loginPC}
                    alt="homan in a playground"
                    className={'w-[100vw]'}/>
                    <p className='text-white font-black text-3xl text-center w-[470px] mb-12 hidden lg:block'>A melhor maneira de gerir seus sonhos</p>
                </div>
            </div>
        </div>

        
    )
}

export default Login;