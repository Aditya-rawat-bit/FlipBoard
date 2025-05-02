
import { useState, useEffect } from 'react';

export function useGroqAi() {
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('groq_api_key') || '';
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('groq_api_key', apiKey);
    }
  }, [apiKey]);

  // Process the note content for AI requests
  const processContent = (noteContent: string) => {
    // Make sure we have content to process
    if (!noteContent || noteContent.trim() === '') {
      return 'No content available to process.';
    }
    
    // Limit content length for performance
    const maxLength = 8000;
    if (noteContent.length > maxLength) {
      return noteContent.substring(0, maxLength) + "...";
    }
    return noteContent;
  };

  const generateAIResponse = async (prompt: string, contentToProcess: string): Promise<string> => {
    if (!apiKey) {
      return "Please provide a valid Groq API key to use the AI features.";
    }

    if (contentToProcess === 'No content available to process.' || !contentToProcess.trim()) {
      return "I couldn't find any content to analyze. Please add some text to your note first.";
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: 'You are an educational assistant that helps analyze notes and answer questions about content. Be concise, accurate, and helpful. Format your response in markdown.'
            },
            {
              role: 'user',
              content: prompt.toLowerCase().includes('summarize') 
                ? `Summarize the following note content: ${contentToProcess}` 
                : `Based on this note content: ${contentToProcess}\n\nPlease answer the following question: ${prompt}`
            }
          ],
          temperature: 0.5,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to generate response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error: any) {
      console.error("Error calling Groq API:", error);
      throw new Error(error.message || 'Failed to generate response');
    }
  };

  return {
    apiKey,
    setApiKey,
    isLoading,
    setIsLoading,
    generateAIResponse,
    processContent
  };
}
