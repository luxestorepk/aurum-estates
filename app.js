/* Stop double loading (if the file was pasted/loaded twice) */
if(window.__aurum){throw new Error("app.js loaded twice")}
window.__aurum=1;

/* ===== EDIT THESE ===== */
var CFG={
 wa:"923716649231",
 email:"info@aurumestates.com",
 img:"", /* "" = images in same folder as index.html. If inside a folder use "images/" */
 rates:{USD:1,AED:3.67,GBP:0.79,EUR:0.92,PKR:280},
 sym:{USD:"$",AED:"AED ",GBP:"£",EUR:"€",PKR:"PKR "}
};
/* Prices in USD (field name: pr). Image file = id + ".jpg". f:1 = shown on home page */
var D=[
{id:"p1",f:1,t:"Palm Jumeirah Signature Villa",c:"Dubai",k:"UAE",ty:"Villa",st:"For Sale",pr:10400000,bd:6,ba:7,ar:9200,d:"Beachfront villa with private pool, cinema room and panoramic Gulf views on the iconic Palm.",am:["Private beach","Infinity pool","Smart home","Cinema","Maid room"],ac:"#c9a96a"},
{id:"p10",f:1,t:"Park Avenue Sky Penthouse",c:"New York",k:"USA",ty:"Penthouse",st:"Exclusive",pr:12500000,bd:4,ba:5,ar:4600,d:"Triplex penthouse above Central Park with a wraparound terrace and white-glove building services.",am:["Central Park view","Terrace","Doorman","Gym","Private elevator"],ac:"#9fb7d9"},
{id:"p3",f:1,t:"Mayfair Heritage Townhouse",c:"London",k:"UK",ty:"Townhouse",st:"For Sale",pr:8900000,bd:5,ba:5,ar:4800,d:"Restored Georgian townhouse in the heart of Mayfair with garden and private mews parking.",am:["Garden","Wine cellar","Lift","Parking"],ac:"#d9a59a"},
{id:"p12",f:1,t:"Beverly Hills Contemporary Mansion",c:"Los Angeles",k:"USA",ty:"Villa",st:"New Launch",pr:15800000,bd:7,ba:9,ar:11500,d:"Architectural masterpiece with canyon views, infinity pool, screening room and resort-style gardens.",am:["Infinity pool","Screening room","Wine room","Guest house","Smart home"],ac:"#c9a96a"},
{id:"p2",f:1,t:"Downtown Skyline Penthouse",c:"Dubai",k:"UAE",ty:"Penthouse",st:"Exclusive",pr:6800000,bd:4,ba:5,ar:5400,d:"Full-floor penthouse with floor-to-ceiling views of the Burj Khalifa and fountain show.",am:["Sky terrace","Concierge","Gym","Valet","Private lift"],ac:"#9fb7d9"},
{id:"p11",f:1,t:"Miami Waterfront Estate",c:"Miami",k:"USA",ty:"Villa",st:"For Sale",pr:7900000,bd:6,ba:7,ar:8400,d:"Gated waterfront estate with private yacht dock, pool and tropical landscaped grounds.",am:["Yacht dock","Pool","Outdoor kitchen","Gated","Gym"],ac:"#9ccaa8"},
{id:"p9",t:"Cotswolds Manor House",c:"Oxfordshire",k:"UK",ty:"Villa",st:"Investment",pr:4600000,bd:7,ba:6,ar:9800,d:"Grade II listed manor on 12 acres with stables, tennis court and walled gardens.",am:["12 acres","Stables","Tennis court","Library","Orchard"],ac:"#d9d09a"},
{id:"p7",t:"Bosphorus Waterfront Villa",c:"Istanbul",k:"Türkiye",ty:"Villa",st:"Investment",pr:5200000,bd:5,ba:5,ar:6100,d:"Waterfront villa on the Bosphorus with private dock. Eligible for citizenship by investment.",am:["Private dock","Sea view","Garden","Hammam"],ac:"#d9d09a"},
{id:"p8",t:"Business Bay Office Tower Floor",c:"Dubai",k:"UAE",ty:"Commercial",st:"Investment",pr:3100000,bd:0,ba:4,ar:7500,d:"Fully fitted premium office floor with strong rental yield and prime location.",am:["Fitted","Parking","Metro access","Reception"],ac:"#9fb7d9"},
{id:"p5",t:"F-7 Garden Estate",c:"Islamabad",k:"Pakistan",ty:"Villa",st:"For Sale",pr:2900000,bd:6,ba:7,ar:12000,d:"Two-kanal estate in sector F-7 with landscaped gardens and mountain views.",am:["Garden","Guest wing","Generator","Parking"],ac:"#9ccaa8"},
{id:"p4",t:"DHA Modern Mansion",c:"Lahore",k:"Pakistan",ty:"Villa",st:"Investment",pr:1450000,bd:5,ba:6,ar:9000,d:"Contemporary one-kanal mansion in DHA with home theatre, pool and smart security.",am:["Pool","Theatre","Solar","24/7 security"],ac:"#c9a96a"},
{id:"p6",t:"Clifton Sea-View Residence",c:"Karachi",k:"Pakistan",ty:"Apartment",st:"New Launch",pr:620000,bd:3,ba:3,ar:2800,d:"High-floor apartment with sea views, in a gated tower with full amenities.",am:["Sea view","Gym","Pool","Backup power"],ac:"#b9a5d9"}
];
var OFFICES=[["Dubai","Business Bay, Dubai, UAE"],["London","Mayfair, London, UK"],["New York","Park Avenue, New York, USA"],["Lahore","DHA Phase 6, Lahore, Pakistan"]];

