import { useState } from "react"
import { useSetRecoilState } from "recoil";
import { videoObj } from "../atoms";
import axios from "axios"
import VideoCard from "./videoCard";
import '../App.css'

export default function Body () {
    const [inputUrl, setInputUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [enable, setEnable] = useState(false);
    const setVideo = useSetRecoilState(videoObj);

    function handleInput (e) {
        setInputUrl(e.target.value);
    }

    async function handleSearch (){
        try {
            setLoading(true);

            const link = {
                url:inputUrl
            }

            const response = await axios.post('http://localhost:3000/video', link);
            const { video, title, duration, thumbnail, videoId } = response.data;

            setEnable(true);
            setLoading(false);
    
            setVideo({
                videoUrl: video,
                title: title,
                duration: duration,
                thumbnail: thumbnail,
                videoId: videoId
            }); 
            

        }catch (error) {
            console.log("Error in fetching the the video:", error);
            setLoading(false);
        }
    }

    return (
        <div>
        <div className="body-container" >
          <h3>Download Videos from Youtube</h3>
          <div className="input-container">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter YouTube URL"
              onChange={handleInput}
            />
            <button type="button" className="submit-btn" onClick={handleSearch}>
              <i className="arrow-icon">→</i>
            </button>
          </div>
        </div>
        </div>
            {loading && <div>Loading...</div>}
            {enable && !loading && <VideoCard />}
        </div>
      );
}