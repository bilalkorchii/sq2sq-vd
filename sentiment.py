import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import text_to_word_sequence
from tensorflow.keras.datasets import imdb


def sentiment_analysis(new_review: str):
    max_features = 5000
    maxlen = 200

    word_index = imdb.get_word_index()
    word_index = {word: idx for word, idx in word_index.items() if idx < (max_features - 3)}
    best_model = tf.keras.models.load_model('mymodel.keras')

    def encode_review(text):
        tokens = text_to_word_sequence(text)
        encoded = []
        for word in tokens:
            idx = word_index.get(word, 2) 
            if idx >= max_features:
                idx = 2 + 3  
            encoded.append(idx)
        return pad_sequences([encoded], maxlen=maxlen, padding='post')

    encoded_review = encode_review(new_review)
    prediction = best_model.predict(encoded_review, verbose=0)[0][0]

    confidence = prediction * 100
    sentiment = "Positive" if prediction >= 0.5 else "Negative"
    bar_length = int(confidence // 5)

    return {"sentiment": sentiment, "confidence": confidence, "bar_length": bar_length}


