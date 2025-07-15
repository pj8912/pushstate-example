# app.py

from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Route 1: Serves the main homepage shell
@app.route('/')
def home():
    """Renders the main page."""
    return render_template('index.html')

# Route 2: API endpoint for the "Info" tab
@app.route('/data/info')
def get_info():
    """Returns data for the Info tab."""
    data = {
        "title": "Main Information",
        "content": "This is the primary information fetched from the server for the Info tab."
    }
    return jsonify(data)

# Route 3: API endpoint for the "Details" tab
@app.route('/data/details')
def get_details():
    """Returns data for the Details tab."""
    data = {
        "title": "More Details",
        "content": "Here are some extra details for the second tab. This content is also loaded dynamically."
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)