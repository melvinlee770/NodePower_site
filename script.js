/* ===== STAX site interactions ===== */
(function () {
  'use strict';

  /* --- sticky nav shrink --- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('shrink', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- video playback: autoplay, loop, and skip the "SYSTEMS MONITOR" title
     card that sits at the tail end of the source clip (~7.35s onward) --- */
  const videos = [document.getElementById('heroVideo'), ...document.querySelectorAll('.loopVideo')];

  videos.forEach((video) => {
    if (!video) return;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= 7.35) {
        video.currentTime = 0.01;
      }
    });

    const tryPlay = () => video.play().catch(() => {});
    if (video.readyState >= 2) tryPlay();
    else video.addEventListener('loadeddata', tryPlay, { once: true });
  });
})();
