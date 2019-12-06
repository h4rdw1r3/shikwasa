'use strict';

var playerTemplate = "<div class=\"shk_cover\"> <div class=\"shk_img\"> </div> <button class=\"shk_btn shk_btn_toggle\" aria-label=\"toggle play and pause\"> <svg class=\"shk_btn_play\" aria-hidden=\"true\"> <use xlink:href=\"#shk_icon_play\"/> </svg> <svg class=\"shk_btn_pause\" aria-hidden=\"true\" viewbox=\"0 0 82 82\"> <g fill=\"#FFFFFF\" stroke-width=\"1\" fill-rule=\"evenodd\" transform=\"translate(1.000000, 1.000000)\"> <rect id=\"shk_path_rectangle\" x=\"28\" y=\"20\" width=\"6\" height=\"40\"></rect> <use xlink:href=\"#shk_path_rectangle\" x=\"18\"/> <circle stroke=\"#FFFFFF\" stroke-width=\"2\" fill-opacity=\"0.3\" fill-rule=\"nonzero\" cx=\"40\" cy=\"40\" r=\"40\"></circle> </g> </svg> </button> </div> <div class=\"shk_main\"> <div class=\"shk_text\"> <div> <span class=\"shk_subtitle\"></span> </div> <div> <span class=\"shk_title\"></span> </div> </div> <div class=\"shk_controls\"> <a class=\"shk_btn shk_btn_download\" aria-label=\"download audio\" title=\"download audio\" target=\"_blank\" download> <svg aria-label=\"download audio\"> <use xlink:href=\"#shk_icon_download\"/> </svg> </a> <button class=\"shk_btn shk_btn_backward\" aria-label=\"rewind 10 seconds\" title=\"rewind 10 seconds\"> <svg aria-hidden=\"true\"> <use xlink:href=\"#shk_icon_backward\"/> </svg> </button> <button class=\"shk_btn shk_btn_forward\" aria-label=\"forward 10 seconds\" title=\"forward 10 seconds\"> <svg aria-hidden=\"true\"> <use xlink:href=\"#shk_icon_forward\"/> </svg> </button> <button class=\"shk_btn shk_btn_speed\" aria-label=\"toggle playback rate\" title=\"change playback rate\" aria-live=\"polite\">1.0x</button> <button class=\"shk_btn shk_btn_volume\" aria-label=\"toggle volume\" title=\"toggle volume\"> <svg class=\"shk_btn_unmute\" aria-hidden=\"true\"> <use xlink:href=\"#shk_icon_unmute\"/> </svg> <svg class=\"shk_btn_mute\" aria-hidden=\"true\"> <use xlink:href=\"#shk_icon_mute\"/> </svg> </button> </div> <div class=\"shk_bar-wrap\"> <div class=\"shk_bar\" aria-label=\"progress bar\"> <div class=\"shk_bar_played\" aria-label=\"played progress\"> <span class=\"bar-handle\" aria-label=\"progress bar handle\"></span> </div> <div class=\"shk_bar_loaded\" aria-label=\"loaded progress\"></div> </div> </div> <div class=\"shk_bottom\"> <span class=\"shk_loader\" aria-live=\"polite\"> <span class=\"shk_visuallyhidden\" tabindex=\"-1\">loading</span> <svg aria-hidden=\"true\" aria-label=\"loading\" aria-live=\"polite\" viewbox=\"0 0 66 66\"> <circle cx=\"33\" cy=\"33\" r=\"30\" fill=\"transparent\" stroke=\"url(#shk_gradient)\" stroke-dasharray=\"170\" stroke-dashoffset=\"20\" stroke-width=\"6\"/> <lineargradient id=\"shk_gradient\"> <stop offset=\"50%\" stop-color=\"currentColor\"/> <stop offset=\"65%\" stop-color=\"currentColor\" stop-opacity=\".5\"/> <stop offset=\"100%\" stop-color=\"currentColor\" stop-opacity=\"0\"/> </lineargradient> </svg> </span> <span class=\"shk_time\"> <span class=\"shk_time_now\">--:--</span><span class=\"shk_time_duration\">--:--</span> </span> </div> </div> ";

