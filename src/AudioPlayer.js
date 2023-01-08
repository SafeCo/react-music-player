import {useState, useEffect, useRef} from 'react'
import "./AudioPlayer.css"

function AudioPlayer() {

    const clickRef = useRef()
    const volumeRef = useRef()


    const [audioFile, setAudioFile] = useState({})
    const [audioLength, setAudioLength] = useState("")
    const [audioTime, setAudioTime] = useState("")
    const [progress, setProgress] = useState("")
    const [volume, setVolume] = useState("")
    const [cursorPosition, setCursorPosition] = useState({ left: 0 })


    const barStyle = {
        width : progress + "%",
        backgroundColor: "green",

    }
    const volumeStyle = {
        width : volume + "%",
        backgroundColor: "red",

    }

   
    const addFile = (e) => {
        if (e.target.files[0]) {
            // setAudioFile(URL.createObjectURL(e.target.files[0]));
            getBase64(e.target.files[0]);
        }
    };

    // useEffect(()=>{
    //     console.log(audioLength)
    // },[audioLength])

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

    // const checkWidth = (e)=>{
    //     let width = clickRef.current.clientWidth
    //     const offset = e.nativeEvent.offsetX
    //     const divprogress = offset / width * 100;
    //     audioFile.currentTime = divprogress / 100 * audioLength
    // }

    const checkWidth = (e)=>{
        const name = e.currentTarget.getAttribute("data-name")
        if (name === "timeSeeker"){
            let width = clickRef.current.clientWidth
            const offset = e.nativeEvent.offsetX
            const divprogress = offset / width * 100;
            audioFile.currentTime = divprogress / 100 * audioLength
            
        }else if( name === "volumeSeeker"){
            let width = volumeRef.current.clientWidth
            const offset = e.nativeEvent.offsetX
            const divprogress = offset / width * 100;
            const vol =  (divprogress / 100).toFixed(2)

            setVolume(divprogress)
            audioFile.volume = vol
        }
        
    }

    const checkTime = (e)=>{
        let width = clickRef.current.clientWidth
        const offset = e.nativeEvent.offsetX
        const divprogress = offset / width * 100;
        const time = divprogress / 100 * audioLength
        console.log(Math.floor(time))
        setCursorPosition({ left: e.screenX });

    }







    function playFile(){
        audioFile.play()
    }

    function pauseFile(){
        audioFile.pause()
    }

    function addTen(){
        audioFile.currentTime= audioTime + 10
    }
    function minusTen(){
        audioFile.currentTime= audioTime - 10
    }


    function volumeUp(){
        if(audioFile.volume === 1){
            return
        }else{
            audioFile.volume = (audioFile.volume.toFixed(2) * 100 + 0.1.toFixed(2) * 100) / 100 
        }
    }

    function volumeDown(){
        console.log(audioFile.volume)
        if(audioFile.volume === 0){
            return
        }else{
            audioFile.volume = (audioFile.volume.toFixed(2) * 100 - 0.1.toFixed(2) * 100) / 100 
        }

    }
    

    return (
        <div>
            <h1>Working</h1>
            <input
                type="file"
                onChange={e=>addFile(e)}
            />
            <div className="seekerBar__container">
                <div ref={clickRef} data-name="timeSeeker" onMouseMove={(e)=>checkTime(e)} onClick={checkWidth} className="seekerBar__gray">
                    <div style={barStyle} className="seekerBar__progress">
                        <div className="seekerBar__ball"></div>
                        <div style={cursorPosition} className="seekerBar__time"></div>
                    </div>
                </div>
                <div ref={volumeRef} data-name="volumeSeeker"  onClick={checkWidth} className="seekerBar__gray">
                    <div style={volumeStyle} className="seekerBar__progress">
                        <div className="seekerBar__ball"></div>
                    </div>
                </div>
            </div>

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

            <button
            onClick={()=>{addTen()}}
            > + 10
            </button>

            <button
            onClick={()=>{minusTen()}}
            > - 10
            </button>

            <button
            onClick={()=>{volumeUp()}}
            > volume up
            </button>

            <button
            onClick={()=>{volumeDown()}}
            > volume down
            </button>

        </div>
    )
}

export default AudioPlayer