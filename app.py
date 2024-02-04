from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
app.secret_key = os.urandom(24)
CORS(app)

# take text from app and analyze polarity and subjectivity then send response back to app 
@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.get_json()
    blob = TextBlob(data) 
    polarity = blob.sentiment.polarity
    subjectivity = blob.sentiment.subjectivity

    if subjectivity == 0:
        su = "very objective"
    elif subjectivity < 0.5:
        su = "objective"
    elif subjectivity < 1:
        su = "subjective"
    else:
        su = "very subjective"

    if polarity < 0:
        sentiment = "negative"
    elif polarity == 0:
        sentiment = "neutral"
    else:
        sentiment = "positive"

    return jsonify(blob.sentiment, sentiment, su)

if __name__ == "__main__":
    app.run(debug=True)