var iconTemplate = "<svg class=\"shk_icons\" xmlns=\"http://www.w3.org/2000/svg\"> <symbol id=\"shk_icon_play\" viewbox=\"0 0 82 82\"> <g fill=\"none\" fill-rule=\"evenodd\"> <circle stroke=\"#FFF\" stroke-width=\"2\" fill-opacity=\".3\" fill=\"#FFF\" cx=\"41\" cy=\"41\" r=\"40\"/> <path d=\"M27.8 57c-1 0-1.8-.8-1.8-1.6V27.6c0-.9.8-1.6 1.8-1.6l28.6 14.3s1.3 1.2 0 2.4-28.6 14.2-28.6 14.2z\" fill=\"#FBF9F9\"/> </g> </symbol> <symbol id=\"shk_icon_pause\" viewbox=\"0 0 82 82\"> <g fill=\"#FFFFFF\" stroke-width=\"1\" fill-rule=\"evenodd\" transform=\"translate(1.000000, 1.000000)\"> <rect id=\"shk_path_rectangle\" x=\"28\" y=\"20\" width=\"6\" height=\"40\"></rect> <use xlink:href=\"#shk_path_rectangle\" x=\"18\"></use> <circle stroke=\"#FFFFFF\" stroke-width=\"2\" fill-opacity=\"0.3\" fill-rule=\"nonzero\" cx=\"40\" cy=\"40\" r=\"40\"> </circle> </g> </symbol> <symbol id=\"shk_icon_download\" viewbox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"> <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3\"/> </symbol> <symbol id=\"shk_icon_backward\" viewbox=\"0 0 22 24\"> <path d=\"M0 12.95h2.4a8.61 8.61 0 0 0 8.6 8.63c4.75 0 8.6-3.86 8.6-8.63A8.61 8.61 0 0 0 11 4.32V1.9c6.08 0 11 4.95 11 11.05C22 19.05 17.08 24 11 24S0 19.05 0 12.95z\"/> <path d=\"M7.14 8.1h1.21v9.86h-1.6v-7.92c-.6.54-1.34.94-2.25 1.2v-1.6A5.82 5.82 0 0 0 7.14 8.1zM13.92 7.9c1.14 0 2.04.47 2.68 1.44.6.9.91 2.14.91 3.69 0 1.54-.3 2.77-.9 3.68a3.07 3.07 0 0 1-2.69 1.44 3.04 3.04 0 0 1-2.68-1.44c-.6-.9-.9-2.14-.9-3.68 0-1.55.3-2.78.9-3.7a3.01 3.01 0 0 1 2.68-1.43zm0 1.37c-.78 0-1.33.43-1.65 1.31-.22.6-.33 1.41-.33 2.45 0 1.02.11 1.83.33 2.44.32.87.87 1.31 1.65 1.31.77 0 1.32-.44 1.65-1.3.22-.62.33-1.43.33-2.45 0-1.04-.1-1.86-.33-2.45-.33-.88-.88-1.31-1.65-1.31zM2.75 3.28L11 6.56V0z\"/> </symbol> <symbol id=\"shk_icon_forward\" viewbox=\"0 0 22 24\"> <path d=\"M11 1.9v2.42a8.61 8.61 0 0 0-8.6 8.63 8.61 8.61 0 0 0 8.6 8.63c4.75 0 8.6-3.86 8.6-8.63H22C22 19.05 17.08 24 11 24S0 19.05 0 12.95C0 6.85 4.92 1.9 11 1.9z\"/> <path d=\"M7.1 8.12h1.22v9.86H6.7v-7.92c-.6.54-1.33.94-2.24 1.2v-1.6A5.82 5.82 0 0 0 7.1 8.12zM13.9 7.94c1.14 0 2.04.47 2.68 1.44.6.91.91 2.14.91 3.69 0 1.54-.3 2.77-.9 3.69a3.07 3.07 0 0 1-2.69 1.43 3.04 3.04 0 0 1-2.68-1.43c-.6-.92-.9-2.15-.9-3.7 0-1.54.3-2.77.9-3.68a3.01 3.01 0 0 1 2.68-1.44zm0 1.37c-.78 0-1.33.43-1.65 1.31-.22.6-.33 1.41-.33 2.45 0 1.02.11 1.83.33 2.44.32.87.87 1.31 1.65 1.31.77 0 1.32-.44 1.65-1.3.22-.62.33-1.43.33-2.45 0-1.04-.1-1.85-.33-2.45-.33-.88-.88-1.31-1.65-1.31zM19.25 3.28L11 6.56V0z\"/> </symbol> <symbol id=\"shk_icon_unmute\" viewbox=\"0 0 508.514 508.514\" style=\"enable-background:new 0 0 508.514 508.514;\"> <path d=\"M271.483,0.109c-5.784-0.54-12.554,0.858-20.531,5.689c0,0-132.533,115.625-138.286,121.314\n      H39.725c-17.544,0.032-31.782,14.27-31.782,31.814v194.731c0,17.607,14.239,31.782,31.782,31.782h72.941\n      c5.753,5.753,138.286,117.277,138.286,117.277c7.977,4.799,14.747,6.229,20.531,5.689c11.76-1.112,20.023-10.965,22.534-21.358\n      c0.127-1.017,0.127-464.533-0.032-465.55C291.506,11.074,283.211,1.222,271.483,0.109z\"/> <path d=\"M342.962,309.798c-7.85,3.973-10.997,13.508-7.087,21.358c2.829,5.53,8.422,8.74,14.207,8.74\n      c2.384,0,4.799-0.572,7.151-1.684c32.132-16.209,52.091-48.341,52.091-83.938s-19.959-67.728-52.091-83.938\n      c-7.85-3.973-17.385-0.795-21.358,7.056c-3.909,7.85-0.763,17.385,7.087,21.358c21.326,10.743,34.579,32.005,34.579,55.524\n      S364.288,299.055,342.962,309.798z\"/> <path d=\"M339.72,59.32c-8.486-1.716-17.004,3.941-18.593,12.522c-1.716,8.645,3.909,17.004,12.522,18.688\n      c78.312,15.256,135.139,84.128,135.139,163.743S411.962,402.761,333.65,418.017c-8.613,1.684-14.239,10.011-12.554,18.656\n      c1.494,7.596,8.136,12.84,15.542,12.84l3.083-0.318c93.218-18.148,160.851-100.147,160.851-194.922S432.938,77.5,339.72,59.32z\"/> </symbol> <symbol id=\"shk_icon_mute\" viewbox=\"0 0 508.528 508.528\" style=\"enable-background:new 0 0 508.528 508.528;\"> <path d=\"M263.54,0.116c-5.784-0.54-12.554,0.858-20.531,5.689c0,0-132.533,115.625-138.317,121.314H31.782\n      C14.239,127.15,0,141.389,0,158.933v194.731c0,17.607,14.239,31.782,31.782,31.782h72.941\n      c5.784,5.753,138.317,117.277,138.317,117.277c7.977,4.799,14.747,6.229,20.531,5.689c11.76-1.112,20.023-10.965,22.534-21.358\n      c0.095-1.017,0.095-464.533-0.064-465.55C283.563,11.081,275.268,1.228,263.54,0.116z\"/> <path d=\"M447.974,254.28l54.857-54.857c7.596-7.564,7.596-19.864,0-27.428\n      c-7.564-7.564-19.864-7.564-27.428,0l-54.857,54.888l-54.888-54.888c-7.532-7.564-19.864-7.564-27.397,0\n      c-7.564,7.564-7.564,19.864,0,27.428l54.857,54.857l-54.857,54.888c-7.564,7.532-7.564,19.864,0,27.396\n      c7.532,7.564,19.864,7.564,27.396,0l54.888-54.857l54.857,54.857c7.564,7.564,19.864,7.564,27.428,0\n      c7.564-7.532,7.564-19.864,0-27.396L447.974,254.28z\"/> </symbol> <symbol id=\"shk_icon_indicator\" viewbox=\"0 0 66 66\"> <circle cx=\"33\" cy=\"33\" r=\"30\" fill=\"transparent\" stroke=\"url(#shk_gradient)\" stroke-dasharray=\"170\" stroke-dashoffset=\"20\" stroke-width=\"6\"/> <lineargradient id=\"shk_gradient\"> <stop offset=\"50%\" stop-color=\"currentColor\"/> <stop offset=\"65%\" stop-color=\"currentColor\" stop-opacity=\".5\"/> <stop offset=\"100%\" stop-color=\"currentColor\" stop-opacity=\"0\"/> </lineargradient> </symbol> </svg> ";

