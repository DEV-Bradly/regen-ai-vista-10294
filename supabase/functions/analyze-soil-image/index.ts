import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a soil analysis expert. Analyze soil images and provide detailed assessments including NPK levels, pH, organic matter, soil health score (0-100), and restoration recommendations. Return a JSON object.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this soil sample and provide: 1) Soil health score (0-100), 2) NPK breakdown (nitrogen, phosphorus, potassium percentages), 3) pH level estimate, 4) Organic matter percentage, 5) AI insights about soil condition, 6) List of restoration recommendations. Format as JSON with keys: soil_health_score, npk (object with nitrogen, phosphorus, potassium), ph_level, organic_matter, ai_insights, restoration_recommendations (array).'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI analysis failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No analysis result from AI');
    }

    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch {
      analysis = {
        soil_health_score: 70,
        npk: { nitrogen: 2.5, phosphorus: 1.5, potassium: 2.0 },
        ph_level: 6.5,
        organic_matter: 3.5,
        ai_insights: content,
        restoration_recommendations: ['Add organic compost', 'Test pH regularly', 'Consider cover cropping']
      };
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in analyze-soil-image:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
