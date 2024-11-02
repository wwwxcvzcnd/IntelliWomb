import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../services/chatbot.service';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.css']
})
export class AiComponent implements OnInit {
  userInput = '';
  conversation: { sender: string; message: string }[] = [];

  constructor(private chatbotService: ChatbotService) { }

  ngOnInit(): void {
    this.conversation.push({
      sender: 'IntelliWomb AI',
      message: 'Welcome to IntelliWomb AI! I’m here to provide health information tailored for Pregnant Women. How can I assist you today?😊'
    });
  }

  sendMessage(message: string) {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      this.conversation.push({ sender: 'User', message: trimmedMessage });
      this.userInput = '';
      this.chatbotService.generateContent(trimmedMessage).subscribe(
        (response) => {
          const formattedResponse = this.formatMessage(response);
          this.conversation.push({ sender: 'IntelliWomb AI', message: formattedResponse });
        },
        (error) => {
          this.conversation.push({ sender: 'IntelliWomb AI', message: error });
        }
      );
    }
  }

  formatMessage(message: string): string {
    // Bold text enclosed in **text**
    let formattedMessage = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Separate sections by adding line breaks for clarity after certain keywords or punctuation
    formattedMessage = formattedMessage.replace(/:\s*/g, ':<br><br>');
    
    // Handle bullet points for lists (items starting with "* " or "- ")
    formattedMessage = formattedMessage.replace(/(\n?[*-] )(.*?)(?=\n|$)/g, '<li>$2</li>');
    if (formattedMessage.includes('<li>')) {
      formattedMessage = `<ul>${formattedMessage}</ul>`; // Wrap list items in <ul>
    }
  
    // Paragraphs: Detect multiple line breaks and replace with <br> tags for paragraph spacing
    formattedMessage = formattedMessage.replace(/\n{2,}/g, '<br><br>');
  
    // Disclaimers: Special handling for phrases like "Please note" or "Note:"
    formattedMessage = formattedMessage.replace(
      /\b(Please note|Note:)\b(.*?)(?=\n|$)/g,
      '<em>$1:</em>$2'
    );
  
    // URLs to clickable links
    formattedMessage = formattedMessage.replace(
      /((http|https):\/\/[^\s]+)/g,
      '<a href="$1" target="_blank">$1</a>'
    );
  
    return formattedMessage.trim(); // Return trimmed, formatted message
  }  
  
}
