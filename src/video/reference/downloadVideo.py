from pytube import YouTube

video_url = ""

# Create a YouTube object
yt = YouTube(video_url)

# Get the highest resolution stream
stream = yt.streams.get_highest_resolution()

# Download the video
stream.download()

print("Download completed.")