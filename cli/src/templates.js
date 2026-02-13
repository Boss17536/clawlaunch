/**
 * Post templates organized by topic and length
 * Each topic has 5 variations to avoid repetition
 */

const templates = {
  motivation: {
    short: [
      "🌟 Your only limit is you. Push past your comfort zone today.",
      "💪 Small steps every day lead to big changes. Keep going!",
      "✨ Believe in yourself. You're stronger than you think.",
      "🎯 Success is built one day at a time. Focus on today.",
      "🚀 Don't wait for the perfect moment. Create it."
    ],
    long: [
      "🌟 Your only limit is you. Push past your comfort zone today.\n\nEvery great achievement starts with the decision to try. Don't let fear of failure hold you back. The most successful people aren't those who never failed—they're the ones who never quit.\n\nWhat will you do today to step outside your comfort zone? 💪",
      "💪 Small steps every day lead to big changes. Keep going!\n\nSuccess isn't about making huge leaps overnight. It's about consistent, daily progress. Even when you don't see immediate results, trust the process. Those small efforts compound over time.\n\nWhat's one small action you can take today toward your goals? 🎯",
      "✨ Believe in yourself. You're stronger than you think.\n\nSelf-doubt is normal, but don't let it define you. You've overcome challenges before, and you'll overcome the next ones too. Your strength isn't measured by never falling—it's measured by how you rise after each fall.\n\nRemember: You are capable of amazing things. 🚀",
      "🎯 Success is built one day at a time. Focus on today.\n\nStop worrying about where you'll be in 5 years. Start focusing on what you can do TODAY. This moment right now is where your power lies. Make the most of it.\n\nYour future self will thank you for the work you put in today. Let's make it count! 💯",
      "🚀 Don't wait for the perfect moment. Create it.\n\nPerfect conditions rarely exist. Winners take action despite uncertainty. They understand that momentum comes from movement, not meditation.\n\nStop waiting. Start building. Your perfect moment is right now. ⚡"
    ]
  },
  
  fitness: {
    short: [
      "💪 Consistency beats perfection. Just show up today.",
      "🏃‍♂️ Your body achieves what your mind believes. Let's go!",
      "🔥 Stronger than yesterday, that's the goal.",
      "⚡ Fitness is a journey, not a destination. Enjoy the process.",
      "🎯 Train like a beast, look like a beauty."
    ],
    long: [
      "💪 Consistency beats perfection. Just show up today.\n\nYou don't need the perfect workout plan. You don't need to feel 100% motivated. You just need to show up and do the work.\n\nSome days you'll crush it. Some days you'll struggle. Both are progress. The key is to never miss twice in a row.\n\nWhat workout are you doing today? 🔥",
      "🏃‍♂️ Your body achieves what your mind believes. Let's go!\n\nMental strength is just as important as physical strength. Before you can transform your body, you need to transform your mindset.\n\nStop saying 'I can't' and start saying 'I'm learning to.' Your belief shapes your reality. Believe you can, and you're already halfway there. 💯",
      "🔥 Stronger than yesterday, that's the goal.\n\nForget about comparing yourself to others at the gym. Your only competition is who you were yesterday.\n\nDid you lift heavier? Run longer? Show up when you didn't feel like it? That's progress. Celebrate those small wins.\n\nProgress isn't always visible, but it's always valuable. Keep pushing! 💪",
      "⚡ Fitness is a journey, not a destination. Enjoy the process.\n\nStop obsessing over the end goal. Learn to love the daily grind. Find joy in the sweat, the soreness, the small improvements.\n\nThe finish line keeps moving—that's why the journey matters more. Make it enjoyable, make it sustainable, make it yours. 🎯",
      "🎯 Train like a beast, look like a beauty.\n\nHard work in the gym creates confidence outside the gym. When you push through physical challenges, you build mental resilience that carries into every area of life.\n\nYour workout is your power hour. Make it count. Show up, work hard, leave stronger. 🚀"
    ]
  },
  
  tech: {
    short: [
      "💻 Code is poetry written in logic. Keep creating.",
      "🚀 Innovation starts with curiosity. What will you build today?",
      "⚡ Technology is best when it brings people together.",
      "🔧 The best error message is the one that never shows up.",
      "🌐 The future belongs to those who code it."
    ],
    long: [
      "💻 Code is poetry written in logic. Keep creating.\n\nEvery line of code you write is a creative act. You're not just solving problems—you're crafting solutions that didn't exist before.\n\nThe beauty of programming isn't just in clean syntax. It's in elegant solutions, thoughtful architecture, and code that makes the next developer smile.\n\nWhat are you building today? 🚀",
      "🚀 Innovation starts with curiosity. What will you build today?\n\nThe best developers aren't the ones who know everything—they're the ones who ask great questions. Stay curious. Experiment. Break things (in dev, not prod! 😄).\n\nEvery expert was once a beginner who never stopped learning. What new technology are you exploring this week? 💡",
      "⚡ Technology is best when it brings people together.\n\nWe build apps, websites, and platforms—but ultimately, we're building connections. The code is just the medium.\n\nThe most impactful tech doesn't just work well—it makes people's lives better. Never lose sight of the humans behind your users. 🌟",
      "🔧 The best error message is the one that never shows up.\n\nBut when errors do happen (and they will), make them helpful. Clear error messages save hours of debugging. Good documentation prevents frustration.\n\nWrite code for the developer who comes after you. That developer might be future you! 😊",
      "🌐 The future belongs to those who code it.\n\nTechnology is reshaping every industry. The ability to code isn't just a career skill—it's a superpower.\n\nYou're not just learning syntax. You're learning to think in systems, solve complex problems, and create things from nothing. Keep building! 💪"
    ]
  },
  
  business: {
    short: [
      "📈 Business success = Great product + Customer obsession",
      "💼 Your network is your net worth. Build genuine connections.",
      "🎯 Execution beats ideas. Take action today.",
      "🚀 Solve problems, create value, repeat.",
      "💡 Every 'no' brings you closer to a 'yes'. Keep pitching."
    ],
    long: [
      "📈 Business success = Great product + Customer obsession\n\nYou can have the best product in the world, but if you don't understand your customers deeply, you'll struggle.\n\nTalk to your customers. Listen to their problems. Obsess over their experience. That's where real growth happens.\n\nWhat did you learn from a customer this week? 💡",
      "💼 Your network is your net worth. Build genuine connections.\n\nNetworking isn't about collecting business cards—it's about building real relationships. Focus on giving value before asking for it.\n\nThe strongest networks are built on trust, authenticity, and mutual support. Connect with people because you genuinely want to help them succeed.\n\nWho can you help today? 🤝",
      "🎯 Execution beats ideas. Take action today.\n\nIdeas are worthless without execution. Everyone has ideas. Few people have the discipline to execute consistently.\n\nStop waiting for the perfect plan. Start with what you have, learn as you go, and adjust based on real feedback.\n\nWhat's one action you can take today to move your business forward? 🚀",
      "🚀 Solve problems, create value, repeat.\n\nThe formula for business success is simple (not easy): Find a real problem, create a valuable solution, deliver it consistently.\n\nDon't chase trends. Chase problems worth solving. When you genuinely help people, profit follows naturally.\n\nWhat problem are you solving today? 💪",
      "💡 Every 'no' brings you closer to a 'yes'. Keep pitching.\n\nRejection is part of the game. The most successful entrepreneurs heard 'no' hundreds of times before they heard the 'yes' that changed everything.\n\nDon't take rejection personally. Use it as feedback. Refine your pitch, improve your product, and keep going.\n\nYour breakthrough might be just one conversation away. 🎯"
    ]
  },
  
  default: {
    short: [
      "🌟 Make today count. You've got this!",
      "💡 Learning something new every day keeps life interesting.",
      "✨ Progress over perfection, always.",
      "🎯 Focus on what you can control. Let go of the rest.",
      "🚀 Great things take time. Be patient with yourself."
    ],
    long: [
      "🌟 Make today count. You've got this!\n\nEvery day is a fresh opportunity to move closer to your goals. Don't waste it dwelling on yesterday's mistakes or tomorrow's worries.\n\nFocus on making TODAY valuable. Do one thing that matters. Learn one new thing. Help one person. That's how great lives are built—one intentional day at a time. 💪",
      "💡 Learning something new every day keeps life interesting.\n\nCuriosity is the antidote to boredom. When you commit to continuous learning, life stays fresh and exciting.\n\nIt doesn't have to be big—read an article, watch a tutorial, have a deep conversation. Small daily learning compounds into expertise.\n\nWhat are you learning today? 📚",
      "✨ Progress over perfection, always.\n\nPerfectionism is just fear wearing a mask. It keeps you stuck, second-guessing, never shipping.\n\nDone is better than perfect. Messy action beats perfect inaction. You can't improve what you don't start.\n\nWhat imperfect action will you take today? 🚀",
      "🎯 Focus on what you can control. Let go of the rest.\n\nYou can't control outcomes, other people's opinions, or external circumstances. But you CAN control your effort, attitude, and response.\n\nWhen you focus only on what's in your control, anxiety decreases and effectiveness increases. Let go of the rest. 🧘",
      "🚀 Great things take time. Be patient with yourself.\n\nWe overestimate what we can do in a day and underestimate what we can do in a year. Success is rarely overnight—it's the result of consistent effort over time.\n\nBe patient with your progress. Trust the process. Keep showing up. The results will come. ⏰"
    ]
  }
};

