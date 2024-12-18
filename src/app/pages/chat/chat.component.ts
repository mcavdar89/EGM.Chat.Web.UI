import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule,CardModule,InputTextModule,ButtonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  
  myMessage: string = '';
  constructor() {
  }  
  
  ngOnInit(): void {
  }

  sendMessage(){
    console.log(this.myMessage);
    this.myMessage = '';
  }

}
