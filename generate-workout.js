// api/generate-workout.js
// This runs on Vercel's servers — your API key never touches the browser

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // process.env.GROQ_API_KEY reads from Vercel's environment variables
        // Your key is stored securely in Vercel — never in your code
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    const text = data.choices[0].message.content;

    return res.status(200).json({ result: text });

  } catch (err) {
    console.error("Groq API error:", err);
    return res.status(500).json({ error: "Failed to generate workout" });
  }
}
