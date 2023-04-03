const $ = (s) => document.querySelector(s);

const MAX_IMAGE_WIDTH = 1280;

const LIGHT_MODE_CLASS = 'light-mode';

let resizeTimeout = null;

let screenSize = {};

const getImageUrl = async ({w, h}) => {
  return await fetch(`https://picsum.photos/${w}/${h}`)
}

const getScreenSize = () => {
  const wW = window.innerWidth;
  const wH = window.innerHeight;
  if(wW <= MAX_IMAGE_WIDTH) {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    }
  }
  return {
    w: MAX_IMAGE_WIDTH,
    h: Math.round(MAX_IMAGE_WIDTH / (wW / wH))
  }
}

screenSize = getScreenSize();

$loader = document.querySelector('#loader');

window.onresize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    screenSize = getScreenSize();
  }, 500)
}

class YImage {
  constructor(target, options) {
    this.imgUrl = "";
    this.imgTarget = document.querySelector(target);
    this.execTime = options.execTime;
  }

  async loadImageUrl () {
    this.imgUrl = await fetch(`https://picsum.photos/${screenSize.w}/${screenSize.h}`).then(r => r.url);
    this.downloadImage();
  }

  downloadImage () {
    this.imgTarget.src = this.imgUrl;
    this.imgTarget.onload = (e) => {
      this.imgTarget.classList.add('active');
      $loader.classList.add('hidden');
      setTimeout(() => {
        this.removeImage();
        setTimeout(() => {
          this.loadImageUrl();
        }, 1000)
      }, this.execTime)
    }
  }

  removeImage () {
    this.imgTarget.classList.remove('active');
    $loader.classList.remove('hidden');
  }
}

const imageMain = new YImage('#mainImage', {execTime: 7000});
imageMain.loadImageUrl();

const classToToggle = [
  $('#overlay'),
  $('#mainImage'),
  $('#main')
];

const wait = async (time) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, time)
})

$('#continue').addEventListener('click', async (e) => {
  await wait(500);
  classToToggle.forEach((e) => {
    e.classList.toggle(LIGHT_MODE_CLASS);
  })
}, false)
