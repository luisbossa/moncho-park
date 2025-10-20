const videos = [
  "videos/video-1.mp4",
  "videos/video-2.mp4",
  "videos/video-3.mp4",
];

let currentIndex = 0;
let activeVideo = document.getElementById("video1");
let nextVideo = document.getElementById("video2");

// Inicializa el primer video
activeVideo.src = videos[currentIndex];
activeVideo.style.opacity = 1;
activeVideo.play();

// Cuando termina el video actual
activeVideo.addEventListener("ended", switchVideo);

function switchVideo() {
  currentIndex = (currentIndex + 1) % videos.length;

  // Cargar el siguiente video en el otro elemento
  nextVideo.src = videos[currentIndex];
  nextVideo.load();

  nextVideo.addEventListener(
    "loadeddata",
    () => {
      nextVideo.play();

      // Inicia la transición
      nextVideo.style.opacity = 1;
      activeVideo.style.opacity = 0;

      // Espera al final de la transición (1s)
      setTimeout(() => {
        // Intercambia los elementos
        const temp = activeVideo;
        activeVideo = nextVideo;
        nextVideo = temp;

        // Vuelve a escuchar el evento "ended" del nuevo video activo
        activeVideo.addEventListener("ended", switchVideo, { once: true });
      }, 400); // coincide con el CSS (1s)
    },
    { once: true }
  );
}
