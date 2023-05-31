import {Configuration, OpenAIApi} from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
    organization: "org-11hHTlIOIbUHmDsyBxtnZBDk",
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const app = express();
const port = 3080;

app.use(bodyParser.json());
app.use(cors());
app.post("/api", async (req, res)=>{
    const {message} = req.body;
    const callApi = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages: [
            {role:"user", content:`${message}`},
        ]
    })
    res.json({
        message: callApi.data.choices[0].message
    })
});


app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`);
})