const CONFIG = {
  container: 'body',
  fixed: {
    type: 'auto',
    position: 'bottom',
  },
  download: false,
  themeColor: '#00869B',
  autoPlay: false,
  muted: false,
  preload: 'metadata',
  speedOptions: [0.5, 0.75, 1.25, 1.5],
  audio: null,
};

function secondToTime(time) {
  time = Math.round(time);
  let hour = Math.floor(time / 3600);
  let min = Math.floor((time - hour * 3600) / 60);
  let sec = Math.floor(time - hour * 3600 - min * 60);
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  if (hour === 0) {
    hour = hour < 10 ? '0' + hour : hour;
    return `${min}:${sec}`
  }
  return `${hour}:${min}:${sec}`
}

function numToString(num) {
  const float = parseFloat(num).toFixed(2);
  return float.slice(-1) === '0' ? float.slice(0, -1) :float
}

function carousel(el, distance = 0, pause = 2000) {
  let carouselTimeout, carouselInterval;
  const duration = distance * 50;
  const interval = duration + pause;
  function transform() {
    el.style.transitionDuration = `${duration / 1000}s`;
    el.style.transform = `translateX(-${distance}px)`;
    carouselTimeout = setTimeout(() => {
      el.style.transform = 'translateX(0px)';
    }, interval);
  }
  transform();
  carouselInterval = setInterval(() => transform(), interval * 2);
  return [carouselTimeout, carouselInterval]
}

