'use strict';
// Only the choice cookie is necessary. Reading progress needs an explicit opt-in.
const IBPrivacy = (() => {
  const cookieName = 'ibai_privacy';
  const cookiePath = new URL('.', location.href).pathname;
  const readingKey = 'ibai-read:' + cookiePath;
  let choice = readChoice();
  const listeners = new Set();
  function readChoice() {
    try {
      const values = document.cookie.split(';').map(c => c.trim()).filter(c => c.startsWith(cookieName + '=')).map(c => decodeURIComponent(c.slice(cookieName.length + 1)));
      const value = values.find(v => v === 'v1-essential' || v === 'v1-functional');
      return value ? {functional:value === 'v1-functional'} : null;
    } catch { return null; }
  }
  function loadReading() {
    if(!choice?.functional) return [];
    try {
      const value = JSON.parse(localStorage.getItem(readingKey) || localStorage.getItem('ibai-read') || '[]');
      return Array.isArray(value) ? value : [];
    } catch { return []; }
  }
  function clearReading() {
    try { localStorage.removeItem(readingKey); localStorage.removeItem('ibai-read'); } catch {}
  }
  function storeReading(ids) {
    if(!choice?.functional) return false;
    try { localStorage.setItem(readingKey,JSON.stringify(ids)); localStorage.removeItem('ibai-read'); return true; } catch { return false; }
  }
  function save(functional) {
    choice = {functional:!!functional};
    try { document.cookie = `${cookieName}=v1-${functional?'functional':'essential'}; Max-Age=15552000; Path=${cookiePath}; SameSite=Lax${location.protocol==='https:'?'; Secure':''}`; } catch {}
    if(!functional) clearReading();
    document.getElementById('cookie-banner').hidden = true;
    for(const listener of listeners) listener(choice);
    const status=document.getElementById('privacy-status');
    status.textContent = readChoice() ? '保存設定を更新しました。' : 'この閲覧中の設定を更新しました。ブラウザがCookieを保存できない場合、次回は再び確認します。';
  }
  function open() {
    document.getElementById('functional-storage').checked = !!choice?.functional;
    const dialog=document.getElementById('privacy-dialog');
    if(!dialog.open) dialog.showModal();
  }
  function close() { document.getElementById('privacy-dialog').close(); }
  function init() {
    document.getElementById('cookie-banner').hidden=!!choice;
    document.addEventListener('click',e=>{if(e.target.closest('[data-privacy-open]')) open();});
    document.getElementById('cookie-essential').addEventListener('click',()=>save(false));
    document.getElementById('cookie-functional').addEventListener('click',()=>save(true));
    document.getElementById('privacy-close').addEventListener('click',close);
    document.getElementById('privacy-form').addEventListener('submit',e=>{e.preventDefault();save(document.getElementById('functional-storage').checked);close();});
    document.getElementById('privacy-essential').addEventListener('click',()=>{save(false);close();});
  }
  init();
  return {get functional(){return !!choice?.functional;},loadReading,storeReading,clearReading,open,onChange(fn){listeners.add(fn);}};
})();
