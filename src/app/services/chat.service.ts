import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: signalR.HubConnection;

  private messageSource = new BehaviorSubject<string>('');
  private userSource = new BehaviorSubject<string>('');

  message$ = this.messageSource.asObservable();
  user$ = this.userSource.asObservable();

  constructor() {

    let token = localStorage.getItem('token');

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5100/chatHub', { accessTokenFactory: () => token! })
      .withAutomaticReconnect()
      .build();

  }

  connect(username: string) {

    this.hubConnection
      .start()
      .then(() => { console.log('SignalR Connection started!'); })
      .catch(err => console.log('SignalR Connection error->', err));


    // service tarafından gelen mesajları dinleme
    this.hubConnection.on('userConnected', (username: string) => {
      this.userSource.next(username + ' kullanıcısı bağlandı.');
      console.log(username + ' connected');
    });

    this.hubConnection.on('userDisconnected', (username: string) => {
      this.userSource.next(username + ' kullanıcısı ayrıldı.')
      console.log(username + ' disconnected');

    });

    this.hubConnection.on('receiveMessage', (username: string, message: string) => {

      this.messageSource.next(username + ' : ' + message);
      console.log(username + ' says: ' + message);
    });

  }

  sendMessage(username: string, message: string) {
    this.hubConnection?.invoke('SendMessageToAll', username, message).catch(err => console.error(err));
  }




}
