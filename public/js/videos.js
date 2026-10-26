(() => {
  const wrapper = document.querySelector(".hero-bg-video-wrapper");
  const bgAudio = document.getElementById("bg-audio");
  if (!wrapper || !bgAudio) return;

  // ===== AUDIO =====
  const audioToggle = document.getElementById("audio-toggle");
  const iconOn = document.getElementById("icon-sound-on");
  const iconOff = document.getElementById("icon-sound-off");

  const isPlaying = () => !bgAudio.paused && !bgAudio.muted;

  function startAudio() {
    bgAudio.muted = false;
    bgAudio.volume = 0.6;
    bgAudio.play().catch(() => {});
  }

  // La primera interacción activa la música (salvo que sea el propio botón de audio)
  const autoStartEvents = ["click", "scroll", "touchstart"];
  function autoStart(e) {
    autoStartEvents.forEach((evt) => window.removeEventListener(evt, autoStart));
    if (!e.target.closest?.("#audio-toggle")) startAudio();
  }
  autoStartEvents.forEach((evt) => window.addEventListener(evt, autoStart, { passive: true }));

  function updateAudioIcon() {
    const playing = isPlaying();
    iconOn.style.display = playing ? "block" : "none";
    iconOff.style.display = playing ? "none" : "block";
    audioToggle.setAttribute("aria-pressed", playing);
  }

  audioToggle.addEventListener("click", () => {
    if (isPlaying()) bgAudio.pause();
    else startAudio();
  });

  ["play", "pause", "volumechange"].forEach((evt) => bgAudio.addEventListener(evt, updateAudioIcon));
  updateAudioIcon();

  // ===== VIDEOS (lista renderizada por EJS) =====
  const videos = JSON.parse(wrapper.dataset.videos);
  let currentIndex = 0;
  let activeVideo = document.getElementById("video1");
  let nextVideo = document.getElementById("video2");

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
          [activeVideo, nextVideo] = [nextVideo, activeVideo];
          activeVideo.addEventListener("ended", switchVideo, { once: true });
        }, 400);
      },
      { once: true }
    );
  }

  activeVideo.addEventListener("ended", switchVideo, { once: true });
  activeVideo.play().catch(() => {});

  // Pausa el video cuando el hero no se ve (ahorra CPU y batería)
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) activeVideo.play().catch(() => {});
      else activeVideo.pause();
    }).observe(wrapper);
  }
})();
