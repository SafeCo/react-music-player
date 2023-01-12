import {useState, useRef, useEffect} from 'react'
import "./AudioPlayer.css"
import SeekerBar from './SeekerBar'
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsFillPauseCircleFill } from "react-icons/bs";
import {BiUpload} from "react-icons/bi"
import {MdOutlineForward5} from "react-icons/md"
import {MdOutlineReplay5} from "react-icons/md"
import speaker from "./speaker.svg"
import VolumeBar from './VolumeBar';
import { songsdata } from './SongsData';

function AudioPlayer() {

    const inputRef = useRef()
    const audioRef = useRef()

    const [audioName, setAudioName] = useState("")
    const [audioFile, setAudioFile] = useState({})
    const [audioLength, setAudioLength] = useState("")
    const [audioTime, setAudioTime] = useState("")

    const [currentSong, setCurrentSong] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState("")
    const [volume, setVolume] = useState("")
    const [songsList, setSongsList] = useState([])

    useEffect(()=>{
        setSongsList(songsdata.map((song)=>{
            return song
        }))
    },[])

    // useEffect(()=>{
    //     console.log(songsList)
    // },[songsList])

    const volumeStyle = {
        width : volume + "%",
    }

    const iconStyle = {
        color: "white",
        fontSize: "2.5rem"
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
            //ADD TO SONGSLIST
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

    
    useEffect(()=>{
        const songUrl = songsList[currentSong].url
        const audio = new Audio(songUrl)
        audio.addEventListener("loadedmetadata", ()=>{setAudioLength(audio.duration)})
        audio.addEventListener('timeupdate', (event) => {
            setAudioTime(audio.currentTime);
            setProgress(audio.currentTime / audio.duration * 100 )
        });

        setAudioFile(audio);
    },[currentSong])

    

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
    useEffect(()=>{
        console.log(currentSong)
    },[currentSong])

    function nextTrack (){
        const sLength = songsList.length -1
        if ( currentSong < sLength){
            setCurrentSong(currentSong + 1)
        }
    }
    function prevTrack (){
        const sLength = songsList.length -1
        if ( currentSong > 0){
            setCurrentSong(currentSong - 1)
        }
    }

    function playFile(){
        audioFile.play()
        setIsPlaying(!isPlaying)
    }

    function pauseFile(){
        audioFile.pause()
        setIsPlaying(!isPlaying)
    }

    function addFive(){
        audioFile.currentTime= audioTime + 5
    }
    function minusFive(){
        audioFile.currentTime= audioTime - 5
    }


    return (
        <div className="audioPlayer__container">
        <button onClick={()=>{audioRef.current.play()}}>
            test
        </button>
        <button onClick={()=>{nextTrack()}}>
            forward
        </button>
        <button onClick={()=>{prevTrack()}}>
            prev
        </button>


            <div className="audioPlayer__image">
                <img src={speaker} />
            </div>

            <div className="audioPlayer__name">
                {audioName}
            </div>
            

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

                    <div className="audioPlayer__controls-container">
                        
                        <div className="uploadButton__container" >
                            <button
                            className="noStyleButton"
                            onClick={()=>{inputRef.current.click()}}
                            >
                                <BiUpload style={iconStyle}/> 
                            </button>

                            <input
                                style={{display: "none"}}
                                ref={inputRef}
                                type="file"
                                onChange={e=>addFile(e)}
                            />
                        </div>

                        <div className="audioPlayer__button-container">
                            <button
                            className="noStyleButton"
                            onClick={()=>{minusFive()}}
                            >
                                <MdOutlineReplay5 style={iconStyle} />
                            </button>

                            { isPlaying?
                                (
                                    <button
                                    className="audioPlayer__pause-button noStyleButton"
                                    onClick={()=>{pauseFile()}}
                                    >
                                        <BsFillPauseCircleFill style={iconStyle}/>
                                    </button>
                                ) :
                                (   
                                    <button
                                    className="audioPlayer__play-button noStyleButton"
                                    onClick={()=>{playFile()}}
                                    >
                                        <BsFillPlayCircleFill style={iconStyle} />
                                    </button>
                                )
                            }

                            <button
                            className="noStyleButton"
                            onClick={()=>{addFive()}}
                            > 
                                <MdOutlineForward5 style={iconStyle} />
                            </button>

                            
                        </div>
                        <VolumeBar 
                            audioFile={audioFile} 
                            iconStyle={iconStyle} 
                            volumeStyle={volumeStyle}
                            volume={volume} 
                            setVolume={setVolume}
                        />

            </div>


        </div>
    )
}

export default AudioPlayer