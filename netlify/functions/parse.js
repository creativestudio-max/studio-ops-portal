const https = require('https');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { fileData, fileType } = JSON.parse(event.body);
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

    const payload = JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'document',
            source: {
              type: 'base64',
              media_type: fileType,
              data: fileData
            }
          },
          {
            type: 'text',
            text: `You are an invoice and estimate parser for a photo and video production company.
            Extract all information from this document and return it as JSON with this exact structure:
            {
              "vendor": {
                "company": "",
                "contact": "",
                "email": "",
                "phone": ""
              },
