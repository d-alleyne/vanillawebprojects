const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

function toggleVideoState() {
  const icon = play.children[0];
  if (video.paused || video.ended) {
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
    video.play();
  } else {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
    video.pause();
  }
}

function sec2time(timeInSeconds) {
  const pad = function (num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);
  return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
}

function updateTime() {
  progress.value = (video.currentTime / video.duration) * progress.max;
  timestamp.innerHTML = sec2time(video.currentTime);
}

video.addEventListener('timeupdate', updateTime);
stop.addEventListener('click', e => {
  video.currentTime = 0;
  progress.value = 0;
  if (!video.paused) {
    toggleVideoState();
  }
});
video.addEventListener('click', toggleVideoState);
play.addEventListener('click', toggleVideoState);
progress.addEventListener('change', e => {
  console.log(`value ${e.target.value} max ${e.target.max} duration ${video.duration}`)
  const videoFrame = e.target.value / e.target.max * video.duration;
  console.log(`position videoFrame ${videoFrame}`);
  video.currentTime = Math.floor(videoFrame);
})