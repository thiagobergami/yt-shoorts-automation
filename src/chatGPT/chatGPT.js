const { ChatGPTAPI } = require('chatgpt')
const longText = require('./longText.js')

require('dotenv').config()

const chatGPT = new ChatGPTAPI({
  apiKey: process.env.CHAT_GPT_API_KEY,
  completionParams: {
    model: 'gpt-4-0314',
    temperature: 0.7,
    top_p: 1
  }
})

const runChatGPT = async () => {
  try {
    const res = await chatGPT.sendMessage(longText)
    const formatedText = res.text.replace(/"/g, '').split('\n').map(line => line.replace(/\n/g, '')).filter((item) => {
      return item !== "";
    });

    /* Diversifying the order of the first fact */
    const shouldChangePosition = Math.floor(Math.random() * 2);
    if (shouldChangePosition == 1) {
      const temp = formatedText[0];
      formatedText[0] = formatedText[1];
      formatedText[1] = temp
    }

    console.log('ChatGPT Created');
    return formatedText
  } catch (error) {
    console.log('ChatGPT not created');
    throw new Error(error)
  }
}

module.exports = runChatGPT