import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

app = FastAPI(title="LifeMaxxer AI Backend")

# Allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],  # Update this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq client
groq_api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api_key)


class UserData(BaseModel):
    data: Dict[str, Any]


@app.post("/api/analyze")
async def analyze_life(user_data: dict):
    try:
        prompt = f"""
You are LifeMaxxer AI — a brutally honest life strategist who doesn't sugarcoat anything.
Analyze the following self-reported user data and provide a DETAILED assessment.

User Data:
{json.dumps(user_data, indent=2)}

You MUST return ONLY a valid JSON object with EXACTLY this structure (no markdown, no backticks, no extra text):
{{
  "scores": {{
    "overall": <float 0-10>,
    "fitness": <float 0-10>,
    "looks": <float 0-10>,
    "discipline": <float 0-10>,
    "finance": <float 0-10>,
    "social": <float 0-10>
  }},
  "analysis": "<A 3-5 sentence brutally honest executive summary of this person's current state. Be specific, direct, and mention their biggest blind spots.>",
  "hidden_issues": [
    "<Issue 1: A deep psychological pattern they likely don't realize about themselves>",
    "<Issue 2: Another hidden pattern or coping mechanism>",
    "<Issue 3: A third blind spot or self-sabotaging behavior>"
  ],
  "priorities": [
    "<Priority 1: The single highest-leverage thing they must fix NOW>",
    "<Priority 2: Second most important action>",
    "<Priority 3: Third priority>"
  ],
  "thirty_day_protocol": {{
    "week1": ["<task1>", "<task2>", "<task3>"],
    "week2": ["<task1>", "<task2>", "<task3>"],
    "week3": ["<task1>", "<task2>"],
    "week4": ["<task1>", "<task2>"]
  }},
  "indian_context_advice": "<Specific advice contextual to being a young person in India — mention UPI spending, hostel food, family expectations, or local habits if relevant. If the user doesn't seem to be Indian, give general cultural context advice instead.>",
  "future_projection": {{
    "if_followed": "<A vivid 2-3 sentence picture of their life in 6 months if they follow the protocol>",
    "if_ignored": "<A vivid 2-3 sentence picture of their life in 5 years if they change nothing>"
  }}
}}

RULES:
- Be ruthlessly honest. No participation trophies.
- Scores should reflect REALITY, not feelings. Most people are 4-6 range.
- The analysis should sting but be constructive.
- Hidden issues should be psychologically insightful.
- The 30-day protocol must be ACTIONABLE and SPECIFIC.
- Return ONLY the JSON object. Nothing else.
"""

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that outputs only valid JSON. Never wrap your response in markdown code blocks. Output raw JSON only.",
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
            temperature=0.7,
        )

        response_content = chat_completion.choices[0].message.content
        report_data = json.loads(response_content)

        # Validate that we got the expected structure
        required_keys = ["scores", "analysis", "hidden_issues", "priorities", "thirty_day_protocol", "future_projection"]
        for key in required_keys:
            if key not in report_data:
                raise ValueError(f"AI response missing required key: {key}")

        return {"success": True, "reportData": report_data}

    except json.JSONDecodeError as e:
        print(f"JSON Parse Error: {e}")
        print(f"Raw response: {response_content}")
        raise HTTPException(status_code=500, detail="AI returned invalid JSON. Please try again.")

    except Exception as e:
        print(f"Error calling Groq: {e}")
        raise HTTPException(
        status_code=500,
        detail={
            "error": "AI_PROCESSING_FAILED",
            "message": "Something went wrong while analyzing your data. Please try again."
        }
    )


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "LifeMaxxer AI Backend"}
