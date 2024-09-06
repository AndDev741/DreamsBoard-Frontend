import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import passwordIcon from "../../../assets/passwordIcon.png";
import seePassIcon from "../../../assets/seePassIcon.png";
import unSeePassIcon from "../../../assets/unSeePassIcon.png";
import newPasswordIcon from "../../../assets/newPasswordIcon.png";
import * as Yup from 'yup';
import axios from "axios";

function RecoverPassword(){
    const [seePassword, setSeePassword] = useState(seePassIcon);
    const [inputType ,setInputType] = useState('password');
    const [newPassword, setNewPassword] = useState('');

    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const PasswordValidationSchema = Yup.object().shape({
        newPassword: Yup.string().min(6, "The password needs a minimum of 6 characters").required("Password is required")
    })

    useEffect(() => {
        const urlToken= searchParams.get('token');

        if(urlToken){
            setToken(urlToken);
        }else{
            navigate("/");
        }
    }, [searchParams])

    const handleSeePassword = () => {
        if(seePassword === seePassIcon){
            setSeePassword(unSeePassIcon);
            setInputType("text");
        }else if (seePassword === unSeePassIcon){
            setSeePassword(seePassIcon);
            setInputType("password");
        }
    }

    const handleRecoverPassword = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try{
            await PasswordValidationSchema.validate({newPassword}, {abortEarly: false});

            try{
                const formData ={
                    token: token,
                    newPassword: newPassword
                };

                const response = await axios.put("http://localhost:8080/resetPassword", formData);
                setSuccess(response.data.success);

                setTimeout(() => {
                    navigate("/")
                }, 3000)

            }catch(e){
                if (e.response && e.response.data && e.response.data.error) {
                setError(e.response.data.error);
                } else {
                setError("An error occurred. Please try again.");
                }
            }

        }catch(validationErrors){
            setError(validationErrors.errors.join(", "));
        }
    }


    return(
        <div>
            <div className="flex items-center justify-center">
                <img src={passwordIcon}
                className="w-[40px] h-[40px] mr-2" />
                <h1 className="text-center text-3xl my-6">Recover Password</h1>
            </div>
            <form className="flex flex-col items-center justify-center">
                <label htmlFor="newPassword" 
                className="flex items-center border-solid border-2 border-greenMain rounded-[6px] hover:border-cyan-600 mt-3">
                    <img className='w-[30px] h-[30px] mx-3 cursor-pointer'
                    src={newPasswordIcon} alt="padlock icon"/>
                    <input name={"newPassword"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    id="newPassword"
                    type={inputType}
                    placeholder="Your new password"
                    className="bg-transparent w-[55vw] sm:w-[100%] h-[60px] md:h-[55px] text-[16px] pl-4 focus:outline-none"
                    />
                    <img className='w-[33px] h-[33px] mx-3 cursor-pointer'
                    src={seePassword} alt="eye icon to see password"
                    onClick={handleSeePassword}
                    />
                </label>
                <div className="flex flex-col items-center mt-6">
                    <button onClick={handleRecoverPassword}
                    className="text-white font-medium w-[180px] h-[40px] bg-greenMain hover:bg-[#30b6ad] rounded-md text-xl hover:bg-lightRed mb-2">Edit password</button>
                    <p className="text-center text-xl text-red-700"></p>
                </div>
                <p className='mt-2 text-2xl font-bold text-red-800 text-center m-2'>{error}</p>
                <p className='mt-2 text-2xl font-bold text-blue-800 text-center m-2'>{success}</p>
            </form>   
        </div>
    )
}

export default RecoverPassword;