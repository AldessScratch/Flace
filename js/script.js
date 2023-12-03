let items = document.querySelectorAll('.slider .item');
let active = parseInt(localStorage.getItem('matierepref'));
function loadShow(){
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    // show after
    let stt = 0;
    for(var i = active + 1; i < items.length; i ++){
        stt++;
        items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(30px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
     stt = 0;
    for(var i = (active - 1); i >= 0; i --){
        stt++;
        items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(30px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}
loadShow();
let next = document.getElementById('next');
let prev = document.getElementById('prev');
next.onclick = function(){
   active = active + 1 < items.length ?  active + 1 : active;
   loadShow();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active -1 : active;
    loadShow();
}
// Function to be called when mouse wheel scrolling occurs
function handleWheel(event) {
  // Get the deltaY property to determine the direction of the scroll
  var deltaY = event.deltaY;

  // Check if the user is scrolling up or down
  if (deltaY < 0) {
    active = active - 1 >= 0 ? active -1 : active;
    loadShow();
    
  } else if (deltaY > 0) {
    active = active + 1 < items.length ?  active + 1 : active;
   loadShow();
  }
}

// Attach the handleWheel function to the wheel event
window.addEventListener('wheel', handleWheel);
function openlearn(){
    if (sessionStorage.getItem('number')==='0'){
        sessionStorage.setItem('number', 9999)
    }
    location.href = './learn/index.html'
}
function openlib(api, matiere){
    sessionStorage.setItem('api', api)
    sessionStorage.setItem('matiere', matiere)
    location.href = 'learn/library.html'
}
function setuplearn(api, matiere) {
    document.getElementById('seqname').innerHTML = ''
    sessionStorage.setItem('api', api)
    sessionStorage.setItem('matiere', matiere)
    const jsonUrl = './api/' + sessionStorage.getItem('api') + '.json';
fetch(jsonUrl).then(response => response.json()).then(data => {
  
  var values = [];
  for (var key in data) {
    values.push(data[key].seqname);
  }
  var set = new Set(values);
  var uniqueValues = Array.from(set);
  function createOption(value) {
    var option = document.createElement("option");
    option.value = value;
    option.text = value;
    option.setAttribute('id', 'selectoption')
    return option;
  }
  function createSelect(values) {
    var select = document.getElementById("seqname");
    select.appendChild(createOption("Tout"));
    select.setAttribute('id', 'seqname')
    for (var i = 0; i < values.length; i++) {
      select.appendChild(createOption(values[i]));
    }
    return select;
  }
  createSelect(uniqueValues);

}).catch(error => console.error('Error fetching cards:', error));

    document.getElementById('modal2').classList.add('active')
    document.getElementById('overlay').classList.add('active')
    
}

