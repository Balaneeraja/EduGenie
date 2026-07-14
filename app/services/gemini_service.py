import os
from dotenv import load_dotenv
import google.generativeai as genai

# =====================================
# Load Environment Variables
# =====================================
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise Exception(
        "GEMINI_API_KEY not found.\n"
        "Please add it to your .env file."
    )

# =====================================
# Configure Gemini
# =====================================
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


# =====================================
# Ask Gemini
# =====================================
def ask_gemini(prompt: str) -> str:
    """
    Sends a prompt to Gemini and returns the response text.
    """

    try:
        response = model.generate_content(prompt)

        if hasattr(response, "text") and response.text:
            return response.text.strip()

        return "No response generated."

    except Exception as e:
        return f"Gemini Error: {str(e)}"