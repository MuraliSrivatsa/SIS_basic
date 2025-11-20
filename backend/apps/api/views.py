# backend/apps/api/views.py
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from openai import OpenAI

# Initialize OpenAI client


@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny])
def generate_text(request):
    """
    Accepts a 'prompt' in POST JSON and returns structured AI recommendations using GPT-3.5.
    """
    prompt_data = request.data.get("prompt")
    print("Received prompt data:", prompt_data)

    if not prompt_data:
        return Response(
            {
                "market_insights": {
                    "recommendation_rationale": "",
                    "industry_trends": [],
                    "emerging_skills": [],
                },
                "recommendations": [],
                "error": "Prompt is required",
            },
            status=400,
        )

    # Prepare structured prompt
    structured_prompt = f"""
You are an AI academic advisor. Respond ONLY in JSON with this structure:

{{
  "market_insights": {{
    "recommendation_rationale": "string",
    "industry_trends": ["string"],
    "emerging_skills": ["string"]
  }},
  "recommendations": [
    {{
      "course_title": "string",
      "trending_keywords": ["string"],
      "relevance_score": 0,
      "course_description": "string",
      "learning_outcomes": ["string"],
      "industry_relevance": "string",
      "career_impact": "string",
      "duration": "string",
      "course_format": "string",
      "salary_impact": "string",
      "prerequisites": "string",
      "companies_hiring": ["string"]
    }}
  ]
}}

User prompt: {json.dumps(prompt_data)}
"""

    try:
        # Call GPT-3.5 via new OpenAI API
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": structured_prompt}],
            temperature=0.7,
            max_tokens=1000,
        )

        ai_text = response.choices[0].message.content.strip()
        print("Raw AI response:", ai_text)

        # Attempt to parse AI response as JSON
        try:
            data = json.loads(ai_text)
        except json.JSONDecodeError:
            # Fallback if JSON parsing fails
            data = {
                "market_insights": {
                    "recommendation_rationale": "",
                    "industry_trends": [],
                    "emerging_skills": [],
                },
                "recommendations": [
                    {
                        "course_title": "AI Response Parsing Failed",
                        "trending_keywords": [],
                        "relevance_score": 0,
                        "course_description": ai_text,
                        "learning_outcomes": [],
                        "industry_relevance": "",
                        "career_impact": "",
                        "duration": "",
                        "course_format": "",
                        "salary_impact": "",
                        "prerequisites": "",
                        "companies_hiring": [],
                    }
                ],
                "error": "AI returned invalid JSON, showing raw text",
            }

        return Response(data)

    except Exception as e:
        print("OpenAI API error:", e)
        return Response(
            {
                "market_insights": {
                    "recommendation_rationale": "",
                    "industry_trends": [],
                    "emerging_skills": [],
                },
                "recommendations": [],
                "error": f"OpenAI error: {str(e)}",
            },
            status=500,
        )
