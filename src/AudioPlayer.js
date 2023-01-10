import {useState, useRef} from 'react'
import "./AudioPlayer.css"
import SeekerBar from './SeekerBar'
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsFillPauseCircleFill } from "react-icons/bs";
import { GrForwardTen } from "react-icons/gr"
import { GrBackTen } from "react-icons/gr"
import speaker from "./speaker.svg"

function AudioPlayer() {

    const volumeRef = useRef()

    const [audioName, setAudioName] = useState("")
    const [audioFile, setAudioFile] = useState({})
    const [audioLength, setAudioLength] = useState("")
    const [audioTime, setAudioTime] = useState("")

    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState("")
    const [volume, setVolume] = useState("")


    const volumeStyle = {
        width : volume + "%",
        backgroundColor: "red",

    }


    const addFile = (e) => {
        if (e.target.files[0]) {
            // setAudioFile(URL.createObjectURL(e.target.files[0]));
            const fileName = e.target.files[0].name.replace(/\.[^/.]+$/, "")
            setAudioName(fileName)
            getBase64(e.target.files[0]);
        }
    };

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const audio = new Audio(reader.result)

            audio.addEventListener("loadedmetadata", ()=>{setAudioLength(audio.duration)})
            audio.addEventListener('timeupdate', (event) => {
                setAudioTime(audio.currentTime);
                setProgress(audio.currentTime / audio.duration * 100 )
            });

            setAudioFile(audio);

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }


    const checkWidth = (e)=>{
        const name = e.currentTarget.getAttribute("data-name")
        if( name === "volumeSeeker"){
            let width = volumeRef.current.clientWidth
            const offset = e.nativeEvent.offsetX
            const divprogress = offset / width * 100;
            const vol =  (divprogress / 100).toFixed(2)

            setVolume(divprogress)
            audioFile.volume = vol
        }
        
    }
    function toHoursAndMinutes(totalSeconds) {
        const totalMinutes = Math.floor(totalSeconds / 60);

        const seconds = (totalSeconds % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        const hours = (Math.floor(totalMinutes / 60)).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        const minutes = (totalMinutes % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });

        const time = hours + ":" + minutes + ":" + seconds

        return time ;
    }






    function playFile(){
        audioFile.play()
        setIsPlaying(!isPlaying)
    }

    function pauseFile(){
        audioFile.pause()
        setIsPlaying(!isPlaying)
    }

    function addTen(){
        audioFile.currentTime= audioTime + 10
    }
    function minusTen(){
        audioFile.currentTime= audioTime - 10
    }


    return (
        <div className="audioPlayer__container">

            <div className="audioPlayer__image">
                <img src={speaker} />
            </div>

            {audioName}

            <div className="audioTime__container">
            
                    <div>{toHoursAndMinutes(Math.floor(audioTime))}</div>
                    <SeekerBar 
                        toHoursAndMinutes={toHoursAndMinutes} 
                        audioFile={audioFile}
                        audioLength={audioLength}
                        progress={progress}
                    />
                    <div>{toHoursAndMinutes(Math.floor(audioLength))}</div>
            </div>

            <div className="audioPlayer__button-container">
                <button
                onClick={()=>{minusTen()}}
                >
                    <GrBackTen/>
                </button>

                { isPlaying?
                    (
                        <button
                        className="audioPlayer__pause-button"
                        onClick={()=>{pauseFile()}}
                        >
                            <BsFillPauseCircleFill/>
                        </button>
                    ) :
                    (   
                        <button
                        className="audioPlayer__play-button"
                        onClick={()=>{playFile()}}
                        >
                            <BsFillPlayCircleFill />
                        </button>
                    )
                }

                <button
                onClick={()=>{addTen()}}
                > 
                    <GrForwardTen/>
                </button>

                
            </div>

            <input
                type="file"
                onChange={e=>addFile(e)}
            />

            <div className="volumeBar__container">
                <div ref={volumeRef} data-name="volumeSeeker"  onClick={checkWidth} className="volumeBar__gray">
                    <div style={volumeStyle} className="volumeBar__progress">
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AudioPlayer