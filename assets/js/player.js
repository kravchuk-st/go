const players = document.querySelectorAll('.player');

players.forEach((el) => {
  el.addEventListener('click', (e) => {
    if (e.target.classList.contains('video-btn')) {
      const target = e.currentTarget;
      const video = target.querySelector('.player__video');
      const playIcon = target.querySelector('.play-icon');
      const controlPlayer = target.querySelector('.player__controls');
      const progress = target.querySelector('.progress');
      const time = target.querySelector('.controls-time');
      const allTime = target.querySelector('.controls-allTime');
      const controlMute = target.querySelector('.volume-icon');
      const controlVol = target.querySelector('.volume');
      const fullScreen = target.querySelector('.fullscreen-icon');
      const modal = document.querySelector('#modal-video');

      let timeout;

      target.querySelector('.video-btn').style.display = "none";
      target.querySelector('.poster').style.display = "none";
      controlPlayer.style.display = "flex";

      toogleVideoStatus();

      target.addEventListener('mousemove', () => mouseMoveListener());
      video.addEventListener('click', toogleVideoStatus);
      video.addEventListener('timeupdate', updateProgress);
      playIcon.addEventListener('click', toogleVideoStatus);
      progress.addEventListener('input', setProgress);
      progress.addEventListener('input', updateProgressCSS);
      controlVol.addEventListener('input', updateVol);
      controlMute.addEventListener('click', updateMute)
      fullScreen.addEventListener('click', goFullScreen);

      modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
          video.pause();
          playIcon.classList.remove('pause');
        }
      });

      video.addEventListener('loadeddata', () => {
        let allMinutes = Math.floor(video.duration / 60);
          if (allMinutes < 10){
            allMinutes = '0' + allMinutes;
          }

        let allSeconds = Math.floor(video.duration % 60);
          if (allSeconds < 10){
            allSeconds = '0' + allSeconds;
          }

        allTime.innerHTML = `${allMinutes}:${allSeconds}`;
      });

      function toogleVideoStatus() {
        if (video.paused) {
          video.play();
          playIcon.classList.add('pause');
        } else {
          video.pause();
          playIcon.classList.remove('pause');
        };
      }

      function updateProgress() {
        progress.value = (video.currentTime / video.duration) * 100;
        let minutes = Math.floor(video.currentTime / 60);
          if (minutes < 10){
            minutes = '0' + minutes;
          }
        let seconds = Math.floor(video.currentTime % 60);
          if (seconds < 10){
            seconds = '0' + seconds;
          }
        time.innerHTML = `${minutes}:${seconds}`

        updateProgressCSS();
      }

      function setProgress() {
        video.currentTime = progress.value * video.duration / 100;
      }

      let previusVolume = null;

      function updateMute() {
        if (previusVolume !== null) {
          video.volume = previusVolume;
          previusVolume = null;
          controlMute.classList.remove('mute');
        } else {
          previusVolume = video.volume;
          video.volume = 0;
          controlMute.classList.add('mute');
        }
      }

      function updateVol(){
        let volume = this.value;
        video.volume = volume;
        controlVol.style.background = `linear-gradient(to right, #ff4f15 0%, #ff4f15 ${volume * 100}%, #fff ${volume * 100}%, #fff 100%)`;
        if (video.volume != 0) {
          controlMute.classList.remove('mute');
        } else {
          controlMute.classList.add('mute');
        }
      }
        
      function updateProgressCSS(){
        const prog = progress.value;
        progress.style.background = `linear-gradient(to right, #ff4f15 0%, #ff4f15 ${prog}%, #fff ${prog}%, #fff 100%)`;
      }

      function goFullScreen(){
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullScreen) {
          video.msRequestFullScreen();
        }
      }

      function mouseMoveListener() {
        controlPlayer.classList.add('show');
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          controlPlayer.classList.remove('show');
        }, 3000);
      }
    }
  });
});
