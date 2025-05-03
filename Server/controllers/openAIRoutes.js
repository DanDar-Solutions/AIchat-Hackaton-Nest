import express from 'express';
import axios from 'axios';

const router = express.Router();

// OpenRouter API key and configuration
const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Simple in-memory cache to avoid repeated identical queries
const responseCache = new Map();

// System prompt for coding education
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
    
    // Check cache first
    if (responseCache.has(message)) {
      console.log('Cache hit for query:', message);
      return res.json({ response: responseCache.get(message) });
    }
    
    // Setup API request
    const requestData = {
      model: 'openai/gpt-3.5-turbo', // Using a fast and reliable model
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      temperature: 0.5,
      max_tokens: 300,
      headers: {
        'HTTP-Referer': 'https://codedex.com', // Replace with your actual domain
        'X-Title': 'CodeDex AI Tutor'
      }
    };
    
    // Make an API call to OpenRouter
    console.log('Sending request to OpenRouter API...');
    const response = await axios.post(OPENROUTER_API_URL, requestData, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Extract and clean the response
    const aiResponse = response.data.choices[0].message.content.trim();
    console.log('Received response from OpenRouter API:', aiResponse.substring(0, 100) + '...');
    
    // Cache the response
    responseCache.set(message, aiResponse);
    
    // Send response to client
    return res.json({ response: aiResponse });
    
  } catch (error) {
    console.error('Error in OpenRouter chat:', error);
    
    // Return a useful error message
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