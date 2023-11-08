const ffmpeg = require('fluent-ffmpeg')

const { cutBackgroundAudios } = require('../audio/audio')

const inputDirectory = './videos/buffer/'; // Directory containing your .mp4 files
const outputVideo = 'output.mp4'; // Output video file

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

const addBackgroundAudio = async () => {
    const videoDuration = await getVideoDuration('./videos/output/output.mp4');

    await cutBackgroundAudios(videoDuration);
    const musicVolume = 0.5
    return new Promise((res, rej) => {
        ffmpeg()
            .input('./videos/output/output.mp4')
            .input('../audio/audios/buffer/background.mp3')
            .audioCodec('aac')
            .videoCodec('libx264')
            .outputOptions('-strict experimental')
            .complexFilter([
                `[1:a]volume=${musicVolume}[music];[0:a][music]amix=inputs=2:duration=first:dropout_transition=2`
            ])
            .output('./videos/output/final.mp4')
            .on('end', () => {
                console.log('Finished adding background sound to video.');
                res()
            })
            .on('error', (err) => {
                console.error('Error:', err);
                res()
            })
            .run();
    })
}

const joinVideos = async () => {
    // Get a list of all .mp4 files in the input directory
    const videoFiles = fs.readdirSync(inputDirectory).filter((file) => file.endsWith('.mp4'));

    videoFiles.sort((a, b) => {
        const aNumber = parseInt(a.replace('video-', '').replace('.mp4', ''), 10);
        const bNumber = parseInt(b.replace('video-', '').replace('.mp4', ''), 10);
        return aNumber - bNumber;
    });

    const ffmpegCommand = ffmpeg();
    videoFiles.forEach((videoFile) => {
        ffmpegCommand.input(path.join(inputDirectory, videoFile));
    });

    return new Promise((res, rej) => {
        ffmpegCommand
            .on('end', () => {
                console.log('Joining finished.');
                res();
            })
            .on('error', (err) => {
                console.error('Error:', err);
                rej();
            })
            .mergeToFile(`videos/output/${outputVideo}`, inputDirectory);
    })
}


module.exports = { joinVideos, addBackgroundAudio }