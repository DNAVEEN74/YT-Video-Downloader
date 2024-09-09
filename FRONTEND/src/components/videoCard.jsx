import { useRecoilValue } from "recoil"
import { videoObj } from "../atoms"
import '../App.css'

export default function VideoCard () {
    const videoData = useRecoilValue(videoObj);

    function convertTimeFormat(durationString){
        const match = durationString.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

        const hours = parseInt(match?.[1] || 0, 10);
        const minutes = parseInt(match?.[2] || 0, 10);
        const seconds = parseInt(match?.[3] || 0, 10);

        const formattedTime = 
        (hours > 0 ? `${hours}:h` : "") + 
        `${minutes.toString().padStart(2, '0')}m:` + 
        `${seconds.toString().padStart(2, '0')}s`;

        return formattedTime;
    }

    return (
        <div className="video-container">
            {videoData.thumbnail && <img className="thumbnail" src={videoData.thumbnail} alt="video Thumbnail" />}
            {videoData.title && <h4 className="video-title" >{videoData.title}</h4>}
            {videoData.duration && <h6 className="video-duration" >Duration: {convertTimeFormat(videoData.duration)}</h6>}
            {videoData.videoUrl && (
                <a className="download-button" href={`http://localhost:3000/download?video=${videoData.videoUrl}&title=${videoData.title}`} download="video.mp4">Download Video</a>

            )}
        </div>
    );
} 