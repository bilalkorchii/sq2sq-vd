from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import tempfile
import os
import ffmpeg

from summarize import summarize_audio
from sentiment import sentiment_analysis
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/summarize")
async def summarize_endpoint(file: UploadFile = File(...)):
    with tempfile.TemporaryDirectory() as tmpdir:
        # Save uploaded video file
        video_path = os.path.join(tmpdir, file.filename)
        with open(video_path, "wb") as f:
            f.write(await file.read())

        # Convert video to mp3 with ffmpeg
        mp3_path = os.path.join(tmpdir, "audio.mp3")
        try:
            ffmpeg.input(video_path).output(mp3_path, format='mp3', acodec='libmp3lame').run(
                quiet=True, overwrite_output=True
            )
        except ffmpeg.Error as e:
            return JSONResponse(
                content={"error": f"FFmpeg conversion failed: {e.stderr.decode() if e.stderr else str(e)}"},
                status_code=500,
            )

        # Define DummyUploadFile with async read()
        class DummyUploadFile:
            def __init__(self, file, filename):
                self.file = file
                self.filename = filename

            async def read(self):
                return self.file.read()

        # Open mp3 and wrap in DummyUploadFile
        with open(mp3_path, "rb") as audio_file:
            dummy_file = DummyUploadFile(audio_file, "audio.mp3")
            summrize = await summarize_audio(dummy_file)

        # Check for summarize_audio errors
        if "error" in summrize:
            return JSONResponse(
                content={"error": f"Summarization failed: {summrize['error']}"},
                status_code=500,
            )

        # Perform sentiment analysis on summary
        response = sentiment_analysis(summrize["summary"])

    return JSONResponse(
        content={
            "response": response["sentiment"],
            "summary": summrize["summary"],
            "confidence": response["confidence"],
            "bar_length": response["bar_length"],
        }
    )
