function Board({background_img, title}){
    return(
        <div className="w-[90vw] h-[240px] md:w-[500px] border-dashed border-redFont border-2 rounded-[6px] my-8 cursor-pointer mx-4">
            <div className={`flex items-center justify-center w-full h-full bg-[#D9D5A7] hover:bg-[#D9AB91] bg-cover`}
            style={{backgroundImage: background_img ? `url(${background_img})` : null}}>
            </div>
            <h1 className="text-2xl lg:text-3xl text-center text-redFont font-black underline mt-2">{title}</h1>
        </div>
    )
}

export default Board;