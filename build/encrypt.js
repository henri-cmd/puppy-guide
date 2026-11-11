const fs=require('fs');const {webcrypto:c}=require('crypto');
(async()=>{
 const dir=process.argv[2];const pw=fs.readFileSync(dir+'/pw.txt','utf8').trim();const html=fs.readFileSync(dir+'/app.html','utf8');
 const salt=c.getRandomValues(new Uint8Array(16)),iv=c.getRandomValues(new Uint8Array(12)),IT=600000;
 const base=await c.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);
 const key=await c.subtle.deriveKey({name:'PBKDF2',salt,iterations:IT,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['encrypt']);
 const ct=new Uint8Array(await c.subtle.encrypt({name:'AES-GCM',iv},key,new TextEncoder().encode(html)));
 const b=x=>Buffer.from(x).toString('base64');
 const loader=`<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow"><title>Puppy Field Guide</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&family=Atkinson+Hyperlegible:wght@400;700&display=swap">
<style>:root{--bg:#F7F9FC;--card:#fff;--ink:#18202B;--muted:#5F6B7A;--line:#E1E6ED;--acc:#3B82C4;--bad:#C9433F}@media (prefers-color-scheme:dark){:root{--bg:#0F141A;--card:#171D25;--ink:#E7ECF2;--muted:#98A3B3;--line:#2A3340;--acc:#6AAEE8;--bad:#F07A76;color-scheme:dark}}
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--ink);font:17px/1.5 "Atkinson Hyperlegible",system-ui,sans-serif;padding:24px max(16px,env(safe-area-inset-left)) 24px max(16px,env(safe-area-inset-right))}
form{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:32px 28px;width:100%;max-width:380px;display:flex;flex-direction:column;gap:14px}
.mark{width:52px;height:52px;border-radius:15px;background:var(--acc);display:grid;place-items:center;color:#fff}h1{font:800 30px/1.05 "Bricolage Grotesque",system-ui,sans-serif;margin:4px 0 0}p{margin:0;color:var(--muted)}
input[type=password]{font:inherit;padding:12px 14px;border:1px solid var(--line);border-radius:12px;background:var(--bg);color:var(--ink);width:100%}input:focus-visible,button:focus-visible{outline:3px solid var(--acc);outline-offset:2px}
label.r{display:flex;gap:8px;align-items:center;font-size:15px;color:var(--muted)}button{font:700 16px inherit;font-family:inherit;padding:12px;border:0;border-radius:12px;background:var(--acc);color:#fff;cursor:pointer}button[disabled]{opacity:.6}.err{color:var(--bad);font-size:15px;min-height:1.4em}</style></head>
<body><form id="f" autocomplete="on"><div class="mark"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="6.5" cy="10" r="1.8"/><circle cx="10" cy="6" r="1.8"/><circle cx="14.5" cy="6" r="1.8"/><circle cx="18" cy="10" r="1.8"/><path d="M12.2 11c-3 0-6.2 4.6-5.2 7 .8 1.9 3.6 1 5.2 1s4.4.9 5.2-1c1-2.4-2.2-7-5.2-7z"/></svg></div><h1>Puppy Field Guide</h1><p>Enter the password to open her guide.</p>
<input type="text" name="username" value="puppy" autocomplete="username" hidden><input type="password" id="pw" autocomplete="current-password" placeholder="Password" required autofocus>
<label class="r"><input type="checkbox" id="rem" checked> Remember on this device</label><button id="go">Open</button><p class="err" id="err" role="alert"></p></form>
<script>
(()=>{const D={s:"${b(salt)}",i:"${b(iv)}",n:${IT},c:"${b(ct)}"};
const u=s=>Uint8Array.from(atob(s),ch=>ch.charCodeAt(0));
async function unlock(pw){const base=await crypto.subtle.importKey("raw",new TextEncoder().encode(pw),"PBKDF2",false,["deriveKey"]);const key=await crypto.subtle.deriveKey({name:"PBKDF2",salt:u(D.s),iterations:D.n,hash:"SHA-256"},base,{name:"AES-GCM",length:256},false,["decrypt"]);const pt=await crypto.subtle.decrypt({name:"AES-GCM",iv:u(D.i)},key,u(D.c));return new TextDecoder().decode(pt)}
function show(h){document.open();document.write(h);document.close()}
(async()=>{let saved=null;try{saved=localStorage.getItem("pfg:pw")}catch(e){}if(saved){try{show(await unlock(saved));return}catch(e){try{localStorage.removeItem("pfg:pw")}catch(_){}}}})();
document.getElementById("f").addEventListener("submit",async e=>{e.preventDefault();const b=document.getElementById("go"),er=document.getElementById("err"),pw=document.getElementById("pw").value;b.disabled=true;b.textContent="Opening…";er.textContent="";try{const h=await unlock(pw);if(document.getElementById("rem").checked){try{localStorage.setItem("pfg:pw",pw)}catch(_){}}show(h)}catch(x){er.textContent="That password didn’t work. Check it and try again.";b.disabled=false;b.textContent="Open"}});
})();
</script></body></html>`;
 fs.writeFileSync(process.argv[3]||dir+'/index.html',loader);console.log('ok',loader.length);
})();
