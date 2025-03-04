// GeminiHelper.ts
import axios from "axios";
import { app } from "electron";

// Constants
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export class GeminiHelper {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (!this.apiKey) {
      console.warn("GEMINI_API_KEY not found in environment variables");
    }
  }

  /**
   * Process a screenshot with Gemini API to extract problem information
   * @param imageBase64 Base64 encoded image data
   * @param language Programming language to use
   * @returns Extracted problem information
   */
  public async extractProblemInfo(imageBase64: string[], language: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY not found in environment variables");
    }

    try {
      // Prepare the request payload for Gemini
      const payload = {
        contents: [
          {
            parts: [
              {
                text: `You are an expert coding interview assistant. Analyze the following screenshot(s) of a coding problem and extract the following information:
                1. The problem title
                2. The complete problem description
                3. Any constraints or requirements
                4. Any examples provided
                5. The expected output format
                
                The user wants to solve this in ${language}.
                
                Respond with a JSON object with the following structure:
                {
                  "title": "Problem title",
                  "description": "Full problem description",
                  "constraints": ["constraint 1", "constraint 2", ...],
                  "examples": [
                    {
                      "input": "Example input",
                      "output": "Example output",
                      "explanation": "Explanation if provided"
                    }
                  ],
                  "language": "${language}"
                }
                
                Only respond with the JSON object, no other text.`
              },
              ...imageBase64.map(img => ({
                inline_data: {
                  mime_type: "image/jpeg",
                  data: img
                }
              }))
            ]
          }
        ],
        generation_config: {
          temperature: 0.2,
          top_p: 0.8,
          top_k: 40
        }
      };

      // Make the API request
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${this.apiKey}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 60000
        }
      );

      // Extract and parse the JSON response
      const textResponse = response.data.candidates[0].content.parts[0].text;
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse JSON response from Gemini API");
      }
    } catch (error: any) {
      console.error("Error in extractProblemInfo:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      throw error;
    }
  }

  /**
   * Generate a solution for the problem using Gemini API
   * @param problemInfo Problem information extracted from the screenshot
   * @param language Programming language to use
   * @returns Generated solution
   */
  public async generateSolution(problemInfo: any, language: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY not found in environment variables");
    }

    try {
      // Prepare the request payload for Gemini
      const payload = {
        contents: [
          {
            parts: [
              {
                text: `You are an expert coding interview assistant. Generate a detailed solution for the following problem in ${language}:
                
                Problem Title: ${problemInfo.title}
                
                Problem Description:
                ${problemInfo.description}
                
                ${problemInfo.constraints && problemInfo.constraints.length > 0 ? 
                  `Constraints:
                  ${problemInfo.constraints.join('\n')}` : ''}
                
                ${problemInfo.examples && problemInfo.examples.length > 0 ? 
                  `Examples:
                  ${problemInfo.examples.map((ex: any, i: number) => 
                    `Example ${i+1}:
                    Input: ${ex.input}
                    Output: ${ex.output}
                    ${ex.explanation ? `Explanation: ${ex.explanation}` : ''}`
                  ).join('\n\n')}` : ''}
                
                Provide a complete solution with the following structure:
                1. A brief explanation of your approach
                2. Time and space complexity analysis
                3. The complete code solution in ${language}
                4. A step-by-step explanation of how the code works
                
                Respond with a JSON object with the following structure:
                {
                  "approach": "Brief explanation of the approach",
                  "timeComplexity": "O(n)",
                  "spaceComplexity": "O(n)",
                  "code": "Complete code solution",
                  "explanation": "Step-by-step explanation of the solution"
                }
                
                Only respond with the JSON object, no other text.`
              }
            ]
          }
        ],
        generation_config: {
          temperature: 0.2,
          top_p: 0.8,
          top_k: 40
        }
      };

      // Make the API request
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${this.apiKey}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 60000
        }
      );

      // Extract and parse the JSON response
      const textResponse = response.data.candidates[0].content.parts[0].text;
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse JSON response from Gemini API");
      }
    } catch (error: any) {
      console.error("Error in generateSolution:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      throw error;
    }
  }
} 