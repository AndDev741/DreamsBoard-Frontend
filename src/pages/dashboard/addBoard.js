import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function AddBoard(){
    const {t} = useTranslation();

    return(
        <Link to={'/newBoard'}>
            <div className={`w-[90vw] h-[240px] md:w-[500px] border-dashed border-[#2C9C94] border-2 rounded-[6px] my-8 cursor-pointer lg:mx-10`}>
                <div className="flex items-center justify-center w-full h-full bg-[#3CE5D9] hover:bg-[#3cd8ce] ">
                    <h1 className="text-3xl font-bold text-center">{t('AddDreamBoard')}</h1>
                </div>
            </div>
        </Link>
    )
}

export default AddBoard;