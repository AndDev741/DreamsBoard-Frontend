import { useTranslation } from "react-i18next";

function ChangeLanguage(){
    const {t, i18n} = useTranslation();
    let actualLanguage = i18n.language;
    function changeLanguage(lng) {
        i18n.changeLanguage(lng);
        console.log(i18n.language)
        
    }
    
    return(
        <div className="flex lg:absolute top-[65px] right-[20px] border-solid border-black border-2 rounded-md font-bold">
            <div onClick={() => changeLanguage('en')}
            className={`${actualLanguage === 'en' ? 'bg-greenMain text-white rounded-sm' : ''} p-3 cursor-pointer`}>
                <p>EN</p>
            </div>
            
            <div onClick={() => changeLanguage('pt')}
            className={`${actualLanguage === 'pt' || actualLanguage === 'pt-BR' ? 'bg-greenMain text-white rounded-sm' : ''} p-3 cursor-pointer`}>
                <p>PT</p>
            </div>
        </div>
    )
}

export default ChangeLanguage;