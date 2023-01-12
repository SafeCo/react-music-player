
import {useState,  useRef} from 'react'
import "./SeekerBar.css"

function SeekerBar({toHoursAndMinutes, audioRef, progress}) {

    const seekerRef = useRef()

    const [cursorPosition, setCursorPosition] = useState({ left: 0 })
    const [seekerTime, setSeekerTime] = useState("")
    const [isHover, setIsHover] = useState(false)

    const barStyle = {
        width : progress + "%",
        backgroundColor: "green",
    }

    const checkWidth = (e)=>{
        let width = seekerRef.current.clientWidth
        const offset = e.nativeEvent.offsetX
        const divprogress = offset / width * 100;
        audioRef.current.currentTime = divprogress / 100 * audioRef.current.duration
    }

    const checkTime = (e)=>{
        let width = seekerRef.current.clientWidth
        const offset = e.nativeEvent.offsetX
        const divprogress = offset / width * 100;
        const time = divprogress / 100 * audioRef.current.duration
        setSeekerTime(toHoursAndMinutes(Math.floor(time)))

        let bounds = seekerRef.current.getBoundingClientRect()
        let x = e.clientX - bounds.left;
        setCursorPosition({ left: x});
    }

    return (
        <div className="seekerBar__container">
                <div 
                    className="seekerBar__gray"
                    ref={seekerRef} 
                    onMouseEnter={()=>{setIsHover(true)}} 
                    onMouseLeave={()=>{setIsHover(false)}} 
                    onMouseMove={(e)=>checkTime(e)} 
                    onClick={checkWidth} 
                >
                    <div style={barStyle} className="seekerBar__progress">
                    { isHover &&
                        <div 
                            onMouseEnter={()=>{setIsHover(false)}} 
                            style={cursorPosition} 
                            className="seekerBar__time"
                        >
                            {seekerTime}
                        </div>
                    }
                    </div>
                </div>
        </div>
    )
}

export default SeekerBar