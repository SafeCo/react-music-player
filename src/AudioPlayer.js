import {useState, useEffect, useRef} from 'react'
import "./AudioPlayer.css"

function AudioPlayer() {


    const [audioFile, setAudioFile] = useState({})
    const [audioLength, setAudioLength] = useState("")
    const [audioTime, setAudioTime] = useState("")


    const addFile = (e) => {
        if (e.target.files[0]) {
            // setAudioFile(URL.createObjectURL(e.target.files[0]));
            getBase64(e.target.files[0]);
        }
    };

    useEffect(()=>{
        console.log(audioLength)
    },[audioLength])

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const audio = new Audio(reader.result)
            audio.addEventListener("loadedmetadata", ()=>{setAudioLength(audio.duration)})
            setAudioFile(audio);
            audio.addEventListener('timeupdate', (event) => {
                setAudioTime(audio.currentTime);
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }





    function playFile(){
        audioFile.play()
    }

    function pauseFile(){
        audioFile.pause()
    }

    

    return (
        <div>
            <h1>Working</h1>
            <input
                type="file"
                onChange={e=>addFile(e)}
            />
            <div>{audioLength}</div>
            <div>{audioTime}</div>

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