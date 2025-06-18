from dotenv import load_dotenv
import os, tempfile
import google.generativeai as genai
from whisper_transcribe import transcribe_audio 



import os
import tempfile
load_dotenv()


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

async def summarize_audio(file):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
            tmp.write(await file.read())
            audio_path = tmp.name

        transcript = transcribe_audio(audio_path)

        os.remove(audio_path)

        prompt = f"Summarize this transcript in a clear, concise way:\n\n{transcript}"
        response = gemini_model.generate_content(prompt)
        summary = response.text.strip()

        return {
            "transcript": transcript,
            "summary": summary
        }
    except Exception as e:
         return {"error": str(e)}