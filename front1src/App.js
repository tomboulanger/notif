import React, { useEffect } from "react";

const publicVapidKey = "BM1L1kx3_n8cSzr5XCBIgh31_8XdYhzdP94qTLQSlH_5o_NW2AeLz0h3o5idi86sGvktSHcMpsNMpB7UnVuAnJo"; // Clé publique générée avec web-push

// Convertit une clé URL Base64 en un Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const App = () => {
  useEffect(() => {
    const registerPush = async () => {
      if ("serviceWorker" in navigator) {
        try {
          // Enregistre le Service Worker
          const register = await navigator.serviceWorker.register("/worker.js", {
            scope: "/",
          });
          console.log("Service Worker enregistré:", register);

          // S'inscrire aux notifications push
          const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
          });

          // Envoyer l'abonnement au serveur
          await fetch("http://localhost:3001/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log("Utilisateur inscrit aux notifications push");
        } catch (error) {
          console.error("Erreur lors de l'inscription:", error);
        }
      }
    };

    registerPush();
  }, []);

  return (
    <div className="App">
      <h1>Notifications Push avec Service Workers</h1>
      <p>Les notifications seront envoyées même si l'onglet est fermé.</p>
    </div>
  );
};

export default App;
