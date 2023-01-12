import {useState, useRef, useEffect} from 'react'
import "./AudioPlayer.css"
import SeekerBar from './SeekerBar'
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsFillPauseCircleFill } from "react-icons/bs";
import {BiUpload} from "react-icons/bi"
import {MdOutlineForward5} from "react-icons/md"
import {MdOutlineReplay5} from "react-icons/md"
import {AiFillStepForward} from "react-icons/ai"
import {AiFillStepBackward} from "react-icons/ai"
import speaker from "./speaker.svg"
import VolumeBar from './VolumeBar';

function AudioPlayer({matches, mobile, songsList, addFile}) {

    const inputRef = useRef()
    const audioRef = useRef()

    const [audioDuration, setAudioDuration] = useState("")
    const [audioTime, setAudioTime] = useState("")
    const [currentSong, setCurrentSong] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(100)


    const volumeStyle = {
        width : volume + "%",
    }

    const iconStyle = {
        color: "white",
        fontSize: "2.5rem"
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



    function nextTrack (){
        const sLength = songsList.length -1
        if ( currentSong < sLength){
            setCurrentSong(currentSong + 1)
            setIsPlaying(false)
            setProgress(0)
        }
    }
    function prevTrack (){
        if ( currentSong > 0){
            setCurrentSong(currentSong - 1)
            setIsPlaying(false)
            setProgress(0)
        }
    }

    function playFile(){
        audioRef.current.play()
        setIsPlaying(!isPlaying)
    }

    function pauseFile(){
        audioRef.current.pause()
        setIsPlaying(!isPlaying)
    }

    function addFive(){
        audioRef.current.currentTime =  audioRef.current.currentTime + 5
    }
    function minusFive(){
        audioRef.current.currentTime =  audioRef.current.currentTime - 5
    }

    return (
        <div className="audioPlayer__container">

            <audio 
                ref={audioRef} 
                src={ songsList[currentSong].url }
                onLoadedMetadata={()=>{
                    setAudioDuration(audioRef.current.duration)
                }} 
                onTimeUpdate={()=>{ 
                    setProgress(audioRef.current.currentTime / audioRef.current.duration * 100 )
                    setAudioTime(audioRef.current.currentTime)
                    }
                }
            />


            <div className="audioPlayer__image">
                <img 
                    className="mainImageAnim" 
                    style={{ animationPlayState: isPlaying ? "running" : "paused" }}
                    src={speaker} 
                />
            </div>

            <div className="audioPlayer__name">
                {songsList[currentSong].title}
            </div>
            

            <div className="audioTime__container">
                { mobile &&
                    <div>{toHoursAndMinutes(Math.floor(audioTime))}</div>
                }
                    <SeekerBar 
                        toHoursAndMinutes={toHoursAndMinutes} 
                        audioRef={audioRef}
                        progress={progress}
                    />
                { mobile &&
                    <div>{toHoursAndMinutes(Math.floor(audioDuration))}</div> 
                }
                { !mobile &&
                    <div className="audioTime">
                    {toHoursAndMinutes(Math.floor(audioTime))} / {toHoursAndMinutes(Math.floor(audioDuration))}
                    </div>
                }
            </div>

            <div className="audioPlayer__controls-container">
                <div className="audioPlayer__controls-buttons">
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
                            onClick={()=>{prevTrack()}}
                        >
                            <AiFillStepBackward style={iconStyle}/>
                        </button>

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

                        <button 
                            className=" noStyleButton"
                            onClick={()=>{nextTrack()}}
                        >
                            <AiFillStepForward style={iconStyle}/> 
                        </button>    
                    </div>
                    { !matches &&
                        <div className="resp"></div>
                    }
                </div>
                
                <div className="volumeBar__container">
                        <VolumeBar 
                        audioRef={audioRef} 
                        iconStyle={iconStyle} 
                        volumeStyle={volumeStyle}
                        volume={volume} 
                        setVolume={setVolume}
                        />
                    
                </div>
                
            </div>
        </div>
    )
}

export default AudioPlayer