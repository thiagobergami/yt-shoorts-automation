const runChatGPT = require('./chatGPT/chatGPT')
const { audioGenerator } = require('./audio/audio');
const { joinVideos, addBackgroundAudio } = require('./video/joinVideo');
const cropVideo = require('./video/cropVideo');

require('dotenv').config()

const run = async () => {
    try {
        const formatedText = await runChatGPT();
        await audioGenerator(formatedText);
        await joinVideos();
        await addBackgroundAudio();
        await cropVideo();
    } catch (error) {
        console.log(`error: ${error}`)
    }
};

; (async () => {
    await run();
})();