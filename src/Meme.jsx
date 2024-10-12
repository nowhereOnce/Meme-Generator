import React, { useEffect, useState } from 'react'

function Meme() {

    // Estado con la data del API de memes.
    // data será un arreglo de objetos
    const [data, setData] = useState([])
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        url: "http://i.imgflip.com/1bij.jpg"
    })

    //Effect (sideEffect) para realizar la solicitud del API
    //DESPUÉS de haber renderizado el componente
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then((response) => response.json())
        .then((jsonData) => {
            setData(jsonData.data.memes)
        })
    }, [])  // [] para que se ejecute solo una vez cuando el componente se monta

    function getURL() {
        const indiceAleatorio = Math.floor(Math.random() * data.length);
        setMeme(prevMeme => ({
            ...prevMeme,
            url: data[indiceAleatorio].url
        })) 
    }

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme =>({
            ...prevMeme,
            [name] : value
        }))
    }


    return(
        <div className='meme-container'>
            <div className="form-grid">
                <input 
                    type="text" 
                    placeholder="Top Text"
                    value={meme.topText}
                    onChange={handleChange}
                    name='topText'
                />
                <input 
                    type="text"
                    placeholder="Bottom Text"
                    value={meme.bottomText}
                    onChange={handleChange}
                    name='bottomText'
                />
                <button onClick={getURL}>Get a new Meme</button>
            </div>
            
            <div className='meme-with-text'>
                <p className='top-text'>{meme.topText}</p>
                <img src={`${meme.url}`} alt="meme_img" className='meme' />
                <p className='bottom-text'>{meme.bottomText}</p>
            </div>
        </div>
    )
}

export default Meme