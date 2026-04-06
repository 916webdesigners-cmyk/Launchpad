const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  const genAI = new GoogleGenerativeAI("AIzaSyBCNYIP1TT4w-VtkV09F1yYzSv3-8L0ZBo");
  
  const models = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash-lite"];
  
  for (const modelName of models) {
    console.log(`\nTesting ${modelName}...`);
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100,
          responseMimeType: "application/json",
        },
      });
      const result = await model.generateContent('Return {"status":"ok"}');
      console.log(`  SUCCESS: ${result.response.text().substring(0, 100)}`);
    } catch (err) {
      console.log(`  FAILED: ${err.message.substring(0, 200)}`);
    }
  }
}

test();
