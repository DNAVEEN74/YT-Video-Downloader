import yt_dlp as ytdlp
import sys

def download_video(video_url):
    print(f'Downloading video from URL: {video_url}')
    
    ydl_opts = {
        'format': 'mp4',
        'noplaylist': True,  # Ensure only single video is downloaded
        'outtmpl': '-',      # Output to stdout
    }
    
    with ytdlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('No video URL provided')
        sys.exit(1)
    
    video_url = sys.argv[1]
    download_video(video_url)