function handleOptions(options) {
  options.container = document.querySelector(options.container ? options.container : CONFIG.container);
  options.fixed = options.fixed || CONFIG.fixed;
  options.download = typeof options.download === 'boolean' ? options.download : CONFIG.download;
  const fixedOptions = ['auto', 'static', 'fixed'];
  const result = fixedOptions.filter(item => item === options.fixed.type)[0];
  if (!result) {
    options.fixed.type = CONFIG.fixed.type;
  }
  options.themeColor = options.themeColor || CONFIG.themeColor;
  options.autoPlay = options.autoPlay || CONFIG.autoPlay;
  options.muted = options.muted || CONFIG.muted;
  options.preload = options.preload || CONFIG.preload;
  options.speedOptions = options.speedOptions || CONFIG.speedOptions;
  if (!Array.isArray(options.speedOptions)) {
    options.speedOptions = [options.speedOptions];
  }
  if (!options.speedOptions.includes(1)) {
    options.speedOptions.push(1);
  }
  options.speedOptions = options.speedOptions
  .map(sp => parseFloat(sp))
  .filter(sp => !isNaN(sp));
  if (options.speedOptions.length > 1) {
    options.speedOptions.sort((a, b) => a - b);
  }
  if (!options.audio) {
    console.error('audio is not specified');
  } else {
    options.audio.title = options.audio.title || 'Unknown Title';
    options.audio.artist = options.audio.artist || 'Unknown Artist';
    options.audio.cover = options.audio.cover || null;
    options.audio.duration = options.audio.duration || 0;
  }
  return options
}

function setMediaSession(audio, fns = {}, self) {
  if ('mediaSession' in navigator) {
    /* global MediaMetadata */
    navigator.mediaSession.metadata = new MediaMetadata({
      title: audio.title,
      artist: audio.artist,
      artwork: [
        { src: audio.cover }
      ]
    });
    if (Object.entries(fns).length && fns.constructor === Object) {
      Object.keys(fns).forEach(key => {
        navigator.mediaSession.setActionHandler(key, fns[key].bind(self));
      });
    }
  }
}

let carouselTimeout, carouselInterval;

class Template {
  constructor(options) {
    this.mounted = false;
    const iconExists = document.querySelector('.shk_icons');
    if (!iconExists) {
      this.icons = document.createElement('div');
      this.icons.classList.add('shk_icons');
      this.icons.innerHTML = iconTemplate;
    }
    this.initVariable();
    this.initOptions(options);
  }

