import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, ButtonModule, DialogModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  messageList: string[] = [];



  userName: string = '';
  myMessage: string = '';

  visibleUserName: boolean = false;
  chatService: ChatService;
  constructor() {
    this.chatService = inject(ChatService);
  }

  ngOnInit(): void {
    if (this.userName == '') {
      this.visibleUserName = true;
    } else {
      this.visibleUserName = false;
    }

    this.chatService.message$.subscribe(resp => {
      this.messageList.push(resp);
    });
    this.chatService.user$.subscribe(resp=>{
      this.messageList.push(resp);
    });




  }

  sendMessage() {
    this.chatService.sendMessage(this.userName, this.myMessage);
    this.myMessage = '';
  }

  setUserName() {
    if (this.userName == '')
      return;

    this.chatService.connect(this.userName);

    this.visibleUserName = false;

  }



}
