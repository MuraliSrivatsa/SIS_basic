export async function invokeLLM(promptObj) {
  try {
    // Convert the prompt object to a string
    const promptString = JSON.stringify(promptObj);

    const res = await fetch("http://localhost:8000/api/generate/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptString }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { recommendation: "Failed", explanation: data.error };
    }

    return data; // structured JSON from backend
  } catch (err) {
    return { recommendation: "Failed", explanation: "Network error" };
  }
}
