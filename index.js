const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
const readline = require ('readline');
require('dotenv').config()

const client = new OpenAIClient(
    process.env.GPT_API_ENDPOINT,
    new AzureKeyCredential(process.env.OPENAI_API_KEY)
);

const getMessageFromAPI = async (message) => {
    try {
        const response = await client.getCompletions(
            process.env.GPT_MODEL,
            message,
            {
                temperature: 0.7,
                maxTokens: 50,
            }
        );
        return response.choices[0].text.trim();
    } catch(error) {
        console.log(error);
    }
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite uma mensagem: ', async (message) => {
    const response = await getMessageFromAPI(message);
    console.log(response);
    rl.close();
});