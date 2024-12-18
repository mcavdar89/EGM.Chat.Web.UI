import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection?: signalR.HubConnection;



  constructor() {

  }

  connect(username: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5100/chatHub', { accessTokenFactory: () => username })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => { console.log('SignalR Connection started!'); })
      .catch(err => console.log('SignalR Connection error->', err));


      // service tarafından gelen mesajları dinleme
      this.hubConnection.on('userConnected', (username: string) => {
        console.log(username + ' connected');
      });

      this.hubConnection.on('userDisconnected', (username: string) => {
        console.log(username + ' disconnected');
      });

      this.hubConnection.on('receiveMessage', (username: string, message: string) => {
        console.log(username + ' says: ' + message);
      });

  }

  sendMessage(username:string, message: string) {
    this.hubConnection?.invoke('SendMessageToAll',username, message).catch(err => console.error(err));
  }




}
