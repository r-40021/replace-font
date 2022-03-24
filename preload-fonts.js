(() => {
  const baseClassName = 'preloadFontTag';
  const randomInt = Math.floor(Math.random() * 10000) // クラス名の被りを防止するための乱数
  const className = baseClassName + randomInt;

  function createPreloadTag(path) {
    const preloadTag = document.createElement('link');
    preloadTag.setAttribute('rel', 'preload');
    preloadTag.setAttribute('as', 'font');
    preloadTag.setAttribute('href', chrome.runtime.getURL(`fonts/NotoSansCJKjp-${path}-subset.woff2`));
    preloadTag.setAttribute('crossorigin', true);
    preloadTag.classList = className;
    document.head.appendChild(preloadTag);
    preloadTag.addEventListener('load', () => {
      const loadCSS = document.createElement('link');
      loadCSS.setAttribute('rel', 'stylesheet');
      loadCSS.setAttribute('type', 'text/css');
      loadCSS.setAttribute('href', chrome.runtime.getURL(`css/${path.toLowerCase()}.css`));
      document.head.appendChild(loadCSS);
    })
  }

  createPreloadTag('Regular');
  createPreloadTag('Bold');
})();