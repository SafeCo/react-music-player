import {useState, useRef, useEffect} from 'react'
import "./VolumeBar.css"
import { BsFillVolumeUpFill } from "react-icons/bs";
import {BsVolumeMuteFill} from "react-icons/bs";

function VolumeBar({audioFile, iconStyle, volumeStyle, volume, setVolume}) {
    const volumeRef = useRef()
    

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

    useEffect(()=>{
        audioFile.volume = (volume / 100).toFixed(2)
    },[volume])


    return (
        <div className="volumeBar__container">
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

            <div ref={volumeRef} data-name="volumeSeeker"  onClick={checkWidth} className="volumeBar__gray">
                <div style={volumeStyle} className="volumeBar__progress"></div>
            </div>
        </div>
    )
}

export default VolumeBar