/**
 * Generate content using OpenAI API
 * @param {string} prompt - User's custom prompt
 * @param {string} apiKey - OpenAI API key
 * @param {string} length - Post length ('short' or 'long')
 * @returns {Promise<string>} - Generated content
 */
async function generateCustomContent(prompt, apiKey, length = 'short') {
  const https = require('https');
  
  const maxTokens = length === 'long' ? 300 : 100;
  const systemPrompt = length === 'long' 
    ? 'You are a professional social media content creator. Create engaging, detailed posts with multiple paragraphs. Use emojis where appropriate.'
    : 'You are a professional social media content creator. Create short, punchy, engaging posts. Use emojis where appropriate.';
  
  const postData = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    max_tokens: maxTokens,
    temperature: 0.8
  });
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': postData.length
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.error) {
            reject(new Error(response.error.message || 'OpenAI API error'));
            return;
          }
          
          if (response.choices && response.choices.length > 0) {
            const content = response.choices[0].message.content.trim();
            resolve(content);
          } else {
            reject(new Error('No content generated'));
          }
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

/**
 * Get a random template for a given topic and length
 * @param {string} topic - Topic name (motivation, fitness, tech, business, default)
 * @param {string} length - Post length ('short' or 'long'), defaults to 'short'
 * @param {Object} config - Optional config with custom templates
 * @returns {string|Promise<string>} - Random template text or Promise for custom_api
 */
