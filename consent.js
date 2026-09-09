(function () {
  var KEY = 'lol_cookie_consent';
  var GTM_ID = 'GTM-WGWZNF5K';
  var STYLE_ID = 'lol-consent-css';
  var BANNER_ID = 'lol-cookie-banner';

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent =
      '#' + BANNER_ID + '{position:fixed;left:0;right:0;bottom:0;z-index:200;background:rgba(8,8,8,.96);border-top:1px solid #7a1212;padding:1rem 1.5rem;color:#c8c2b8;font-family:\'Crimson Pro\',Georgia,serif;font-size:.95rem;line-height:1.5;}' +
      '#' + BANNER_ID + ' .cookie-inner{max-width:900px;margin:0 auto;display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;}' +
      '#' + BANNER_ID + ' p{margin:0;max-width:36rem;}' +
      '#' + BANNER_ID + ' a{color:#c8c2b8;text-decoration:underline;text-underline-offset:3px;}' +
      '#' + BANNER_ID + ' a:hover{color:#9b1a1a;}' +
      '#' + BANNER_ID + ' .cookie-actions{display:flex;gap:.75rem;flex-wrap:wrap;}' +
      '#' + BANNER_ID + ' button{font-family:\'Special Elite\',\'IBM Plex Mono\',monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;padding:.7rem 1.15rem;min-height:44px;cursor:pointer;border:1px solid #7a1212;}' +
      '#' + BANNER_ID + ' button:focus-visible{outline:2px solid #c8c2b8;outline-offset:3px;}' +
      '#lol-cookie-accept{background:#7a1212;color:#c8c2b8;}' +
      '#lol-cookie-essential{background:transparent;color:#c8c2b8;}' +
      '@media(max-width:600px){#' + BANNER_ID + '{padding:1rem 1.25rem;}}';
    document.head.appendChild(s);
  }

  function loadGTM() {
    if (window.__lolGtmLoaded) return;
    window.__lolGtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
    var f = document.getElementsByTagName('script')[0];
    var j = document.createElement('script');
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    if (f && f.parentNode) {
      f.parentNode.insertBefore(j, f);
    } else {
      document.head.appendChild(j);
    }
  }

  function hideBanner() {
    var el = document.getElementById(BANNER_ID);
    if (el && el.parentNode) el.parentNode.removeChild(el);
    if (document.body) document.body.style.paddingBottom = '';
  }

  function setConsent(value) {
    try { localStorage.setItem(KEY, value); } catch (err) {}
    hideBanner();
    if (value === 'accepted') loadGTM();
  }

  function showBanner() {
    if (!document.body || document.getElementById(BANNER_ID)) return;
    injectStyles();
    var bar = document.createElement('div');
    bar.id = BANNER_ID;
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie choice');
    bar.innerHTML =
      '<div class="cookie-inner">' +
        '<p>Analytics run only if you accept. The archive stays readable either way. <a href="/privacy.html">Privacy</a></p>' +
        '<div class="cookie-actions">' +
          '<button type="button" id="lol-cookie-accept">Accept</button>' +
          '<button type="button" id="lol-cookie-essential">Essential only</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '6.5rem';
    document.getElementById('lol-cookie-accept').onclick = function () { setConsent('accepted'); };
    document.getElementById('lol-cookie-essential').onclick = function () { setConsent('essential'); };
  }

  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (err) {}

  if (choice === 'accepted') {
    loadGTM();
    return;
  }
  if (choice === 'essential') return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showBanner);
  } else {
    showBanner();
  }
})();
