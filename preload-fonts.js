(() => {
  createPreloadTag(document); // ルートドキュメントにフォント読み込み
  const iframes = document.getElementsByTagName('iframe');
  for (iframe of iframes) {
    createPreloadTag(iframe.contentDocument); // iframe内のドキュメントにフォント読み込み
  };
})();

function createPreloadTag(elem) {
  if (!elem) return;
  const baseClassName = 'preloadFontTag';
  const randomInt = Math.floor(Math.random() * 10000) // クラス名の被りを防止するための乱数
  const className = baseClassName + randomInt;
  const weightList = ['Regular', 'Bold'];
  weightList.map((weight) => {
    const preloadTag = elem.createElement('link');
    preloadTag.setAttribute('rel', 'preload');
    preloadTag.setAttribute('as', 'font');
    preloadTag.setAttribute('href', chrome.runtime.getURL(`fonts/NotoSansCJKjp-${weight}-subset.woff2`));
    preloadTag.setAttribute('crossorigin', true);
    preloadTag.classList = className;
    elem.head.appendChild(preloadTag);
    preloadTag.addEventListener('load', () => {
      const loadCSS = elem.createElement('link');
      loadCSS.setAttribute('rel', 'stylesheet');
      loadCSS.setAttribute('type', 'text/css');
      loadCSS.setAttribute('href', chrome.runtime.getURL(`css/replacefont-extension-${weight.toLowerCase()}.css`));
      elem.head.appendChild(loadCSS);
    });
  });
}