function getRandomTemplate(topic, length = 'short', config = {}) {
  // Handle custom API content generation
  if (topic === 'custom_api' && config.customPrompt && config.customApiKey) {
    return generateCustomContent(config.customPrompt, config.customApiKey, length);
  }
  
  // Check if config has custom templates
  let topicTemplates = templates[topic] || templates.default;
  
  if (config.customTemplates && config.customTemplates[topic]) {
    // Merge custom templates with built-in templates
    topicTemplates = {
      short: [
        ...(topicTemplates.short || []),
        ...(config.customTemplates[topic].short || [])
      ],
      long: [
        ...(topicTemplates.long || []),
        ...(config.customTemplates[topic].long || [])
      ]
    };
  }
  
  const lengthTemplates = topicTemplates[length] || topicTemplates.short;
  
  if (!lengthTemplates || lengthTemplates.length === 0) {
    return templates.default.short[0]; // Fallback
  }
  
  const randomIndex = Math.floor(Math.random() * lengthTemplates.length);
  return lengthTemplates[randomIndex];
}

/**
 * Get all templates for a topic (for testing/preview)
 * @param {string} topic - Topic name
 * @param {string} length - Post length ('short' or 'long')
 * @returns {Array} - Array of template strings
 */
function getTopicTemplates(topic, length = 'short') {
  const topicTemplates = templates[topic] || templates.default;
  return topicTemplates[length] || topicTemplates.short;
}

/**
 * Get available topics
 * @param {Object} config - Optional config with custom templates
 * @returns {Array} - Array of topic names
 */
function getAvailableTopics(config = {}) {
  const builtInTopics = Object.keys(templates);
  
  if (config.customTemplates) {
    const customTopics = Object.keys(config.customTemplates);
    return [...new Set([...builtInTopics, ...customTopics])];
  }
  
  return builtInTopics;
}

/**
 * Validate custom templates structure
 * @param {Object} customTemplates - Custom templates object
 * @returns {boolean} - True if valid
 */
function validateCustomTemplates(customTemplates) {
  if (!customTemplates || typeof customTemplates !== 'object') {
    return false;
  }
  
  // Empty object is invalid
  const topics = Object.keys(customTemplates);
  if (topics.length === 0) {
    return false;
  }
  
  for (const topic in customTemplates) {
    const topicData = customTemplates[topic];
    
    if (!topicData || typeof topicData !== 'object') {
      return false;
    }
    
    if (!topicData.short || !Array.isArray(topicData.short) || topicData.short.length === 0) {
      return false;
    }
    
    if (!topicData.long || !Array.isArray(topicData.long) || topicData.long.length === 0) {
      return false;
    }
  }
  
  return true;
}

module.exports = {
  getRandomTemplate,
  getTopicTemplates,
  getAvailableTopics,
  validateCustomTemplates
};
