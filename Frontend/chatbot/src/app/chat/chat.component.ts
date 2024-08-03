import { Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { ChatServiceService } from '../services/chat-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatBot, TopStocks } from '../models/chat-json';

interface Messages {
  text: string;
  bot: boolean;
  options?: any[];
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {
  chatForm: FormGroup;
  // the default message that will be displayed in the beginning
  message: Messages = { text: "Hello! Welcome to LSEG. I'm here to help you, please say 'hi' to start!", bot: true };
  // the messages array to hold all the messages
  messages: Messages[] = [];
  // the array of options for the select menu
  finalMenu: string[] = ["Main Menu", "Back" ];
  // the object that will store the data from the json file
  data: ChatBot[] = [];
  // the object that will store the options of the selected stock group
  stockOptions: TopStocks[] = []
  // the array that will store the strings that i need or the validation of the user input
  array: string[] = ['menu', 'back', 'hi', 'hello'];
  
  // i get the elemet ref for the chat box so we have autoscroll to the bottom of the chat
  @ViewChild('chatBox') private chatBox!: ElementRef;

  constructor(private chatService: ChatServiceService, private fb: FormBuilder, private renderer: Renderer2) {
    this.messages.push(this.message);
    // i get the data that will be displayed
    this.chatService.getJson().subscribe(response => { 
      this.data = response;
      // i populate the string array used for validation
      this.data.forEach(item => {
        this.array.push(item.stockExchange.toLowerCase());
        item.topStocks.forEach(stock => {
          this.array.push(stock.stockName.toLowerCase());
        });
      });
    });

    // the form group for the chat input field
    this.chatForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
   }
   ngOnInit(): void {}

   ngAfterViewChecked() {
    this.scrollChatToBottom();
  }

    // the function used to send the message that the user inputs
   sendMessage() {
     const userMessage = this.chatForm.get('message')?.value.trim();
     if (userMessage) {
       this.messages.push({ text: userMessage, bot: false });
       this.chatForm.reset();
       this.scrollChatToBottom();
       if(this.array.includes(userMessage.toLowerCase())) {
       this.handleUserMessage(userMessage);
       } else {
        // in case the used didnt input a valid option the bot will ask for a new input
        this.messages.push({ text: 'I didn\'t understand that. Please try again.', bot: true});
       }
     }
   }
   
   // the fuction that handles the used input and respond to it
   handleUserMessage(message: string) {
     if(message.length !== 0) {
      if(message.toLowerCase() === 'hi' || message.toLowerCase() === 'hello') {
        this.getStockGroups();
      }

      this.data.forEach(item => {
        if(item.stockExchange.toLowerCase() === message.toLowerCase()) {
        this.getStockOptions(item.topStocks);
        this.stockOptions = item.topStocks;
        }
      })

      this.data.forEach(item => {
        item.topStocks.forEach(stock => {
          if(stock.stockName.toLowerCase() === message.toLowerCase()) {
            const msg: string = 'Stock price of ' + message + ' is ' + stock.price + '. Please select an Option:';
            this.getFinalMenu(msg);
          }
        })
      })

      if(message.toLowerCase().includes('menu')) {
        this.getStockGroups();
      } else if (message.toLowerCase().includes('back')) {
        this.getStockOptions(this.stockOptions);
      }
    }
    
   }

   // the function used to display the stock groups
   getStockGroups(): void {
    let msg: string[] = []

    this.data.forEach(item => {
      msg.push(item.stockExchange);
    })

    this.messages.push({ text: 'Please select a Stock Exchange Dealer:', bot: true, options: msg });
    this.scrollChatToBottom();
   }

   // the function used to display the stock options
   getStockOptions(stocks: TopStocks[]): void {
    let options: string[] = [];

    stocks.forEach(stock => {
      options.push(stock.stockName);
    })

    this.messages.push({ text: 'Please select a Stock Option:', bot: true, options: options });
   }

   // the function used to display the final menu
   getFinalMenu(message: string): void {
    this.messages.push({ text: message, bot: true, options: this.finalMenu });
   }
 
   
   // the function used to send the selected option to the bot
   sendOption(option: string) {
     this.messages.push({ text: option, bot: false });
     this.scrollChatToBottom();
     this.handleUserMessage(option);
   }

   // the function used to autoscroll the chat to the bottom
   scrollChatToBottom() {
    try {
      this.renderer.setProperty(this.chatBox.nativeElement, 'scrollTop', this.chatBox.nativeElement.scrollHeight);
    } catch (err) {
      console.error('Error in scrollChatToBottom:', err);
    }
   }
}