/* ===== CODE ===== */
var $=function(i){return document.getElementById(i)};
var cur="USD",fav=[],curP=null;
(function(){var c="";try{c=localStorage.getItem("aurum_cur")||"";fav=JSON.parse(localStorage.getItem("aurum_fav")||"[]")}catch(e){fav=[]}
 if(Object.prototype.hasOwnProperty.call(CFG.rates,c))cur=c;
 if(!Array.isArray(fav))fav=[];
 fav=fav.filter(function(id){return D.some(function(p){return p.id===id})})})();
function st(k,v){try{localStorage.setItem(k,v)}catch(e){}}
/* price: never undefined / NaN */
function priceOf(p){var n=Number(p&&(p.pr!=null?p.pr:p.price));return isFinite(n)&&n>0?n:0}
function money(u){u=Number(u);if(!isFinite(u)||u<=0)return "Price on Request";
 var r=CFG.rates[cur];if(!r){cur="USD";r=1}
 return (CFG.sym[cur]||"")+Math.round(u*r).toLocaleString("en-US")}
function wa(t){return "https://wa.me/"+CFG.wa+"?text="+encodeURIComponent(t)}
function P(id){return D.filter(function(p){return p.id===id})[0]}
function uniq(k){var a=[];D.forEach(function(p){if(a.indexOf(p[k])<0)a.push(p[k])});return a}
function fill(id,a){var s=$(id);if(!s||s.dataset.filled)return;s.dataset.filled=1;a.forEach(function(x){s.insertAdjacentHTML("beforeend",'<option>'+x+'</option>')})}
function art(p){return '<svg viewBox="0 0 400 230" preserveAspectRatio="xMidYMid slice"><rect width="400" height="230" fill="#17171c"/><g fill="none" stroke="'+p.ac+'" stroke-width="1.4" opacity=".8"><path d="M80 200V110l60-40 60 40v90M140 200v-50h40v50M200 200V90l50-30 70 30v110M30 200h340"/></g></svg><img src="'+CFG.img+p.id+'.jpg" alt="'+p.t+'" loading="lazy" onerror="this.remove()">'}
function spec(p){return '<span>'+(p.bd?p.bd+' Beds':p.ty)+'</span><span>'+p.ba+' Baths</span><span>'+Number(p.ar).toLocaleString("en-US")+' sqft</span>'}
function card(p){var u=priceOf(p);return '<a class="prop rv" href="property.html?id='+p.id+'"><div class="art"><span class="tag">'+p.st+'</span><button class="fav" data-f="'+p.id+'">'+(fav.indexOf(p.id)>=0?"♥":"♡")+'</button>'+art(p)+'</div><div class="info"><div class="loc">'+p.c+', '+p.k+'</div><h3>'+p.t+'</h3><div class="specs">'+spec(p)+'</div><div class="price" data-u="'+u+'">'+money(u)+'</div></div></a>'}
function upd(){document.querySelectorAll("[data-u]").forEach(function(n){n.textContent=money(+n.dataset.u)});calc()}
function reveal(){var io=window.IntersectionObserver&&new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.08});
 document.querySelectorAll(".rv:not(.in)").forEach(function(n){io?io.observe(n):n.classList.add("in")})}
