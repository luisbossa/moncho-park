const videos = [
  "videos/video-1.mp4",
  "videos/video-2.mp4",
  "videos/video-3.mp4",
];

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
    { once: true }
  );
}
