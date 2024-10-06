import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PushNotificationService } from './push-notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
  constructor(private pushService: PushNotificationService) {}

  ngOnInit() {
    // Appeler la méthode d'abonnement pour activer les notifications push
    this.pushService.subscribeToNotifications();
    console.log("created")
  }
}
