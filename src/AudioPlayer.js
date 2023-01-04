import {useState, useEffect} from 'react'

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
            setAudioFile(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    function playFile(){
        const snd = new Audio(audioFile)
        snd.play()
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
            >click me</button>
        </div>
    )
}

export default AudioPlayer