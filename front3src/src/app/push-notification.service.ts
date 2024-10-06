import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';  // Assurez-vous que cette importation est correcte

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  readonly VAPID_PUBLIC_KEY = 'BM1L1kx3_n8cSzr5XCBIgh31_8XdYhzdP94qTLQSlH_5o_NW2AeLz0h3o5idi86sGvktSHcMpsNMpB7UnVuAnJo';

  constructor(private swPush: SwPush, private http: HttpClient) {}  // Injection de HttpClient

  // Méthode pour s'abonner aux notifications
  subscribeToNotifications() {
    if (this.swPush.isEnabled) {
        console.log("enabled")
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(subscription => {

        this.sendSubscriptionToTheServer(subscription).subscribe();
      })
      .catch(err => console.error('Erreur d\'inscription aux notifications :', err));
    }
  }

  // Méthode pour envoyer l'abonnement au serveur
  private sendSubscriptionToTheServer(subscription: PushSubscription) {
    console.log(subscription)
    return this.http.post('http://localhost:3001/subscribe', subscription);
  }
}
