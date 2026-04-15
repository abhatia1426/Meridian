import axios from 'axios'

export const getMoodAttributes = async (moodInput) => {
    const prompt = `
You are an export video game cureator. A user described what they want as: 
"${moodInput}"

Analyze their input deeply = consider mood, energy level, time available, social context, and any specific preferences mentioned.

Return ONLY a JSON object, no explanation:
{
    "genres": ["string"],
    "pace": "chill|moderate|intense",
    "maxPlaytime": number,
    "tags": ["string"],
    "moodSummary": "string", 
    "curatorNote": "string",
    "avoidTags": ["string"]
}

curatorNote should be 1 sentence explaining your interpretation of what they want, written directly to the user. For example: "You want omething low-stakes and visually calming that you can pick up and put down easily."
avoidTags should be tags that would NOT match this moos.
`

    const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] }
    )

    const raw = res.data.candidates[0].content.parts[0].text
    const cleaned = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(cleaned)
}


export const getGameReason = async (gameTitle, moodInput) => {
    const prompt = `
A user is looking for : "${moodInput}"
Explain in ONE short sentence (max 12 words) why "${gameTitle}" is a perfect match for them.
Return only the sentence, nothing else.
`

    const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] }
    )

    return res.data.candidates[0].content.parts[0].text.trim()
}