  initVariable() {
    this.el = document.createElement('div');
    this.el.tabIndex = 0;
    this.el.classList.add('shk');
    this.el.innerHTML = playerTemplate;
    this.playBtn = this.el.querySelector('.shk_btn_toggle');
    this.downloadBtn = this.el.querySelector('.shk_btn_download');
    this.fwdBtn = this.el.querySelector('.shk_btn_forward');
    this.bwdBtn = this.el.querySelector('.shk_btn_backward');
    this.speedBtn = this.el.querySelector('.shk_btn_speed');
    this.muteBtn = this.el.querySelector('.shk_btn_volume');
    this.artist = this.el.querySelector('.shk_subtitle');
    this.texts = this.el.querySelector('.shk_text');
    this.title = this.el.querySelector('.shk_title');
    this.subtitle = this.el.querySelector('.shk_subtitle');
    this.currentTime = this.el.querySelector('.shk_time_now');
    this.duration = this.el.querySelector('.shk_time_duration');
    this.bar = this.el.querySelector('.shk_bar');
    this.barWrap = this.el.querySelector('.shk_bar-wrap');
    this.audioPlayed = this.el.querySelector('.shk_bar_played');
    this.audioLoaded = this.el.querySelector('.shk_bar_loaded');
    this.handle = this.el.querySelector('.bar-handle');
    this.cover = this.el.querySelector('.shk_img');
  }

  initOptions(options) {
    this.el.style = `--theme-color: ${options.themeColor}`;
    this.el.style.boxShadow = `0px 0px 14px 6px ${options.themeColor}20`;
    this.audioPlayed.style.color = options.themeColor + '70';
    options.autoPlay ? this.el.classList.add('Play') : this.el.classList.add('Pause');
    if (options.download && options.audio && options.audio.src) {
      this.downloadBtn.href = options.audio.src;
    } else {
      this.downloadBtn.remove();
    }
    if (options.fixed.type !== 'static') {
      options.fixed.type === 'fixed' ? this.el.classList.add('Fixed') : this.el.classList.add('Auto');
      if (options.fixed.position === 'top') {
        this.el.classList.add('Top');
      }
    }
    if (options.muted) {
      this.el.classList.add('Mute');
    }
    if (options.audio) {
      this.update(options.audio);
    }
  }

  update(audio) {
    this.cover.style.backgroundImage = `url(${audio.cover})`;
    this.title.innerHTML = audio.title;
    if (this.mounted) {
      this.textScroll();
    }
    this.artist.innerHTML = audio.artist;
    this.currentTime.innerHTML = '00:00';
    this.duration.innerHTML = audio.duration ? secondToTime(audio.duration) : '00:00';
    this.downloadBtn.href= audio.src;
  }

  textScroll() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      clearTimeout(carouselTimeout);
    }
    const titleOverflow = this.title.offsetWidth - this.texts.offsetWidth;
    if (titleOverflow > 0) {
      [carouselTimeout, carouselInterval] = carousel(this.title, titleOverflow);
    } else {
      this.title.style.transform = 'none';
      this.title.style.transitionDuration = '0s';
    }
  }

  mount(container) {
    container.innerHTML = '';
    container.append(this.el);
    if (this.icons) {
      container.append(this.icons);
    }
    this.mounted = true;
    this.textScroll();
  }

  destroy() {
    if (clearInterval) {
      clearInterval(carouselInterval);
      clearTimeout(carouselTimeout);
    }
  }
}

class Bar {
  constructor(template) {
    this.audioPlayed = template.audioPlayed;
    this.audioLoaded = template.audioLoaded;
  }

  set (type, percentage) {
    percentage = Math.min(percentage, 1);
    percentage = Math.max(percentage, 0);
    this[type].style.width = percentage * 100 + '%';
  }
}

class Events {
  constructor() {
    this.audioEvents = ['abort', 'canplay', 'canplaythrough', 'complete', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
    this.events = {};
  }

  on(name, callback) {
    if (!this.audioEvents.includes(name) || typeof callback !== 'function') {
      console.error('invalid event name or callback function');
    } else {
      if (!this.events[name]) {
        this.events[name] = [];
      }
      this.events[name].push(callback);
    }
  }

  trigger(name, data = {}) {
    if (this.events[name] && this.events[name].length) {
      this.events[name].forEach(fn => fn(data));
    }
  }
}

const playerArr = [];
let initSeek;
const isMobile = typeof window !== 'undefined' ? /mobile/i.test(window.navigator.userAgent) : false;
const dragStart = isMobile ? 'touchstart' : 'mousedown';
const dragMove = isMobile ? 'touchmove' : 'mousemove';
const dragEnd = isMobile ? 'touchend' : 'mouseup';

class Player {
  constructor(options) {
    this.id = playerArr.length;
    playerArr.push(this);
    this.inited = false;
    this.canplay = false;
    this.dragging = false;
    this.options = handleOptions(options);
    this.muted = this.options.muted;
    this.initUI();
    this.initKeyEvents();
    this.currentSpeed = 1;
    this.events = new Events();
    this.initAudio();
    this.template.mount(this.options.container);
  }