function show(h){$("mb").innerHTML='<button class="x" onclick="shut()">✕</button>'+h;$("ov").classList.add("on");document.body.style.overflow="hidden"}
function shut(){$("ov").classList.remove("on");document.body.style.overflow=""}
function wish(){
 var h='<h2 style="font-size:34px;margin-bottom:6px">Saved Properties</h2>';
 h+=fav.length?fav.map(function(id){var p=P(id),u=priceOf(p);return '<div class="wl"><div class="th"><img src="'+CFG.img+p.id+'.jpg" onerror="this.remove()"></div><a href="property.html?id='+p.id+'" style="flex:1"><b style="font-weight:500">'+p.t+'</b><br><span style="color:var(--gold)" data-u="'+u+'">'+money(u)+'</span></a><button class="heart" data-f="'+id+'" data-r="1">Remove</button></div>'}).join("")+'<button class="btn solid w" onclick="sendAll()">Enquire About All on WhatsApp</button>':'<p style="color:var(--mut)">Nothing saved yet. Tap the heart on any property.</p>';
 show(h)}
function sendAll(){window.open(wa("Hello, I am interested in these properties:\n"+fav.map(function(id){var p=P(id);return "- "+p.t+", "+p.c+" ("+money(priceOf(p))+")"}).join("\n")),"_blank")}

/* remove accidental duplicate blocks from the page */
function dedupe(){var seen={};
 document.querySelectorAll("body>header,body>section,body>.stats,body>.cta,body>.ph").forEach(function(n){
  var k=n.tagName+"|"+n.className+"|"+n.textContent.replace(/\s+/g," ").trim().slice(0,300);
  if(seen[k])n.remove();else seen[k]=1})}

/* nav, footer, floating button */
function layout(){
 document.querySelectorAll("body>nav,body>footer,body>a.wa,body>.ov").forEach(function(n){n.remove()});
 var pg=document.body.dataset.page,L=[["index.html","Home","home"],["properties.html","Properties","list"],["contact.html","Contact","contact"]];
 var ln=function(c){return L.map(function(x){return '<'+(c?'a':'li><a')+' href="'+x[0]+'"'+(x[2]===pg||(pg==="detail"&&x[2]==="list")?' class="on"':'')+'>'+x[1]+'</a>'+(c?'':'</li>')}).join("")};
 document.body.insertAdjacentHTML("afterbegin",'<nav><div class="wrap"><a href="index.html" class="logo">AURUM<small>ESTATES</small></a><ul>'+ln()+'</ul><div class="tools"><select id="cur" aria-label="Currency">'+Object.keys(CFG.rates).map(function(c){return '<option'+(c===cur?' selected':'')+'>'+c+'</option>'}).join("")+'</select><button class="heart" id="wb">♡ <span id="wc">0</span></button></div></div><div class="sub">'+ln(1)+'</div></nav>');
 document.body.insertAdjacentHTML("beforeend",'<footer><div class="wrap"><div class="fg"><div><div class="logo" style="margin-bottom:12px">AURUM ESTATES</div>Global luxury real estate across Dubai, the UK, the USA, Türkiye and Pakistan.</div><div><h4>Explore</h4>'+ln(1)+'</div><div><h4>Contact</h4><a href="mailto:'+CFG.email+'">'+CFG.email+'</a><a href="'+wa("Hello Aurum Estates")+'" target="_blank">WhatsApp</a></div></div><div class="copy">© 2026 Aurum Estates. All rights reserved.</div></div></footer><a class="wa" href="'+wa("Hello Aurum Estates, I would like to know more about your properties.")+'" target="_blank" rel="noopener">WA</a><div class="ov" id="ov"><div class="mb" id="mb"></div></div>');
 $("cur").onchange=function(){cur=this.value;st("aurum_cur",cur);upd()};
 $("wb").onclick=wish;
 $("ov").onclick=function(e){if(e.target===this)shut()};
 document.addEventListener("click",function(e){var b=e.target.closest("[data-f]");if(!b)return;e.preventDefault();e.stopPropagation();
  var id=b.dataset.f,i=fav.indexOf(id);i>=0?fav.splice(i,1):fav.push(id);st("aurum_fav",JSON.stringify(fav));sync();if(b.dataset.r)wish()},true);
 sync()}
