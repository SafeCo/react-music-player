import { useState, useEffect } from "react"
import AudioPlayer from "./AudioPlayer";
import "./App.css"
import {songsdata} from "./SongsData"


function App() {
  const [songsList , setSongsList] = useState()

  useEffect(()=>{
    setSongsList(songsdata.map((song)=>{
        return song
    }))
  },[])


  const addFile = (e) => {
    if (e.target.files[0]) {
        const fileName = e.target.files[0].name.replace(/\.[^/.]+$/, "")
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setSongsList([...songsList, {
              title : fileName,
              url: reader.result
            }])
        };
          reader.onerror = function (error) {
              console.log('Error: ', error);
          };
        }
  };

  return (
    <div className="App">
      <div  className="background">
        <div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
      { songsList &&
        <AudioPlayer songsList={songsList} addFile={addFile}/>
      }
    </div>
  );
}

export default App;
