import { ConfigService } from "./config.service";

export class GptService {
  private apiKey: string = ConfigService.get('gptToken') || '';

  constructor() {
    
  }

  transcribeAudio(audioFile: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', audioFile);

    return fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => data.text);
  }

}