function sync(){$("wc").textContent=fav.length;document.querySelectorAll("[data-f]").forEach(function(b){if(b.dataset.r)return;var s=fav.indexOf(b.dataset.f)>=0;b.textContent=b.classList.contains("fav")?(s?"♥":"♡"):(s?"♥ Saved":"♡ Save property")})}

/* HOME */
function home(){
 fill("ht",uniq("ty"));fill("hc",uniq("k"));
 document.querySelector(".hero").style.backgroundImage="linear-gradient(rgba(10,10,12,.6),rgba(10,10,12,.93)),url("+CFG.img+"hero.jpg)";
 $("hgo").onclick=function(){location.href="properties.html?q="+encodeURIComponent($("hq").value)+"&c="+encodeURIComponent($("hc").value)+"&t="+encodeURIComponent($("ht").value)+"&b="+$("hb").value};
 $("feat").innerHTML=D.filter(function(p){return p.f}).slice(0,6).map(card).join("");
 $("dest").innerHTML=uniq("k").map(function(k){var L=D.filter(function(p){return p.k===k}),pr=L.map(priceOf).filter(Boolean),m=pr.length?Math.min.apply(null,pr):0;
  return '<a href="properties.html?c='+encodeURIComponent(k)+'" class="rv"><h3>'+k+'</h3><span>'+L.length+' properties · '+(m?'from <b data-u="'+m+'" style="font-weight:500;color:var(--tx)">'+money(m)+'</b>':'Price on Request')+'</span></a>'}).join("")}

/* LISTING */
function list(){
 fill("t",uniq("ty"));fill("c",uniq("k"));
 var u=new URLSearchParams(location.search);
 $("q").value=u.get("q")||"";$("c").value=u.get("c")||"";$("t").value=u.get("t")||"";$("b").value=u.get("b")||"0";
 var go=function(){
  var q=$("q").value.toLowerCase(),c=$("c").value,t=$("t").value,b=+$("b").value,s=$("s").value;
  var L=D.filter(function(p){return(!q||(p.t+p.c+p.k).toLowerCase().indexOf(q)>=0)&&(!c||p.k===c)&&(!t||p.ty===t)&&(!b||priceOf(p)<=b)});
  if(s==="l")L.sort(function(a,z){return priceOf(a)-priceOf(z)});if(s==="h")L.sort(function(a,z){return priceOf(z)-priceOf(a)});
  $("cnt").textContent=L.length+" PROPERTIES";
  $("list").innerHTML=L.length?L.map(card).join(""):'<p style="text-align:center;color:var(--mut);grid-column:1/-1">No properties match. Try changing the filters.</p>';reveal();sync()};
 ["q","c","t","b","s"].forEach(function(i){$(i).oninput=go});go()}

