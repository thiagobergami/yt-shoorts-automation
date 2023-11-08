# Node.js YouTube Shorts Video Automation Project

This Node.js project aims to automate the creation of YouTube Shorts videos by utilizing various AI and video editing tools. The process involves the generation of a script, voice creation, video editing, subtitle generation, and SEO-friendly description generation. Here's an overview of each step:

## Project Overview

### 1. Script Generation using ChatGPT-4
   - We use ChatGPT-4, a powerful natural language generation model, to create a script for the YouTube Short video. This script serves as the foundation for the video's content.

### 2. Voice Creation with Google Cloud Text-to-Speech
   - The script is then transformed into an engaging narration using Google Cloud Text-to-Speech. This step converts the text script into a lifelike voice, adding a human touch to the video.

### 3. Video Editing using Node.js and FFmpeg
   - Node.js and FFmpeg are employed to edit and assemble the video. This includes adding visuals, transitions, and incorporating the generated voiceover to create an engaging YouTube Short video.

### 4. Subtitle Generation with CapCut
   - Subtitles are an essential part of YouTube Shorts. We use CapCut to generate and add subtitles to the video, making it more accessible and engaging for a broader audience.

### 5. SEO-Friendly Description Generation using ChatGPT-4
   - To maximize the video's discoverability, we utilize ChatGPT-4 to generate an SEO-friendly description for the video. This description is optimized for search engines and helps improve the video's ranking on YouTube.

## Project Requirements

To get started with this project, you'll need the following:

- Node.js: Make sure you have Node.js installed on your system.
- FFmpeg: Install FFmpeg for video editing capabilities.
- Google Cloud Text-to-Speech: Set up Google Cloud services for text-to-speech conversion.
- CapCut: Use CapCut for subtitle generation and editing.
- ChatGPT-4: Access to ChatGPT-4 for script generation and description creation.

## How to Use

1. Clone this repository to your local machine.
2. Install the required Node.js packages and dependencies using `npm install`.
3. Set up your Google Cloud Text-to-Speech credentials for voice creation.
4. Ensure that FFmpeg is correctly configured on your system for video editing.
5. Use ChatGPT-4 to generate a script and an SEO-friendly video description(`.src/chatGPT/longText.js`).
6. Execute the Node.js script to automate the video creation process.

## Acknowledgments

- ChatGPT-4, Google Cloud Text-to-Speech, FFmpeg, and CapCut for their respective functionalities.
- The open-source community for their contributions to Node.js and other project dependencies.

By following this project, you can streamline the creation of YouTube Shorts videos, making the process more efficient and engaging for your audience.

