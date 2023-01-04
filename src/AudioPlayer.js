import {useState, useEffect} from 'react'

function AudioPlayer() {
    const [audioFile, setAudioFile] = useState({})
    const addFile = (e) => {
        if (e.target.files[0]) {
            setAudioFile(URL.createObjectURL(e.target.files[0]));
        }
    };

    useEffect(()=>{
        console.log(audioFile)
    },[audioFile])

    return (
        <div>
            <h1>Working</h1>
            <input
                type="file"
                onChange={e=>addFile(e)}
            />
            <audio controls autoPlay>
                <source src='' />
            </audio>
        </div>
    )
}

export default AudioPlayer