import {useState, useRef, useEffect} from 'react'
import "./VolumeBar.css"
import { BsFillVolumeUpFill } from "react-icons/bs";
import {BsVolumeMuteFill} from "react-icons/bs";

function VolumeBar({audioRef, iconStyle, volumeStyle, volume, setVolume}) {
    const volumeRef = useRef()

    const [cursorPosition, setCursorPosition] = useState({ left: 0 })
    const [seekerVolume, setSeekerVolume] = useState("")
    const [isHover, setIsHover] = useState(false)
    
    const checkVolume = (e)=>{
        let width = volumeRef.current.clientWidth
        const offset = e.nativeEvent.offsetX
        const divprogress = offset / width * 100;
        setSeekerVolume(Math.round(divprogress)+ "%")

        let bounds = volumeRef.current.getBoundingClientRect()
        let x = e.clientX - bounds.left;
        setCursorPosition({ left: x});
    }

    const checkWidth = (e)=>{
        let width = volumeRef.current.clientWidth
        const offset = e.nativeEvent.offsetX
        const divprogress = offset / width * 100;
        const vol =  (divprogress / 100).toFixed(2)

        setVolume(divprogress)
        audioRef.current.volume = vol
    }

    useEffect(()=>{
        audioRef.current.volume = (volume / 100).toFixed(2)
    },[volume, audioRef])


    return (
        <>
            { volume === 0 ?
                (<button 
                className="noStyleButton"
                onClick={()=>{setVolume(50)}}
                >
                    <BsVolumeMuteFill style={iconStyle}/>
                </button>):
                (<button 
                className="noStyleButton"
                onClick={()=>{setVolume(0)}}
                >
                    <BsFillVolumeUpFill style={iconStyle}/>
                </button>)                                
            }

            <div 
                className="volumeBar__gray"
                ref={volumeRef} 
                onMouseEnter={()=>{setIsHover(true)}} 
                onMouseLeave={()=>{setIsHover(false)}} 
                onMouseMove={(e)=>checkVolume(e)} 
                onClick={checkWidth} 
            >
                    { isHover &&
                        <div 
                            onMouseEnter={()=>{setIsHover(false)}} 
                            style={cursorPosition} 
                            className="volumeBar__volume"
                        >
                            {seekerVolume}
                        </div>
                    }
                <div style={volumeStyle} className="volumeBar__progress"></div>
            </div>
        </>
    )
}

export default VolumeBar