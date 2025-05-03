import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const responseCache = new Map();

const SYSTEM_PROMPT = `You are a helpful coding tutor specializing in web development (HTML, CSS, JavaScript, React, Node.js).
Give concise, beginner-friendly explanations with small code examples when appropriate.
Always format code examples with triple backticks and language identifier like this:

\`\`\`html
<div>Example HTML code</div>
\`\`\`

\`\`\`css
.class { property: value; }
\`\`\`

\`\`\`javascript
function example() { return 'code'; }
\`\`\`

When showing multiple ways to solve a problem, use separate code blocks for each solution.
Focus on practical advice and best practices. Keep your responses focused and to the point.`;

router.post('/api/openai/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received OpenRouter chat request with message:', message);
    
    if (!message) {
      return res.status(400).json({ 
        error: 'Missing message',
        response: 'Please provide a message to get a response.'
      });
    }
    
    if (responseCache.has(message)) {
      console.log('Cache hit for query:', message);
      return res.json({ response: responseCache.get(message) });
    }
    
    const requestData = {
      model: 'openai/gpt-3.5-turbo', // Using a fast and reliable model
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
      headers: {
        'HTTP-Referer': 'https://codedex.com',
        'X-Title': 'CodeDex AI Tutor'
      }
    };
    
    console.log('Sending request to OpenRouter API...');
    const response = await axios.post(OPENROUTER_API_URL, requestData, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
    
    if (!response.data || !response.data.choices || !response.data.choices[0] || !response.data.choices[0].message) {
      throw new Error('Invalid response format from OpenRouter API');
    }
    
    const aiResponse = response.data.choices[0].message.content.trim();
    console.log('Received response from OpenRouter API:', aiResponse.substring(0, 100) + '...');
    
    responseCache.set(message, aiResponse);
    
    return res.json({ response: aiResponse });
    
  } catch (error) {
    console.error('Error in OpenRouter chat:', error);
    
    let errorMessage = 'An error occurred while processing your request.';
    
    if (error.response) {
      console.error('OpenRouter API response error:', error.response.data);
      errorMessage = error.response.data.error?.message || 'API returned an error response.';
    } else if (error.request) {
      console.error('OpenRouter API request error - no response received');
      errorMessage = 'Could not connect to the AI service. Please check your internet connection.';
    }
    
    res.status(500).json({ 
      error: 'OpenRouter API error',
      message: errorMessage,
      response: 'I encountered an error connecting to my knowledge base. Please try again or ask a different question.'
    });
  }
});

export default router; 