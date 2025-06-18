from transformers import pipeline


def transcribe_audio(file_path: str):


   pipe = pipeline(
    "automatic-speech-recognition",
    model="openai/whisper-base",  #
    device=-1  
)

   output = pipe(file_path, return_timestamps=True)
   return  output["text"]











