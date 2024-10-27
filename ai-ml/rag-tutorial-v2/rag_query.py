from langchain.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
from get_embedding_function import get_embedding_function

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}
"""

# Prepare the DB and embedding function once for reuse
embedding_function = get_embedding_function()
db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

def query_rag(query_text: str):
    # Search the DB.
    results = db.similarity_search_with_score(query_text, k=5)

    # Prepare the context for the model
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)

    # Call the model
    model = Ollama(model="llama3.1")
    response_text = model.invoke(prompt)

    # Collect sources from metadata
    sources = [doc.metadata.get("id", None) for doc, _score in results]
    
    return {"response": response_text, "sources": sources}
