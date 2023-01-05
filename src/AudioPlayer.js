import {useState, useEffect} from 'react'
import "./AudioPlayer.css"

function AudioPlayer() {
    const [audioFile, setAudioFile] = useState({})
    const addFile = (e) => {
        if (e.target.files[0]) {
            // setAudioFile(URL.createObjectURL(e.target.files[0]));
            getBase64(e.target.files[0]);
        }
    };


    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setAudioFile(new Audio(reader.result));
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    function playFile(){
        audioFile.play()
        console.log(audioFile.duration)
        // const snd = new Audio(audioFile)
        // snd.play()
    }
    function pauseFile(){
        audioFile.pause()
        // const snd = new Audio(audioFile)
        // snd.play()
    }

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

            <button
            onClick={()=>{playFile()}}
            >play
            </button>
            <button
            onClick={()=>{pauseFile()}}
            >pause
            </button>
        </div>
    )
}

export default AudioPlayer