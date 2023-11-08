const ffmpeg = require('fluent-ffmpeg')

const { getAudioDuration } = require('../audio/audio')

const getVideoDuration = async (mp4FilePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(mp4FilePath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        const durationInSeconds = metadata.format.duration;
        resolve(durationInSeconds);
      }
    });
  });
}

const formatVideoAudio = (mp3FilePath, counter) => {
  console.log(`adding audito to video-${counter}`);
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(`./noaudio/video-${counter}.mp4`)
      .input(mp3FilePath)
      .videoBitrate(bitrate)
      .output(`./buffer/video-${counter}.mp4`)
      .audioFilter({
        filter: 'volume',
        options: '1', // Adjust the volume of the first audio track to 50%
      })
      .on('end', () => {
        console.log('Audio processing completed.');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error:', err);
        reject()
      })
      .run();
  })
}

const cutVideo = async (startTime, duration, videoPath, counter) => {
  console.log(`cuting no-audio video-${counter}`);
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .setStartTime(formatTime(startTime))
      .setDuration(formatTime(duration))
      .noAudio()
      .videoBitrate(bitrate)
      .output(`./noaudio/video-${counter}.mp4`)
      .on('end', () => {
        console.log('Video cutting completed.');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error:', err);
        reject();
      })
      .run();
  })
}

const editVideo = async (mp3FilePath, counter) => {
  try {
    console.log(`starting edit video-${counter}`);
    const audioDuration = await getAudioDuration(mp3FilePath);
    const videoDuration = await getVideoDuration(videoPath);

    const startTime = Math.floor(Math.random() * videoDuration)
    const duration = audioDuration + 1

    await cutVideo(startTime, duration, videoPath, counter);
    await formatVideoAudio(mp3FilePath, counter);

  } catch (error) {
    console.log(`video-${counter}`);
    console.log("An error occurred when video was editted:", error);
    throw new Error(error)
  }
}

module.exports = editVideo