// Service Worker pour que flace marche hors connexion
if (navigator.serviceWorker){
 navigator.serviceWorker.register('../sw.js');
}
   

    if (localStorage.getItem("theme")===null){
      localStorage.setItem("theme", "auto")
      location.href = './'
    }

// Script voice


function readtext(){
        
  if (sessionStorage.getItem('api')==='lv1'){
    responsiveVoice.speak(`${localStorage.getItem('popupcontent')}`)
  }
  else{
    responsiveVoice.speak(`${localStorage.getItem('popupcontent')}`, 'French Female')
  }
}
if (localStorage.getItem('first')===null){
            location.href = 'setup.html'
        }