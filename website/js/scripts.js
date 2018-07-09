function fitToScreen(el, marginX, marginY) {
  var elWidth = el.offsetWidth;
  var elHeight = el.offsetHeight;
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var limitWidth = screenWidth - marginX;
  var limitHeight = screenHeight - marginY;
  if (elWidth > limitWidth) {
    var scaleRatio = limitWidth / elWidth;
    anime.setValue(el, { scale: scaleRatio });
  }
  if (elHeight > limitHeight) {
    var scaleRatio = limitHeight / elHeight;
    anime.setValue(el, { scale: scaleRatio });
  }
}

var logoAnimation = (function() {

  function getPathDuration(el, speed) {
    return anime.setDashoffset(el) * speed;
  }

  var logoAnimationEl = document.querySelector('.anime-logo-animation');
  var bouncePath = anime.path('.bounce path');

  //fitToScreen(logoAnimationEl, 64, 16);

  var resizeTimeout = null;

  // window.addEventListener('resize', function(e) {
  //   clearTimeout(resizeTimeout);
  //   resizeTimeout = setTimeout(function() {
  //     fitToScreen(logoAnimationEl, 64, 16);
  //   }, 100);
  // });

  anime.setValue('.fill', {opacity: 0});
  anime.setValue(['.letter-a', '.letter-n', '.letter-i'], {translateX: 56});
  anime.setValue('.letter-e', {translateX: -56});
  anime.setValue('.dot', {
    translateX: '2.8em',
    translateY: '-.625em'
  });

  var logoAnimationTL = anime.timeline({
    easing: 'easeOutSine',
    autoplay: false
  });

  logoAnimationTL
  .add({
    targets: '.letter-i .line',
    duration: 0,
    begin: function(a) { a.animatables[0].target.removeAttribute('stroke-dasharray'); }
  }, 0)
  .add({
    targets: '.bounced',
    transformOrigin: ['50% 100% 0px', '50% 100% 0px'],
    translateY: [
      {value: ['.8em', '-.8em'], duration: 200, endDelay: 20, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
      {value: '.025em', duration: 120, easing: 'easeInQuad'},
      {value: '0em', duration: 120, easing: 'easeOutQuad'}
    ],
    scaleX: [
      {value: [.55, .85], duration: 190, easing: 'easeOutSine'},
      {value: 1.076, duration: 120, delay: 85, easing: 'easeInOutSine'},
      {value: 1, duration: 260, delay: 25, easing: 'easeOutQuad'}
    ],
    scaleY: [
      {value: [.8, 1.3], duration: 120, easing: 'easeOutSine'},
      {value: .7, duration: 120, delay: 180, easing: 'easeInOutSine'},
      {value: 1.05, duration: 180, delay: 25, easing: 'easeOutQuad'},
      {value: 1, duration: 250, delay: 15, easing: 'easeOutQuad'}
    ],
    translateZ: 0,
    delay: function(el, i) { return i * 45 }
  }, 300)
  .add({
    targets: '.dot',
    translateY: '1.675em',
    translateZ: 0,
    scaleY: [4, .7],
    scaleX: { value: 1.3, delay: 100, duration: 200 },
    easing: 'cubicBezier(0.350, 0.560, 0.305, 1)',
    duration: 380
  }, '-=490')
  .add({
    targets: '.letter-m .line',
    easing: 'easeOutElastic(1, .8)',
    duration: 600,
    d: function(el) { return el.dataset.d2 },
    begin: function(a) { a.animatables[0].target.removeAttribute('stroke-dasharray'); }
  }, '-=290')
  .add({
    targets: ['.letter-a', '.letter-n', '.letter-i'],
    translateX: 0,
    easing: 'easeOutElastic(1, .8)',
    duration: 800,
    delay: function(el, i, t) { return (t - i) * 20 },
    begin: function(a) {  a.animatables[2].target.removeAttribute('stroke-dasharray'); }
  }, '-=600')
  .add({
    targets: '.letter-e',
    translateX: 0,
    easing: 'easeOutElastic(.8, .7)',
    duration: 800
  }, '-=840')
  .add({
    targets: '.dot',
    translateX: bouncePath('x'),
    translateY: bouncePath('y'),
    translateZ: 0,
    rotate: 360,
    scaleX: [
      { value: 1, duration: 50, easing: 'easeOutSine' }
    ],
    scaleY: [
      { value: [1, 1.5], duration: 50, easing: 'easeInSine' },
      { value: 1, duration: 50, easing: 'easeOutExpo' }
    ],
    easing: 'cubicBezier(0, .74, 1, .255)',
    duration: 800
  }, '-=660')
  .add({
    targets: '.letter-i rect',
    opacity: 0,
    duration: 1
  })
  .add({
    targets: '.dot',
    scaleY: 1,
    scaleX: 1,
    translateY: [
      {value: '1.6375em', duration: 100, easing: 'easeOutSine'},
      {value: '1.525em', duration: 1000, easing: 'easeOutElastic(1, .8)'}
    ]
  })
  .add({
    targets: '.letter-m .line',
    d: function(el) { return el.dataset.d3 },
    easing: 'spring(.2, 200, 3, 60)',
  }, '-=1904')
  .add({
    targets: '.letter-i .line',
    transformOrigin: ['50% 100% 0', '50% 100% 0'],
    d: function(el) { return el.dataset.d2 },
    easing: 'cubicBezier(0.400, 0.530, 0.070, 1)',
    duration: 80
  }, '-=1110')
  .add({
    targets: ['.letter-i', '.letter-n', '.letter-m', '.letter-a', '.letter-e'],
    translateY: [
      {value: '.20625em', duration: '.9375em'},
      {value: 0, duration: 800, easing: 'easeOutElastic(1, .6)'}
    ],
    strokeDashoffset: [anime.setDashoffset, 0],
    delay: function(el, i) { return Math.round(i / 2) * 30 }
  }, '-=1100')
  .add({
    targets: ['.anime-logo-subtitle'],
    opacity: 1,
    translateY: ['-.125em', 0],
    easing: 'easeOutElastic(1, .6)',
    duration: 1000,
  }, '-=1010')
  // .add({
  //   begin: initSphereAnimation
  // }, '-=1500')

  //anime.speed = .1;
  // logoAnimationTL.seek(3000);

  logoAnimationEl.classList.add('is-visible');

  return logoAnimationTL;

})();

// demo
window.onload = logoAnimation.play;
document.body.onclick = function() { location.reload() };
document.body.ontouchend = function() { location.reload() };