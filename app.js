'use strict';
const $ = (s, p = document) => p.querySelector(s);
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const iconPaths = {
  spark:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/>',
  chat:'<path d="M4 3h16v13H9l-5 5Z"/><path d="M8 8h8M8 12h5"/>',
  brain:'<path d="M12 4c-3-4-8 0-6 3-5 1-5 7-1 8-1 5 5 7 7 3 2 4 8 2 7-3 4-1 4-7-1-8 2-3-3-7-6-3Z"/><path d="M12 4v14M6 7l3 3M18 7l-3 3M5 15l4-2M19 15l-4-2"/>',
  files:'<path d="M8 2h8l4 4v15H8ZM16 2v5h4M4 6v16M11 11h6M11 15h6"/>',
  connect:'<rect x="2" y="3" width="6" height="6" rx="1"/><rect x="16" y="15" width="6" height="6" rx="1"/><path d="M8 6h6v12h2M2 17h6M5 14v6"/>',
  code:'<path d="m8 5-6 7 6 7m8-14 6 7-6 7m-3-16-2 20"/>',
  nodes:'<circle cx="12" cy="12" r="3"/><circle cx="3" cy="4" r="2"/><circle cx="21" cy="5" r="2"/><circle cx="5" cy="21" r="2"/><circle cx="21" cy="20" r="2"/><path d="m5 6 5 4m4 0 5-4M10 14l-4 5m8-5 5 5"/>',
  shield:'<path d="m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6Z"/><path d="m7 12 3 3 7-7"/>'
};
const icon = (type,cls='') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[type]||iconPaths.spark}</svg>`;
let readGuides = new Set();
readGuides=new Set(IBPrivacy.loadReading().filter(id=>GUIDES.some(g=>g.id===id)));
const readingStorageMessage=()=>IBPrivacy.functional?'読了記録をこのブラウザに保存しています。':'読了記録は今回の閲覧中のみ。保存はCookie・保存設定から選べます。';
const copyPayloads = new Map();
let copyIndex = 0;
function copyBlock(text,label='プロンプトをコピー') {
  const id='copy-'+copyIndex++; copyPayloads.set(id,text);
  return `<div class="prompt-block"><div class="prompt-block-head"><span>TRY THIS</span><button class="copy-button" data-copy="${id}">${label} <span aria-hidden="true">⧉</span></button></div><pre>${escapeHTML(text)}</pre></div>`;
}
const sourceLink = key => {const s=SOURCES[key];return `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${escapeHTML(s.name)} <span aria-hidden="true">↗</span></a>`;};
function chapterCard(g) {
  return `<a class="chapter-card" href="#/guide/${g.id}"><div class="chapter-art ${g.color}"><span class="chapter-number">${g.num}</span>${icon(g.icon)}<span class="art-label">${g.category.toUpperCase()}</span>${readGuides.has(g.id)?'<span class="read-badge">✓ 読了</span>':''}</div><div class="chapter-copy"><div class="chapter-meta"><span>${g.category}</span><span>約${g.time}</span></div><h3>${g.title}</h3><p>${g.desc}</p><span class="chapter-arrow" aria-hidden="true">↗</span></div></a>`;
}
function home() {
  return `<div class="home"><section class="hero container"><div class="hero-copy"><div class="eyebrow"><span class="tiny-dot"></span> FOR IB DP STUDENTS</div><h1>AIで、学びの<br><span class="underlined">解像度</span>を上げよう。</h1><p class="hero-lead">調べる。考える。つなげる。<br>自分の学びを一歩進める、AIの使い方。</p><p class="hero-description">AIの基本から、PDF整理、MCP、ノートづくりまで。<br>IB生活で今日から試せる、小さな実践を集めました。</p><div class="hero-buttons"><a class="button primary" href="#/guide/basics">はじめの一歩 <span>↗</span></a><a class="text-link" href="#/guides">ガイドを見てみる <span>→</span></a></div><div class="hero-foot"><span class="mini-line"></span><span>8つのガイド · 無料で読める · 日本語</span></div></div><div class="hero-art" aria-label="資料、問い、ノートがつながる学びのイラスト" role="img"><div class="art-grid"></div><span class="orbit-label">YOUR IDEAS, AMPLIFIED.</span><div class="paper paper-back"></div><div class="paper paper-mid"></div><div class="paper paper-front"><div class="notebook-heading"><span>STUDENT'S FIELD NOTES</span><span>↗</span></div><div class="notebook-title">問いから、<br>はじまる。</div><div class="notebook-graph"><svg viewBox="0 0 280 170" aria-hidden="true"><path d="M140 85 48 39M140 85 224 35M140 85 238 139M140 85 58 139M48 39 58 139M224 35 238 139" stroke="#648174" stroke-width="1.5" stroke-dasharray="4 5"/><circle cx="140" cy="85" r="35" fill="#f46a4b"/><path d="m140 65 5 15 15 5-15 5-5 15-5-15-15-5 15-5Z" fill="#fff8ec"/><circle cx="48" cy="39" r="21" fill="#f9f7ef" stroke="#253d36"/><circle cx="224" cy="35" r="24" fill="#f9f7ef" stroke="#253d36"/><circle cx="58" cy="139" r="19" fill="#f9f7ef" stroke="#253d36"/><circle cx="238" cy="139" r="22" fill="#f9f7ef" stroke="#253d36"/><text x="48" y="43" text-anchor="middle" fill="#253d36" font-size="12">PDF</text><text x="224" y="39" text-anchor="middle" fill="#253d36" font-size="12">問い</text><text x="58" y="143" text-anchor="middle" fill="#253d36" font-size="11">理解</text><text x="238" y="143" text-anchor="middle" fill="#253d36" font-size="11">NOTE</text></svg></div><div class="notebook-bottom"><span>READ · THINK · CONNECT</span><span>01 / 08</span></div></div><div class="floating-tag tag-pdf">${icon('files')} PDFを、知識に。</div><div class="floating-tag tag-think">${icon('brain')} 答えより、問いを。</div><div class="star-stamp">LEARN<br>YOUR WAY<span>✳</span></div><span class="handwritten">a little help,<br>a lot of possibility.</span></div></section>
  <div class="quick-strip"><div class="container quick-inner"><span class="quick-label">今日の「知りたい」から</span><a href="#/guide/thinking">Thinkingって何？ <span>↗</span></a><a href="#/guide/pdf">PDFをまとめて読みたい <span>↗</span></a><a href="#/guide/mcp">MCPを使ってみたい <span>↗</span></a></div></div>
  <section class="container section"><div class="section-heading"><div><span class="eyebrow">THE LEARNING GUIDE</span><h2>知るから、使えるへ。</h2><p>気になる章から。初めてなら、01から順番に。</p></div><a class="text-link" href="#/guides">全ガイドを見る <span>→</span></a></div><div class="chapter-grid">${GUIDES.map(chapterCard).join('')}</div></section>
  <section class="container pdf-feature"><div class="pdf-feature-art"><span class="pdf-sheet sheet-1">EE<br><small>SOURCES</small></span><span class="pdf-sheet sheet-2">BIO<br><small>NOTES</small></span><span class="pdf-sheet sheet-3">PDF<br><small>→ IDEAS</small></span><span class="feature-star">✳</span></div><div><span class="eyebrow">FROM FILES TO UNDERSTANDING</span><h2>資料の山に、<br>もう迷わない。</h2><p>NotebookLMで根拠をたどり、Open Notebookで環境を組む。<br>自分に合った、PDFとの付き合い方を見つけよう。</p><a class="button dark" href="#/guide/pdf">PDF活用ガイドを読む <span>↗</span></a></div><span class="feature-index">GUIDE / 04</span></section>
  <section class="container section practice-section"><div class="practice-copy"><span class="eyebrow">A LITTLE PRACTICE</span><h2>次の質問を、<br>ちょっと変えてみる。</h2><p>「説明して」の先へ。自分の理解を伝えて、<br>AIと一緒に考える練習を。</p><a class="text-link" href="#/prompts">プロンプト集へ <span>→</span></a></div><div class="sample-prompt"><span class="eyebrow">PROMPT / 復習</span><h3>答えはまだ、言わないで。</h3><p>私の今の理解は「……」です。<br>まず、理解を確かめる質問を1つだけしてください。<br>私の返答を待ち、ヒントを1つずつ出してください。</p><button class="copy-button" data-prompt-copy="concept">全文をコピー <span>⧉</span></button></div></section>
  <section class="integrity-banner"><div class="container integrity-inner"><div class="integrity-icon">${icon('shield')}</div><div><span class="eyebrow">KEEP THE THINKING YOURS</span><h2>AIを使っても、考える主役は自分。</h2><p>EE・IA・TOKで使う前に。学校の指示、出典、AIの利用記録を確認しよう。</p></div><a class="button light" href="#/guide/integrity">IBとAIを読む <span>↗</span></a></div></section></div>`;
}
function guidesPage() {
  return `<section class="container page-intro"><span class="eyebrow">THE LEARNING GUIDE</span><h1>知るから、使えるへ。</h1><p>8つのガイドで、AIを自分の学びに取り入れる。<br>初めてなら基礎から、気になることがあればそこから。</p><div class="reading-status"><span class="reading-count">${readGuides.size} / 8章 読了</span> <div class="reading-bar"><span style="width:${readGuides.size/8*100}%"></span></div><span class="reading-storage-message">${readingStorageMessage()}</span></div></section><section class="container section page-grid-section"><div class="filter-chips" aria-label="ガイドを絞り込む">${['すべて','基礎','実践','発展','IBとAI'].map((x,i)=>`<button class="chip ${i===0?'active':''}" data-guide-filter="${x}" aria-pressed="${i===0}">${x}</button>`).join('')}</div><div class="chapter-grid" id="guide-grid">${GUIDES.map(chapterCard).join('')}</div></section>`;
}
function article(g) {
  const idx=GUIDES.indexOf(g), next=GUIDES[idx+1];
  return `<div class="article-layout container"><aside class="article-sidebar"><a class="back-link" href="#/guides">← ガイド一覧</a><span class="eyebrow">IN THIS GUIDE</span><nav aria-label="この記事の目次">${g.sections.map((s,i)=>`<a href="#section-${i}" data-scroll="section-${i}"><span>${String(i+1).padStart(2,'0')}</span>${s.title}</a>`).join('')}</nav><div class="sidebar-other"><span class="eyebrow">ALL CHAPTERS</span>${GUIDES.map(x=>`<a href="#/guide/${x.id}" class="${x.id===g.id?'current':''}"><span>${x.num}</span>${x.title}</a>`).join('')}</div></aside><article class="article"><div class="article-head"><div class="article-eyebrow"><span class="chapter-pill ${g.color}">GUIDE ${g.num}</span><span>${g.category} · 約${g.time}</span></div><h1>${g.title}</h1><p class="article-lead">${g.lead}</p><div class="article-meta"><span>情報確認日 2026.10.14</span><button class="mark-read ${readGuides.has(g.id)?'is-read':''}" data-read="${g.id}">${readGuides.has(g.id)?'✓ 読了済み':'○ 読了にする'}</button></div></div>${g.sections.map((s,i)=>`<section class="article-section" id="section-${i}"><h2><span>${String(i+1).padStart(2,'0')}</span>${s.title}</h2>${s.html}${s.prompt?copyBlock(PROMPTS.find(p=>p.id===s.prompt).text):''}${s.copyText?copyBlock(s.copyText,'テンプレートをコピー'):''}</section>`).join('')}<section class="article-sources"><span class="eyebrow">CHECK THE ORIGINAL</span><h2>公式情報で確かめる</h2><p>画面、利用条件、容量・料金は更新されます。最新の内容は提供元で確認してください。学習例とおすすめの使い分けは本サイト独自の提案です。</p><div class="source-links">${g.sources.map(sourceLink).join('')}</div></section><div class="article-end"><button class="button primary" data-read="${g.id}">${readGuides.has(g.id)?'✓ 読了済み':'この章を読了にする'} <span>✓</span></button>${next?`<a class="next-guide" href="#/guide/${next.id}"><span>NEXT / ${next.num}</span><strong>${next.title}</strong><b>→</b></a>`:'<a class="next-guide" href="#/prompts"><span>NEXT / PRACTICE</span><strong>プロンプトを試してみる</strong><b>→</b></a>'}</div></article></div>`;
}
function toolCard(t) {
  return `<article class="tool-card"><div class="tool-top"><span class="tool-logo ${t.color}" aria-hidden="true">${t.letter}</span><div><h2>${t.name}</h2><div class="tool-tags">${t.tags.map(tag=>`<span>${tag}</span>`).join('')}</div></div></div><p>${t.description}</p><div class="tool-first"><span>はじめの一歩</span><p>${t.first}</p></div><p class="tool-condition">${t.condition}</p><div class="tool-actions"><a href="#/guide/${t.guide}">使い方を読む →</a><a href="${t.url}" target="_blank" rel="noopener noreferrer" aria-label="${t.name}公式サイトを開く">公式 ↗</a></div></article>`;
}
function toolsPage() {
  return `<section class="container page-intro"><span class="eyebrow">YOUR AI TOOLKIT</span><h1>目的から、道具を選ぼう。</h1><p>まずは会話AIを1つ。資料が増えたら、整理する道具を。<br>すべてを使う必要はありません。</p></section><section class="container section page-grid-section"><div class="filter-chips" aria-label="ツールを絞り込む">${['すべて','会話','資料','開発','ノート'].map((x,i)=>`<button class="chip ${i===0?'active':''}" data-tool-filter="${x}" aria-pressed="${i===0}">${x}</button>`).join('')}</div><div class="tools-grid" id="tools-grid">${TOOLS.map(toolCard).join('')}</div><div class="note"><strong>IBの課題・アカウント条件を先に確認。</strong><p>ツールの紹介は、学校が課題での使用を許可したことを意味しません。年齢・地域・学校アカウントの条件を確認し、評価対象の提出物では担当教員の指示を優先してください。各製品の公式ロゴは使用していません。</p></div></section>`;
}
function promptCard(p) {
  return `<article class="prompt-card"><div class="chapter-meta"><span>${p.category}</span><span>${p.mode}</span></div><h2>${p.title}</h2><p>${p.description}</p><span class="prompt-tool">${p.tool}</span>${copyBlock(p.text)}<div class="small muted">[ ]の部分を自分の内容に置き換えてください。</div></article>`;
}
function promptsPage() {
  return `<section class="container page-intro"><span class="eyebrow">BETTER QUESTIONS, BETTER LEARNING</span><h1>そのまま試せる、質問の型。</h1><p>自分の考えを添えて、対話を始めよう。<br>学校の指示を確認し、学習用に使ってください。</p></section><section class="container prompt-builder"><div><span class="eyebrow">MAKE IT YOURS</span><h2>科目に合わせて、1問目を作る。</h2><p>選んだ科目・テーマに合わせて、プロンプトを組み立てます。</p></div><form id="prompt-form"><div class="builder-fields"><label>科目<select id="subject"><option>Biology HL</option><option>Chemistry SL</option><option>Physics HL</option><option>Math AA HL</option><option>Math AI SL</option><option>Economics HL</option><option>History HL</option><option>Language A</option><option>Language B</option><option>TOK</option><option>その他のIB科目</option></select></label><label>テーマ<input id="theme" maxlength="120" placeholder="例：浸透と拡散の違い" required></label></div><button type="submit" class="button primary">質問を組み立てる <span>→</span></button><p class="small muted">この機能は文章のテンプレートを作ります。AIへの送信は行いません。</p></form><div id="generated-prompt" class="generated-prompt" aria-live="polite"></div></section><section class="container section"><div class="section-heading"><div><span class="eyebrow">THE PROMPT LIBRARY</span><h2>目的別プロンプト集</h2></div></div><div class="filter-chips" aria-label="プロンプトを絞り込む">${['すべて','復習','資料整理','EE・IA','TOK','制作'].map((x,i)=>`<button class="chip ${i===0?'active':''}" data-prompt-filter="${x}" aria-pressed="${i===0}">${x}</button>`).join('')}</div><div class="prompts-grid" id="prompts-grid">${PROMPTS.map(promptCard).join('')}</div></section>`;
}
const MODES=[
  {task:'単語・用語の確認',type:'Fast / Instant系から',why:'短く、範囲を絞った質問で始める。定義や訳は授業資料と照合しよう。',tip:'「[用語]を1文で説明し、よく似た用語との違いを1つ示して」'},
  {task:'数学の解法の検討',type:'Thinking系を試す',why:'複数の条件と途中式の整合性を扱うので、推論を深める設定が候補。計算は自分でも確認。',tip:'「私の途中式の最初の誤りを1つ示し、ヒントだけください」'},
  {task:'TOKの主張と反論',type:'Thinking系を試す',why:'前提や立場の違いを比較する対話に。出てきた反論を自分の具体例と照らし合わせよう。',tip:'「この主張の前提と反対意見を挙げ、私に1つずつ質問して」'},
  {task:'複数のPDFを比較',type:'資料を参照できるツールへ',why:'まずNotebookLMなどで対象資料を選び、引用から原文へ戻れる状態に。推論の深さだけでは、資料の正確さは保証されません。',tip:'「選択した資料の主張と根拠を比較し、引用箇所を示して」'}
];
function renderModePicker(index=0) {
  const m=MODES[index], root=$('#mode-picker'); if(!root)return;
  root.innerHTML=`<div class="mode-options">${MODES.map((x,i)=>`<button data-mode="${i}" class="chip ${index===i?'active':''}" aria-pressed="${index===i}">${x.task}</button>`).join('')}</div><div class="mode-result" aria-live="polite"><span class="eyebrow">START HERE</span><h3>${m.type}</h3><p>${m.why}</p><div class="mode-tip">${m.tip}</div></div>`;
}
function sourcesPage() {
  return `<section class="container page-intro"><span class="eyebrow">ABOUT THIS FIELD GUIDE</span><h1>出典と、このサイトについて。</h1><p>IB DP生がAIを学びに取り入れるための、日本語の実践ガイド。</p></section><div class="container about-layout"><section><h2>このサイトの立場</h2><p>IB・OpenAI・Google・Anthropic・各製品の公式サイトではありません。製品情報とIBの方針は公式資料を参照し、勉強の進め方・プロンプト・活用例は独自に構成しています。</p><p>情報の確認日は2026年10月14日です。学校や課題の指示を優先し、変わりやすい料金、回数制限、機能名、利用条件は公式で確認してください。</p><h2>ブラウザ内に残る情報</h2><p>選んだ保存設定を覚えるCookieを180日間保存します。読了記録は、許可した場合だけこのブラウザのlocalStorageに保存します。設定はいつでも変更でき、保存を取り消すと読了データを削除します。保存を許可しない場合も、ガイドを読んだり閲覧中の読了を記録したりできます。アクセス解析・広告用Cookie、AIへの自動送信は組み込んでいません。プロンプト作成の入力は保存しません。</p><button class="chip" data-privacy-open>Cookie・保存設定を開く</button> <button id="reset-progress" class="chip">読了記録をリセット</button><h2>名前について</h2><p>「Carsol」はCursorとして、「Opennotebook lm」はNotebookLMとOpen Notebookの両方として紹介しています。Thinking / Fastの名前はサービスごとに意味が異なります。</p></section><section class="all-sources"><h2>参照した公式資料</h2><div class="source-links">${Object.keys(SOURCES).map(sourceLink).join('')}</div></section></div>`;
}
function route() {
  const hash=location.hash||'#/', parts=hash.slice(1).split('/').filter(Boolean);
  copyPayloads.clear(); copyIndex=0;
  let markup,title='AIで、学びの解像度を上げよう。';
  if(parts[0]==='guide') {const g=GUIDES.find(x=>x.id===parts[1]);if(g){markup=article(g);title=g.title;}else markup=notFound();}
  else if(parts[0]==='guides'){markup=guidesPage();title='学習ガイド';}
  else if(parts[0]==='tools'){markup=toolsPage();title='ツール図鑑';}
  else if(parts[0]==='prompts'){markup=promptsPage();title='プロンプト集';}
  else if(parts[0]==='sources'){markup=sourcesPage();title='出典・このサイトについて';}
  else if(parts.length===0)markup=home();else markup=notFound();
  $('#main').innerHTML=markup;document.title=title+' | IB生に伝えるAI術';
  document.querySelectorAll('.nav a').forEach(a=>{const active=a.getAttribute('href')===hash||parts[0]==='guide'&&a.getAttribute('href')==='#/guides'&&parts[1]!=='integrity';a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  $('.nav').classList.remove('is-open');$('#menu-toggle').setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'instant'});renderModePicker();
  if(route.started)$('#main').focus({preventScroll:true});route.started=true;
}
function notFound(){return '<section class="container page-intro"><span class="eyebrow">PAGE NOT FOUND</span><h1>そのページは見つかりません。</h1><p>ガイド一覧から、読みたい章を選んでください。</p><a class="button primary" href="#/guides">ガイド一覧へ →</a></section>';}
let toastTimer;
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3000);}
async function copyText(text,button){try{await navigator.clipboard.writeText(text);toast('コピーしました。[ ]を自分の内容に置き換えよう。');if(button){const old=button.innerHTML;button.innerHTML='コピー済み ✓';setTimeout(()=>{if(button.isConnected)button.innerHTML=old;},1800);}}catch{toast('コピーできませんでした。文章を選択してコピーしてください。');}}
function setFilter(button,dataName){button.parentElement.querySelectorAll('button').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});return button.dataset[dataName];}
document.addEventListener('click',e=>{
  const b=e.target.closest('button,a');if(!b)return;
  if(b.dataset.copy)copyText(copyPayloads.get(b.dataset.copy),b);
  if(b.dataset.promptCopy)copyText(PROMPTS.find(p=>p.id===b.dataset.promptCopy).text,b);
  if(b.dataset.mode!==undefined)renderModePicker(Number(b.dataset.mode));
  if(b.dataset.scroll){e.preventDefault();const s=document.getElementById(b.dataset.scroll);s?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});if(b.dataset.scroll==='main')s?.focus({preventScroll:true});}
  if(b.dataset.read){const id=b.dataset.read;const wasRead=readGuides.has(id);if(wasRead)readGuides.delete(id);else readGuides.add(id);const saved=IBPrivacy.storeReading([...readGuides]);document.querySelectorAll('[data-read="'+id+'"]').forEach(x=>{x.innerHTML=wasRead?'○ 読了にする':'✓ 読了済み';x.classList.toggle('is-read',!wasRead);});toast(wasRead?'読了を解除しました。':saved?'読了を保存しました。次の実践へ。':'読了を記録しました（今回の閲覧中のみ）。');}
  if(b.dataset.guideFilter){const f=setFilter(b,'guideFilter');$('#guide-grid').innerHTML=GUIDES.filter(g=>f==='すべて'||g.category===f).map(chapterCard).join('');}
  if(b.dataset.toolFilter){const f=setFilter(b,'toolFilter');$('#tools-grid').innerHTML=TOOLS.filter(t=>f==='すべて'||t.type===f).map(toolCard).join('');}
  if(b.dataset.promptFilter){const f=setFilter(b,'promptFilter');$('#prompts-grid').innerHTML=PROMPTS.filter(p=>f==='すべて'||p.category===f).map(promptCard).join('');}
  if(b.id==='reset-progress'){readGuides.clear();IBPrivacy.clearReading();toast('読了記録をリセットしました。');}
});
document.addEventListener('submit',e=>{if(e.target.id!=='prompt-form')return;e.preventDefault();const theme=$('#theme').value.trim();if(!theme)return;const subject=$('#subject').value;const prompt=PROMPTS[0].text.replace('[科目・SL/HL]',subject).replace('[テーマ]',theme);$('#generated-prompt').innerHTML=copyBlock(prompt);toast('質問を組み立てました。自分の説明を追記して使おう。');});
function search(){const q=$('#search-input').value.toLocaleLowerCase().trim(),results=[...GUIDES.map(g=>({title:g.title,detail:g.desc,tag:'GUIDE '+g.num,href:'#/guide/'+g.id,words:g.title+g.desc+g.keywords})),...PROMPTS.map(p=>({title:p.title,detail:p.description,tag:'PROMPT / '+p.category,href:'#/prompts',words:p.title+p.description+p.category+p.tool}))].filter(r=>!q||r.words.toLocaleLowerCase().includes(q));$('#search-results').innerHTML=results.length?results.slice(0,12).map(r=>`<a class="search-result" href="${r.href}"><span>${r.tag}</span><strong>${r.title}</strong><p>${r.detail}</p><b>→</b></a>`).join(''):`<div class="search-empty">「${escapeHTML(q)}」に一致する項目がありません。<br>別のキーワードで検索してみてください。</div>`;}
const dialog=$('#search-dialog');
function openSearch(){if(!dialog.open){dialog.showModal();search();$('#search-input').focus();}}
$('#open-search').addEventListener('click',openSearch);$('#close-search').addEventListener('click',()=>dialog.close());$('#search-input').addEventListener('input',search);$('#search-results').addEventListener('click',e=>{if(e.target.closest('a'))dialog.close();});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
$('#menu-toggle').addEventListener('click',()=>{const open=$('.nav').classList.toggle('is-open');$('#menu-toggle').setAttribute('aria-expanded',open);$('#menu-toggle').setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();openSearch();}});
function syncReadingDisplay() {
  document.querySelectorAll('.reading-storage-message').forEach(el=>el.textContent=readingStorageMessage());
  document.querySelectorAll('.reading-count').forEach(el=>el.textContent=readGuides.size+' / 8章 読了');
  document.querySelectorAll('.reading-bar span').forEach(el=>el.style.width=(readGuides.size/8*100)+'%');
  document.querySelectorAll('[data-read]').forEach(el=>{const read=readGuides.has(el.dataset.read);el.textContent=read?'✓ 読了済み':'○ 読了にする';el.classList.toggle('is-read',read);});
  document.querySelectorAll('.chapter-card').forEach(el=>{const id=el.getAttribute('href').split('/').pop();const badge=el.querySelector('.read-badge');if(!readGuides.has(id)){badge?.remove();}else if(!badge){const b=document.createElement('span');b.className='read-badge';b.textContent='✓ 読了';el.querySelector('.chapter-art').append(b);}});
}
IBPrivacy.onChange(()=>{
  if(IBPrivacy.functional){readGuides=new Set([...readGuides,...IBPrivacy.loadReading().filter(id=>GUIDES.some(g=>g.id===id))]);IBPrivacy.storeReading([...readGuides]);}
  else readGuides.clear();
  syncReadingDisplay();
});
window.addEventListener('hashchange',route);route();
