for (const trailer of document.querySelectorAll('[data-trailer]')) {
  const video = trailer.querySelector('video');
  const button = trailer.querySelector('.trailer-play');
  const label = trailer.querySelector('[data-play-label]');
  const status = trailer.querySelector('.trailer-status');
  const initialLabel = button.getAttribute('aria-label');
  let attempt = 0;

  function showStatus(message) {
    status.textContent = message;
    status.hidden = !message;
  }

  function failed() {
    // Native controls stay available, while an explicit retry can reload a failed request.
    button.hidden = false;
    label.textContent = '重试播放';
    button.setAttribute('aria-label', initialLabel.replace(/^播放/, '重试播放'));
    showStatus('视频暂时无法播放，请重试。也可以继续浏览或直接试玩。');
    if (document.activeElement === video) button.focus({ preventScroll: true });
  }

  button.hidden = false;
  button.addEventListener('click', () => {
    const currentAttempt = ++attempt;
    button.hidden = true;
    showStatus('正在加载宣传视频…');
    video.removeAttribute('aria-hidden');
    video.controls = true;
    video.tabIndex = 0;
    // Assigning the URL only in this user gesture keeps the video off the initial network path.
    video.src = video.dataset.src;
    video.load();
    video.focus({ preventScroll: true });
    video.play().catch(error => {
      if (currentAttempt !== attempt) return;
      // Pausing while the first frame loads legitimately interrupts play(); it is not a media error.
      if (error.name === 'AbortError') {
        if (button.hidden) showStatus('');
      } else failed();
    });
  });
  video.addEventListener('playing', () => {
    button.hidden = true;
    showStatus('');
  });
  video.addEventListener('pause', () => {
    if (button.hidden) showStatus('');
  });
  video.addEventListener('error', failed);
}
