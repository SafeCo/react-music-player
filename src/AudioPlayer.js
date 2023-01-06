import {useState, useEffect, useRef} from 'react'
import "./AudioPlayer.css"

function AudioPlayer() {

    const clickRef = useRef()

    const [audioFile, setAudioFile] = useState({})
    const [audioLength, setAudioLength] = useState("")
    const [audioTime, setAudioTime] = useState("")
    const [progress, setProgress] = useState("")

    const barStyle = {
        width : progress+ "%",
    }

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
        let width = clickRef.current.clientWidth
        const offset = e.nativeEvent.offsetX
        const divprogress = offset / width * 100;
        audioFile.currentTime = divprogress / 100 * audioLength
    }

    const checkTime = ()=>{
        console.log(" working")
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
                <div ref={clickRef} onMouseEnter={checkTime} onClick={checkWidth} className="seekerBar__gray">
                    <div style={barStyle} className="seekerBar__progress">
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