  get duration() {
    if (!this.audio || !this.audio.src) {
      return this.options.audio.duration
    } else {
      return isNaN(this.audio.duration) ? this.options.audio.duration : this.audio.duration
    }
  }

  get currentTime() {
    return this.audio ? this.audio.currentTime : undefined
  }

  initUI() {
    this.template = new Template(this.options);
    this.el = this.template.el;
    this.bar = new Bar(this.template);
    this.initButtonEvents();
    this.initBarEvents();
  }

  initButtonEvents() {
    this.template.playBtn.addEventListener('click', () => {
      this.toggle();
    });
    this.template.muteBtn.addEventListener('click', () => {
      this.muted = !this.muted;
      this.el.classList.toggle('Mute');
      if (this.audio) {
        this.audio.muted = this.muted;
      }
    });
    this.template.fwdBtn.addEventListener('click', () => {
      this.seekForward();
    });
    this.template.bwdBtn.addEventListener('click', () => {
      this.seekBackward();
    });
    this.template.speedBtn.addEventListener('click', () => {
      const index = this.options.speedOptions.indexOf(this.currentSpeed);
      const speedRange = this.options.speedOptions;
      this.currentSpeed = (index + 1 >= speedRange.length) ? speedRange[0] : speedRange[index + 1];
      this.template.speedBtn.innerHTML = numToString(this.currentSpeed) + 'x';
      if (this.audio) {
        this.audio.playbackRate = this.currentSpeed;
      }
    });
  }

  initBarEvents() {
    let seekingTime;
    const dragStartHandler = () => {
      this.el.classList.add('Seeking');
      this.dragging = true;
      document.addEventListener(dragMove, dragMoveHandler);
      document.addEventListener(dragEnd, dragEndHandler);
    };
    const dragMoveHandler = (e) => {
      const offset = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
      let percentage = (offset - this.template.barWrap.getBoundingClientRect().left) / this.template.barWrap.clientWidth;
      percentage = Math.min(percentage, 1);
      percentage = Math.max(0, percentage);
      seekingTime = percentage * this.duration;
      this.setDisplayAndBarByTime(seekingTime);
    };
    const dragEndHandler = () => {
      this.dragging = false;
      this.el.classList.remove('Seeking');
      this.seek(seekingTime);
      document.removeEventListener(dragMove, dragMoveHandler);
      document.removeEventListener(dragEnd, dragEndHandler);
    };
    const instantSeek = (e) => {
      if (this.dragging) return
      dragMoveHandler(e);
      this.seek(seekingTime);
    };
    this.template.barWrap.addEventListener(dragEnd, instantSeek);
    this.template.handle.addEventListener(dragStart, dragStartHandler);
  }

  initKeyEvents() {
    const pressSpace = (e) => {
      if (e.keyCode === 32) {
        const activeEl = document.activeElement;
        if (!activeEl.classList.contains('shk_btn_toggle')) {
          this.toggle();
        }
      }
    };
    this.el.addEventListener('keyup', pressSpace);
  }

  initAudio() {
    if (this.options.audio.src) {
      this.audio = new Audio();
      this.audio.title = this.options.audio.title;
      this.initLoadingEvents();
      this.initAudioEvents();
      this.events.audioEvents.forEach(name => {
        this.audio.addEventListener(name, (e) => {
          this.events.trigger(name, e);
        });
      });
      if (this.options.preload !== 'none') {
        this.updateAudio(this.options.audio.src);
        this.inited = true;
      }
    }
  }

