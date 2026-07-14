from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.services.gemini_service import ask_gemini
import json

router = APIRouter()


# =====================================
# Ask AI
# =====================================
@router.get("/ask")
def ask(question: str):

    prompt = f"""
You are EduGenie AI.

Answer the following question in a clean, professional format.

Question:
{question}

Rules:

- Use proper headings.
- Use bullet points where appropriate.
- Explain in simple English.
- Keep paragraphs short.
- Highlight important terms using **bold**.
- End with a short conclusion.

"""

    return {"answer": ask_gemini(prompt)}
# =====================================
# Explain Topic
# =====================================
@router.get("/explain")
def explain(topic: str):

    prompt = f"""
You are EduGenie AI.

Explain the topic:

{topic}

Return the answer in this exact format:

# Definition

...

# Explanation

...

# Real Life Example

...

# Advantages

• Point 1

• Point 2

...

# Disadvantages

• Point 1

• Point 2

...

# Conclusion

...
"""

    return {
        "answer": ask_gemini(prompt)
    }

# =====================================
# Quiz Generator
# =====================================
@router.get("/generate-quiz")
def generate_quiz(topic: str):

    prompt = f"""
Create exactly 5 multiple-choice questions about {topic}.

Return ONLY valid JSON.

[
  {{
    "question":"Question here",
    "options":[
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer":"Correct option exactly matching one option"
  }}
]

Rules:

- No markdown
- No explanation
- No extra text
- Return only JSON
"""

    response = ask_gemini(prompt)

    response = response.replace("```json", "").replace("```", "").strip()

    import json

    try:
        return json.loads(response)

    except Exception:

        return {
            "error": True,
            "raw": response
        }
    
# =====================================
# Notes Summarizer
# =====================================
@router.post("/summarize")
def summarize(text: str):

    prompt = f"""
You are EduGenie AI.

Summarize these notes.

{text}

Return the answer using this format.

# Summary

Write a short paragraph.

# Key Points

• Point 1

• Point 2

• Point 3

# Important Facts

• Fact 1

• Fact 2

# Quick Revision

Write 3–5 short revision lines.
"""

    return {
        "answer": ask_gemini(prompt)
    }

# =====================================
# Learning Roadmap
# =====================================
@router.get("/learn")
def roadmap(topic: str):

    prompt = f"""
You are EduGenie AI.

Create a complete learning roadmap for:

{topic}

Use exactly this format.

# Beginner Level

Explain what to learn first.

# Intermediate Level

Explain what to learn next.

# Advanced Level

Explain advanced topics.

# Best Resources

• Books

• Websites

• YouTube Channels

• Practice Platforms

# Projects

Suggest 3 practical projects.

# Career Opportunities

Mention possible careers.

# Final Tips

Give motivational advice.
"""

    return {
        "answer": ask_gemini(prompt)
    }