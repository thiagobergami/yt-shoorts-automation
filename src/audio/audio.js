const editVideo = require('../video/editVideo')
const { TextToSpeechClient } = require("@google-cloud/text-to-speech");

const googleClient = new TextToSpeechClient();

const getAudioDuration = async (mp3FilePath) => {
    return new Promise((resolve, reject) => {
        mp3Duration(mp3FilePath, (err, duration) => {
            if (err) {
                reject(err);
            } else {
                resolve(duration);
            }
        });
    });
}

const cutBackgroundAudios = async (duration) => {
    return new Promise((res, rej) => {
        ffmpeg()
            .input('./audios/reference/01.mp3')
            .setStartTime(0)
            .setDuration(duration)
            .audioCodec('copy') // Copy the audio without re-encoding
            .output('./audios/buffer/background.mp3')
            .on('end', () => {
                console.log('Audio cutting completed.');
                res()
            })
            .on('error', (err) => {
                console.error('Error:', err);
                rej()
            })
            .run();
    })
}

const audioGenerator
    = async (formatedText) => {
        let counter = 1;
        for (const element of formatedText) {
            if (element !== null || element !== '' || element.length !== 0 || element.trim() !== '') {
                const request = {
                    input: { text: element },
                    voice: {
                        languageCode: 'en-US',
                        name: 'en-US-Studio-M',
                        ssmlGender: 'MALE',
                    },
                    audioConfig: { audioEncoding: 'MP3' },
                }

                const [response] = await client.synthesizeSpeech(request);
                // Write the binary audio content to a local file
                const mp3FilePath = `audios/speechs/voice-${counter}.mp3`

                const writeFile = util.promisify(fs.writeFile);
                await writeFile(mp3FilePath, response.audioContent, 'binary');
                console.log(`Audio content written to file: voice-${counter}.mp3`);
                await editVideo(mp3FilePath, counter);
                counter++;
            }
        }
    }

module.exports = { getAudioDuration, audioGenerator, cutBackgroundAudios }