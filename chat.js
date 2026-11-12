/* AURUM AI Assistant - works offline, searches the properties in app.js */
(function(){
var css='.cb{position:fixed;left:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:30;background:#0a0a0c;color:#c9a96a;border:1px solid #c9a96a;width:56px;height:56px;border-radius:50%;font-size:11px;font-weight:600;cursor:pointer;box-shadow:0 8px 30px rgba(0,0,0,.6);font-family:inherit}'+
'.cp{position:fixed;left:12px;right:12px;bottom:calc(86px + env(safe-area-inset-bottom,0px));max-width:380px;height:min(72vh,540px);z-index:40;background:#111115;border:1px solid #c9a96a;display:none;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.7)}'+
'.cp.on{display:flex}.ch{padding:14px 16px;border-bottom:1px solid rgba(201,169,106,.25);display:flex;justify-content:space-between;align-items:center}'+
'.ch b{font-family:"Cormorant Garamond",serif;font-size:21px;font-weight:500;color:#c9a96a;letter-spacing:2px}.ch span{font-size:10px;letter-spacing:2px;color:#9a968c}'+
'.cm{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}'+
'.mg{max-width:88%;padding:10px 13px;font-size:13px;line-height:1.55;background:#15151a;border:1px solid rgba(201,169,106,.22);align-self:flex-start}'+
'.mg.u{align-self:flex-end;background:#c9a96a;color:#0a0a0c;border-color:#c9a96a}'+
'.mg a{color:#e8d3a1;text-decoration:underline}.mg .pr{display:block;margin-top:6px}'+
'.cc{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px}.cc button{background:none;border:1px solid rgba(201,169,106,.4);color:#c9a96a;padding:6px 10px;font-size:11px;cursor:pointer;font-family:inherit}'+
'.ci{display:flex;border-top:1px solid rgba(201,169,106,.25)}.ci input{flex:1;border:0;background:transparent;color:#ece8df;padding:14px;font:inherit;font-size:14px;outline:none}'+
'.ci button{background:#c9a96a;color:#0a0a0c;border:0;padding:0 18px;cursor:pointer;font-weight:500;font-family:inherit}';
var s=document.createElement("style");s.textContent=css;document.head.appendChild(s);
document.body.insertAdjacentHTML("beforeend",'<button class="cb" id="cb">AI</button><div class="cp" id="cp"><div class="ch"><div><b>AURUM AI</b><br><span>PROPERTY ASSISTANT</span></div><button class="heart" id="cx">✕</button></div><div class="cm" id="cm"></div><div class="cc" id="cc"></div><div class="ci"><input id="cin" placeholder="Ask about properties…"><button id="cs">Send</button></div></div>');
var $=function(i){return document.getElementById(i)},opened=0;
function say(h,u){var d=document.createElement("div");d.className="mg"+(u?" u":"");if(u)d.textContent=h;else d.innerHTML=h;$("cm").appendChild(d);$("cm").scrollTop=1e5}
var chips=["Show properties","Dubai","USA","UK","Under $3M","Book a viewing","Talk to an agent"];
$("cc").innerHTML=chips.map(function(c){return '<button>'+c+'</button>'}).join("");
var AL={usa:"usa",america:"usa","united states":"usa",us:"usa",uk:"uk",britain:"uk",england:"uk",uae:"uae",emirates:"uae",turkey:"türkiye",turkiye:"türkiye","türkiye":"türkiye"};
function find(t){
 var w=t.toLowerCase(),r={pl:[],ty:"",bd:0,mx:0};
 var b=w.match(/(\d+)\s*(bed|bhk|br)/);if(b){r.bd=+b[1];w=w.replace(b[0]," ")}
 Object.keys(AL).forEach(function(k){if(new RegExp("(^|[^a-z])"+k+"([^a-z]|$)").test(w))r.pl.push(AL[k])});
 D.forEach(function(p){[p.c,p.k].forEach(function(x){x=x.toLowerCase();if(w.indexOf(x)>=0&&r.pl.indexOf(x)<0)r.pl.push(x)})});
 ["villa","penthouse","apartment","townhouse","commercial","office"].forEach(function(x){if(w.indexOf(x)>=0)r.ty=x==="office"?"commercial":x});
 var m=w.match(/(\d+(?:\.\d+)?)\s*(million|m|crore|cr|k|thousand)?/);
 if(m){var n=+m[1],u=m[2]||"";if(u==="million"||u==="m")r.mx=n*1e6;else if(u==="k"||u==="thousand")r.mx=n*1e3;else if(u==="crore"||u==="cr")r.mx=n*1e7/CFG.rates.PKR;else if(n>=10000)r.mx=n}
 return r}
function search(r){
 var L=D.filter(function(p){return(!r.pl.length||r.pl.some(function(x){return p.c.toLowerCase()===x||p.k.toLowerCase()===x}))&&(!r.ty||p.ty.toLowerCase()===r.ty)&&(!r.bd||p.bd>=r.bd)&&(!r.mx||p.pr<=r.mx)});
 if(!L.length)return 'I could not find an exact match. Try a different budget or location, or <a href="'+wa("Hello, I am looking for a property. Can you help?")+'" target="_blank">ask our agent on WhatsApp</a>.';
 return 'I found '+L.length+' propert'+(L.length>1?'ies':'y')+':'+L.slice(0,3).map(function(p){return '<span class="pr"><a href="property.html?id='+p.id+'">'+p.t+'</a><br>'+p.c+', '+p.k+' · '+money(p.pr)+'</span>'}).join("")+(L.length>3?'<span class="pr"><a href="properties.html'+(r.pl.length?'?c='+encodeURIComponent(D.filter(function(p){return p.c.toLowerCase()===r.pl[0]||p.k.toLowerCase()===r.pl[0]})[0].k):'')+'">See all '+L.length+' properties</a></span>':'')}
function reply(t){
 var w=t.toLowerCase(),r=find(t);
 if(/^(hi|hello|hey|salam|assalam|aoa)/.test(w))return "Hello! I can help you find a property by location, budget, type or bedrooms. Try: <i>“villa in Dubai under 8M”</i>.";
 if(r.pl.length||r.ty||r.bd||r.mx||/show|propert|list|all|browse/.test(w))return search(r);
 if(/mortgage|loan|emi|install|finance/.test(w))return "Every property page has a mortgage calculator where you can set down payment, years and interest. Our team can also advise on payment plans.";
 if(/visit|view|book|tour|appointment/.test(w))return 'Open any property and use <b>Book a Viewing</b>, or <a href="contact.html">contact us here</a>. We offer in-person visits and video tours.';
 if(/invest|yield|citizen|residen|visa|rent/.test(w))return "We have investment-grade properties in Dubai, Istanbul, the UK, the USA and Pakistan. Our advisors can explain returns and eligibility for your situation. <a href=\""+wa("Hello, I would like investment advice.")+"\" target=\"_blank\">Speak to an advisor</a>.";
 if(/legal|document|title|transfer|paper|payment/.test(w))return "We handle verified titles, contracts, payment support and ownership transfer end to end for overseas buyers.";
 if(/price|cost|currenc|dollar|pound|aed|pkr/.test(w))return "Prices are shown in USD by default. Use the currency selector at the top to switch to AED, GBP, EUR or PKR.";
 if(/contact|agent|human|talk|call|whatsapp|phone|email/.test(w))return '<a href="'+wa("Hello Aurum Estates, I would like to speak with an agent.")+'" target="_blank">Chat with an agent on WhatsApp</a> or <a href="contact.html">use the contact page</a>.';
 if(/thank|shukriya|thx/.test(w))return "You are most welcome. Anything else I can help with?";
 return 'I can search properties by location, budget, type and bedrooms. Try <i>“4 bed penthouse in New York”</i>, or <a href="'+wa("Hello, I need help finding a property.")+'" target="_blank">talk to an agent</a>.'}
function send(t){t=(t||"").trim();if(!t)return;say(t,1);$("cin").value="";setTimeout(function(){say(reply(t))},350)}
function toggle(){var p=$("cp");p.classList.toggle("on");if(!opened&&p.classList.contains("on")){opened=1;say("Welcome to <b>Aurum Estates</b>. Tell me what you are looking for: location, budget, type or bedrooms.")}}
$("cb").onclick=toggle;$("cx").onclick=toggle;
$("cs").onclick=function(){send($("cin").value)};
$("cin").onkeydown=function(e){if(e.key==="Enter")send(this.value)};
$("cc").onclick=function(e){if(e.target.tagName==="BUTTON")send(e.target.textContent==="Show properties"?"show properties":e.target.textContent)};
})();
                                             
