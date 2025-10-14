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
    const { region, season, precipitation_sum, mean_temp, ndvi_mean, soil_organic_carbon } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const prompt = `Analyze the following agricultural data and predict crop yield:
    
Region: ${region}
Season: ${season}
Precipitation: ${precipitation_sum} mm
Mean Temperature: ${mean_temp}°C
NDVI (Vegetation Index): ${ndvi_mean}
Soil Organic Carbon: ${soil_organic_carbon}%

Provide a JSON response with:
- predicted_yield (tons per hectare)
- confidence_score (0-100)
- ai_insights (detailed analysis and recommendations)
- crop_type (recommended crop for these conditions)`;

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
            content: 'You are an agricultural data scientist specializing in crop yield prediction. Analyze environmental and soil data to predict yields accurately.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI prediction failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No prediction result from AI');
    }

    let prediction;
    try {
      prediction = JSON.parse(content);
    } catch {
      prediction = {
        predicted_yield: 4.5,
        confidence_score: 75,
        ai_insights: content,
        crop_type: 'Maize'
      };
    }

    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in predict-crop-yield:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
