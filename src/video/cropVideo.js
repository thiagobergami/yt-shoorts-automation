const ffmpeg = require('fluent-ffmpeg')

const cropVideo = async () => {
    return new Promise((res, res) => {
        const cropWidth = 1080;
        const cropHeight = 1920;

        ffmpeg()
            .input('./videos/output/final.mp4')
            .videoFilter(`crop=${cropWidth}:${cropHeight}:(iw-${cropWidth})/2
          :0`)
            .videoBitrate(bitrate)
            .output('./videos/output/final-edited.mp4')
            .on('end', () => {
                console.log('Conversion finished.');
                res()
            })
            .on('error', (err) => {
                console.error('Error:', err);
                rej()
            })
            .run();
    })
}

module.exports = cropVideo