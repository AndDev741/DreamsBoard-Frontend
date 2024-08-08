import loginPC from '../../assets/loginPC.png';
import axios from 'axios';
import { redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import {useState} from 'react'

function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(e){
        e.preventDefault();

        const registerData = {name: name, email: email, password: password};

        axios({
            url: "http://localhost:8080/register",
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            data: registerData
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
              if(data.status == "success"){
                redirect("/")
              }
        })
        .catch((error) => {
            setErrorMessage("O email já está sendo utilizado");   
        })
    }

    return(
        <div className="flex flex-col lg:flex-row items-center justify-center bg-[#EEFCC7] lg:bg-white min-h-screen">
            <div className='flex flex-col lg:flex-row-reverse items-center justify-center w-full h-full'>
                
                <div className='flex flex-col items-center justify-center lg:w-[550px] lg:h-[580px] lg:bg-[#EEFCC7] lg:rounded-r-lg'>
                    <div className="mt-2 text-redFont text-4xl md:text-5xl lg:text-4xl font-black text-center">
                        <h1 className="">Seja bem vindo</h1>
                        <h1>ao Dreams Board!</h1>
                    </div>

                    <div className="mt-3 lg:mt-1 text-lightRed font-medium text-3xl md:text-2xl lg:text-3xl text-center">
                        <h3>Crie e gerencie seus</h3>
                        <h3>quadros de sonhos</h3>
                    </div>

                    <form className='flex flex-col items-center justify-center'
                    onSubmit={handleSubmit}>
                        <div className="mt-5 lg:mt-1">
                            <label htmlFor="name" 
                            className="text-ligthGray text-xl md:text-3xl">Nome</label>
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
                        <div className="mt-5 lg:mt-1">
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
                        <div className="flex items-center justify-center mt-5 lg:mt-2">
                            <div>
                                <input type="submit"
                                id="submit"
                                name="submit"
                                value="Criar conta"
                                className="bg-redFont hover:bg-lightRed
                                w-[207px] md:w-[307px] lg:w-[220px] h-[51px] md:h-[70px] lg:h-[50px]
                                text-white text-xl md:text-3xl lg:text-2xl font-bold rounded-lg cursor-pointer"/>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center mt-3 mt:mt-1">
                            <Link to={'/'} className="text-redFont text-xl md:text-3xl underline cursor-pointer">Fazer Login</Link>
                            <p className='text-xl text-red-900 font-semibold'>{errorMessage}</p>
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

export default Register;