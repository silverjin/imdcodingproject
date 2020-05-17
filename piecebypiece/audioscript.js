// Useful functions
function removeClass(el, className){
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function addClass(el, className){
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
}

function replaceClass(el, className, className2){
  removeClass(el, className);
  addClass(el, className2);
}

var url = 'http://eunjinahn.me/imdcodingproject/codingtest/ourcountryisone.mp3';

var audio = new Audio(url);

// Controls
var timeUI = document.getElementById('time');
var playButton = document.getElementById('play');
var prevButton = document.getElementById('prev');
var nextButton = document.getElementById('next');
var navUI = document.getElementById('nav');
var volumeButton = document.getElementById('volume');
var volumeUI = document.querySelectorAll('#volume .container .range')[0];

// UI Events
playButton.onclick = function(e){
  if(audio.paused){
    audio.play();
    replaceClass(this, 'entypo-play',  'entypo-pause');
  } else {
    audio.pause();
    replaceClass(this, 'entypo-pause', 'entypo-play');
  }
};

navUI.addEventListener('click', function(){
  audio.currentTime = this.value;
});

volumeUI.addEventListener('change', function(){
  audio.volume = this.value/100;
});



//Audio Events
var setUITime = function(){
  navUI.value = audio.currentTime;
  var minutes, seconds;
  minutes = Math.floor(audio.duration/60) - Math.floor(audio.currentTime/60);
  seconds = Math.floor(audio.duration) - Math.floor(audio.currentTime);
  if(minutes < 10) minutes = '0'+minutes;
  if(seconds < 10) seconds = '0'+seconds;
  timeUI.innerHTML = minutes+':'+seconds;
}

audio.addEventListener('timeupdate', setUITime);

var checkDuration = function(){
  navUI.max = audio.duration;
  document.getElementsByClassName('player')[0].style.opacity = 1;
  audio.removeEventListener('loadeddata', checkDuration);
  audio.volume = 50;
}

audio.addEventListener('loadeddata', checkDuration);

audio.addEventListener('ended', function(){
  audio.currentTime = 0;
  replaceClass(playButton, 'entypo-pause', 'entypo-play');
});