  initAudioEvents() {
    this.on('play', () => {
      if (this.el.classList.contains('Pause')) {
        this.setUIPlaying();
      }
      playerArr.forEach(player => {
        if (player.id !== this.id && player.audio && !player.audio.paused) {
          player.pause();
        }
      });
    });
    this.on('pause', () => {
      if (this.el.classList.contains('Play')) {
        this.setUIPaused();
      }
    });
    this.on('ended', () => {
      this.setUIPaused();
      this.seek(0);
    });
    this.on('durationchange', () => {
      if (this.duration !== 1) {
        this.template.duration.innerHTML = secondToTime(this.duration);
      }
    });
    this.on('progress', () => {
      if (this.audio.buffered.length) {
        const percentage = this.audio.buffered.length ? this.audio.buffered.end(this.audio.buffered.length - 1) / this.duration : 0;
        this.bar.set('audioLoaded', percentage);
      }
    });
    this.on('timeupdate', () => {
      if (!this.dragging) {
        this.setDisplayAndBarByTime(this.audio.currentTime);
      }
    });
  }

  initLoadingEvents() {
    this.on('canplaythrough', () => {
      if (this.el.classList.contains('Loading')) {
        this.el.classList.remove('Loading');
      }
    });
    this.on('waiting', () => {
      if (!this.el.classList.contains('Loading')) {
        this.el.classList.add('Loading');
      }
    });
    this.on('canplay', () => {
      if (!this.canplay) {
        this.canplay = true;
        if (initSeek) {
          this.seek(initSeek);
        }
      }
    });
  }

  on(name, callback) {
    this.events.on(name, callback);
  }

  setDisplayAndBarByTime(time) {
    time = time || 0;
    const percentage = time / this.duration || 0;
    this.template.currentTime.innerHTML = secondToTime(time);
    this.bar.set('audioPlayed', percentage);
  }

  setUIPlaying() {
    this.el.classList.add('Play');
    this.el.classList.remove('Pause');
  }

  setUIPaused() {
    this.el.classList.add('Pause');
    this.el.classList.remove('Play');
    this.el.classList.remove('Loading');
  }

  play(audio) {
    if (!this.inited) {
      this.audio.src = this.options.audio.src;
      this.inited = true;
    }
    if (audio && audio.src) {
      this.template.update(audio);
      this.updateAudio(audio.src);
    }
    if (!this.audio.paused) return
    const promise = this.audio.play();
    const self = this;
    const targetAudio = audio || this.options.audio;
    const controls = {
      play: this.play,
      pause: this.pause,
      seekforward: this.seekForward,
      seekbackward: this.seekBackward,
    };
    if (promise instanceof Promise) {
      promise.then(() => {
        setMediaSession(targetAudio, controls, self);
      });
      promise.catch((e) => {
        if (e.name === 'NotAllowedError' || e.name === 'NotSupportedError') {
          this.pause();
        }
      });
    } else {
      setMediaSession(targetAudio, controls, self);
    }
  }

  pause() {
    if (this.audio.paused) return
    this.audio.pause();
  }

  toggle() {
    if (!this.inited) {
      this.audio.src = this.options.audio.src;
      this.inited = true;
    }
    this.audio.paused ? this.play() : this.pause();
  }

  seek(time) {
    let _time = parseInt(time);
    if (isNaN(_time)) {
      console.error('seeking time is NaN');
      return
    }
    _time = Math.min(_time, this.duration);
    _time = Math.max(_time, 0);
    this.setDisplayAndBarByTime(_time);
    if (!this.canplay) {
      initSeek = time;
    } else if (this.audio) {
      this.audio.currentTime = _time;
    }
  }

  seekForward(time = 10) {
    const seekingTime = Math.min(this.duration, this.audio.currentTime + time);
    this.seek(seekingTime);
  }

  seekBackward(time = 10) {
    const seekingTime = Math.max(0, this.audio.currentTime - time);
    this.seek(seekingTime);
  }

  updateAudio(src) {
    this.audio.src = src;
    this.audio.preload = this.options.preload;
    this.audio.muted = this.muted;
    if (this.options.autoplay && this.muted) {
      this.audio.autoplay = this.options.autoPlay;
    }
    this.audio.playbackRate = this.currentSpeed;
  }

  destroyAudio() {
    this.audio.pause();
    this.audio.src = '';
    this.audio.load();
    this.audio = null;
  }

  destroy() {
    this.destroyAudio();
    this.template.destroy();
    this.options.container.innerHTML = '';
  }
}

console.log(`%c🍊%c Shikwasa Podcast Player v1.0.7 %c https://jessuni.github.io/shikwasa/`,'background-color:#00869B40;padding:4px;','background:#00869B80;color:#fff;padding:4px 0','padding: 2px 0;');

module.exports = Player;