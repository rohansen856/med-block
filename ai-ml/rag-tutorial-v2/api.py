from flask import Flask, request, jsonify
from rag_query import query_rag

app = Flask(__name__)

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    if not data or 'query_text' not in data:
        return jsonify({"error": "Missing query_text in request"}), 400
    
    query_text = data['query_text']
    
    try:
        # Call the function from rag_query.py
        response = query_rag(query_text)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