/* DETAIL */
function detail(){
 var p=P(new URLSearchParams(location.search).get("id")),w=$("det");
 if(!p){w.innerHTML='<div class="head" style="padding:120px 0"><h2>Property not found</h2><br><a class="btn" href="properties.html">Back to properties</a></div>';return}
 curP=p;document.title=p.t+" — AURUM ESTATES";
 var u=priceOf(p),sim=D.filter(function(x){return x.id!==p.id&&(x.k===p.k||x.ty===p.ty)}).slice(0,3);
 w.innerHTML='<div class="crumb"><a href="index.html">Home</a> / <a href="properties.html">Properties</a> / '+p.t+'</div><div class="dgrid"><div><div class="art big"><span class="tag">'+p.st+'</span>'+art(p)+'</div><div class="loc" style="margin-top:26px">'+p.c+', '+p.k+' · '+p.ty+'</div><h1 class="dt">'+p.t+'</h1><div class="price" data-u="'+u+'" style="font-size:38px">'+money(u)+'</div><div class="specs">'+spec(p)+'</div><p class="dd">'+p.d+'</p><h3 class="sh">Amenities</h3><div class="am">'+p.am.map(function(a){return '<span>'+a+'</span>'}).join("")+'</div>'+
 '<div class="box2"><h3 class="sh" style="margin-top:0">Mortgage Calculator</h3><label>Down payment %</label><input id="dp" type="number" value="30"><label>Years</label><input id="yr" type="number" value="20"><label>Interest rate %</label><input id="ir" type="number" value="5" step="0.1"><div class="res"><span style="font-size:10px;letter-spacing:3px;color:var(--mut)">ESTIMATED MONTHLY PAYMENT</span><br><b id="mo">-</b></div></div></div>'+
 '<aside class="side"><div class="box2" style="margin-top:0"><h3 class="sh" style="margin-top:0">Book a Viewing</h3><label>Your name</label><input id="vn"><label>Preferred date</label><input id="vd" type="date"><label>Type</label><select id="vt"><option>In-person visit</option><option>Video tour</option></select><button class="btn solid w" id="bk">Request on WhatsApp</button><button class="btn w" data-f="'+p.id+'">♡ Save property</button></div></aside></div>'+
 '<h2 class="sh2">Similar Properties</h2><div class="grid">'+sim.map(card).join("")+'</div><div style="height:80px"></div>';
 ["dp","yr","ir"].forEach(function(i){$(i).oninput=calc});calc();sync();
 $("bk").onclick=function(){window.open(wa("Hello, I would like to book a viewing.\nProperty: "+p.t+" ("+p.c+", "+p.k+")\nName: "+$("vn").value+"\nDate: "+$("vd").value+"\nType: "+$("vt").value+"\nPrice: "+money(u)),"_blank")}}
function calc(){if(!curP||!$("mo"))return;
 var pr=priceOf(curP)*(1-(+$("dp").value||0)/100),r=(+$("ir").value||0)/1200,n=(+$("yr").value||1)*12;
 var m=r?pr*r/(1-Math.pow(1+r,-n)):pr/n;
 $("mo").textContent=(isFinite(m)&&m>0)?money(m):"-"}

/* CONTACT */
function contact(){
 $("off").innerHTML=OFFICES.map(function(o){return '<div class="off"><b>'+o[0]+'</b><span>'+o[1]+'</span></div>'}).join("");
 $("f").addEventListener("submit",function(e){e.preventDefault();
  window.open(wa("Name: "+$("n").value+"\nPhone: "+$("p").value+"\nEmail: "+$("e").value+"\nInterest: "+$("i").value+"\nMessage: "+$("m").value),"_blank")});
 $("em").href="mailto:"+CFG.email+"?subject=Property enquiry"}

dedupe();
layout();
({home:home,list:list,detail:detail,contact:contact})[document.body.dataset.page]();
reveal();
var cs=document.createElement("script");cs.src="chat.js";document.body.appendChild(cs);
