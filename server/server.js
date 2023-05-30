import {Configuration, OpenAIApi} from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const configuration = new Configuration({
    organization: "org-11hHTlIOIbUHmDsyBxtnZBDk",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.post("/", async (req, res)=>{
    const {message} = req.body;
    const callApi = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages: [
            {role:"user", content:`${message}`},
        ]
    })
    res.json({
        callApi: callApi.data.choices[0].message
    })
});

app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`);
})