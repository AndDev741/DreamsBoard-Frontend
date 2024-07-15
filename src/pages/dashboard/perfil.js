import settingsIcon from '../../assets/settingsIcon.png';

function Perfil(){
    return(
        <div>
            <div className='flex items-center justify-between pt-5'>
                <div className="flex flex-col justify-center">
                    <div className="flex items-center ml-3">
                        <img alt='Profile pic'
                        className="w-[66px] rounded-full"
                        src="https://i.pinimg.com/564x/e0/87/7c/e0877c5fbec4d096a4334a09bbe25ef5.jpg" />
                        <div className="ml-3">
                            <h2 className="text-xl text-redFont font-black">Bom dia André Luiz</h2>
                            <p className='text-redFont font-medium'>Be your best version</p>
                        </div>
                    </div>
                </div>
                <div>
                    <img 
                    className='w-[30px] absolute top-5 right-5 cursor-pointer'
                    alt='Settings icon'
                    src={settingsIcon} />
                </div>
            </div>
            <div className='mt-4 w-full border-solid border-[1px] border-redFont'></div>
        </div>
    
    )
}

export default Perfil;