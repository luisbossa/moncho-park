const videos = [
  "videos/video-1.mp4",
  "videos/video-2.mp4",
  "videos/video-3.mp4",
];

const bgAudio = document.getElementById("bg-audio");

function startAudio() {
  bgAudio.muted = false;
  bgAudio.volume = 0.6;
  bgAudio.play().catch(() => {});
}

window.addEventListener("click", startAudio, { once: true });
window.addEventListener("scroll", startAudio, { once: true });
window.addEventListener("touchstart", startAudio, { once: true });

let currentIndex = 0;

let activeVideo = document.getElementById("video1");
let nextVideo = document.getElementById("video2");

activeVideo.src = videos[currentIndex];
activeVideo.style.opacity = 1;
activeVideo.play();

activeVideo.addEventListener("ended", switchVideo);

function switchVideo() {
  currentIndex = (currentIndex + 1) % videos.length;

  nextVideo.src = videos[currentIndex];
  nextVideo.load();

  nextVideo.addEventListener(
    "loadeddata",
    () => {
      nextVideo.play();

      nextVideo.style.opacity = 1;
      activeVideo.style.opacity = 0;

      setTimeout(() => {
        const temp = activeVideo;
        activeVideo = nextVideo;
        nextVideo = temp;

        activeVideo.addEventListener("ended", switchVideo, { once: true });
      }, 400);
    },
    { once: true },
  );
}

const audioToggle = document.getElementById("audio-toggle");
const iconOn = document.getElementById("icon-sound-on");
const iconOff = document.getElementById("icon-sound-off");

function updateAudioIcon() {
  if (bgAudio.paused) {
    iconOn.style.display = "none";
    iconOff.style.display = "block";
  } else {
    iconOn.style.display = "block";
    iconOff.style.display = "none";
  }
}

audioToggle.addEventListener("click", () => {
  if (bgAudio.paused) {
    bgAudio.play();
  } else {
    bgAudio.pause();
  }
});

bgAudio.addEventListener("play", updateAudioIcon);
bgAudio.addEventListener("pause", updateAudioIcon);
