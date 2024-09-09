const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const { spawn } = require('child_process');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.post('/video', async (req, res) => {
  const link = req.body;
  const apiKey = process.env.API_KEY;

  try {
    const urlObj = new URL(link.url);
    let videoID;

    if (urlObj.hostname === 'youtu.be') {
      videoID = urlObj.pathname.split('/')[1];
    } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      const params = new URLSearchParams(urlObj.search);
      videoID = params.get('v');
    } else {
      return res.status(400).json({
        error: 'Invalid YouTube URL',
      });
    }

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=snippet,contentDetails,statistics&key=${apiKey}`);

    const videoData = response.data.items[0];

    const videoTitle = videoData.snippet.title;
    const videoDuration = videoData.contentDetails.duration;
    const videoThumbnail = videoData.snippet.thumbnails.default.url;
    const videoUrl = `https://www.youtube.com/watch?v=${videoID}`;

    res.status(200).json({
      video: videoUrl,
      title: videoTitle,
      duration: videoDuration,
      thumbnail: videoThumbnail,
      videoId: videoID,
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: 'Failed to fetch video information' });
  }
});

app.get('/download', (req, res) => {
  const videoLink = req.query.video;
  const title = req.query.title;

  if (!videoLink) {
    return res.status(400).json({ error: 'No video URL provided' });
  }

  const pythonScriptPath = path.join(__dirname, 'python', 'script.py');

  const pythonProcess = spawn('python', [pythonScriptPath, videoLink]);

  res.setHeader('Content-Disposition', `attachment; filename="${title}"`);
  res.setHeader('Content-Type', 'video/mp4');

  pythonProcess.stdout.pipe(res);

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to download video' });
    }
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0 && !res.headersSent) {
      console.error(`Python process exited with code ${code}`);
      res.status(500).json({ error: 'Failed to download video' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
