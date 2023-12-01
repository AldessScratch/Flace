// Service Worker pour que flace marche hors connexion
if (navigator.serviceWorker){
 navigator.serviceWorker.register('../sw.js');
}
   

    if (localStorage.getItem("theme")===null){
      localStorage.setItem("theme", "auto")
      location.href = './'
    }

  