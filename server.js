const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

// 🔑 あなたの OpenAI APIキーをここに貼ってください（そのままでも動きます）
const openai = new OpenAI({
  apiKey: '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'
});

app.post('/fortune', async (req, res) => {
  const { name, birthday } = req.body;

  const prompt = `あなたは神秘的な霊能者「藤子」です。依頼者の未来の運命を占ってください。

・名前：${name}
・誕生日：${birthday}

霊的かつ詩的な語り口で、300文字以上のメッセージを生成してください。`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ← GPT-4 から 3.5 に変更済み
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: "エラーが発生しました。" });
  }
});

app.listen(3000, () => console.log("🌟 http://localhost:3000 で霊能者 藤子が待機中"));
