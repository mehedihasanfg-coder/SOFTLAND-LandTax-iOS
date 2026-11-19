(()=>{
const $=id=>document.getElementById(id);
const fmt=n=>"৳ "+new Intl.NumberFormat("en-BD",{maximumFractionDigits:2}).format(n);
const val=id=>{const n=parseFloat($(id).value.replace(/,/g,"."));return Number.isFinite(n)&&n>0?n:0};
const now=new Date();
const cy=now.getMonth()>=6?now.getFullYear():now.getFullYear()-1;
const fy=y=>y+"-"+String((y+1)%100).padStart(2,"0");
const toast=m=>{$("toast").textContent=m;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2400)};

// These are approximate sample rates, not official government rates.
const rateTable={
  union:{nal:2,res:10,com:50,ind:50},
  municipality:{nal:2,res:40,com:120,ind:120},
  city:{nal:50,res:50,com:250,ind:250}
};
const areaNames={union:"ইউনিয়ন পরিষদ",municipality:"পৌরসভা",city:"সিটি কর্পোরেশন"};
for(let y=1910;y<=cy;y++){
  const o=document.createElement("option");o.value=y;o.textContent=y;$("paidYear").append(o);
}
$("paidYear").value="";
function calc(){
  const rates=rateTable[$("areaType").value]||rateTable.union;
  const n=val("nal"),r=val("res"),c=val("com");
  const annual=n*rates.nal+r*rates.res+c*rates.com;
  const paidValue=$("paidYear").value;
  if(!paidValue){
    $("paidText").textContent="";$("startText").textContent="";
    ["selected","start","currentFY","count","recentYears","olderYears","currentLabel","recentLabel","olderLabel","currentAmount","recentAmount","olderAmount","penaltyAmount","totalAmount"].forEach(id=>$(id).textContent="—");
    return;
  }
  const paid=Number(paidValue);
  const first=paid+1;
  const arrears=Math.max(0,cy-first);
  const recent=Math.min(3,arrears);
  const older=Math.max(0,arrears-3);
  const penalty=annual*.0625*(arrears*(arrears+1)/2);
  const total=annual+annual*arrears+penalty;

  $("rateNal").textContent=fmt(rates.nal);
  $("rateRes").textContent=fmt(rates.res);
  $("rateCom").textContent=fmt(rates.com);
  $("rateInd").textContent=fmt(rates.ind);
  $("areaTotal").textContent=(n+r+c).toFixed(2)+" শতাংশ";
  $("paidText").textContent="আপনি "+fy(paid)+" অর্থবছরের কর পরিশোধ করেছেন ধরা হয়েছে।";
  $("startText").textContent="বকেয়া হিসাব শুরু: ১ জুলাই "+first;
  $("selected").textContent=fy(paid);
  $("start").textContent="১ জুলাই "+first;
  $("currentFY").textContent=fy(cy)+" (চলমান)";
  $("count").textContent=arrears+" বছর";
  $("recentYears").textContent=recent?recent+" বছর ("+fy(cy-recent)+" থেকে "+fy(cy-1)+")":"০ বছর";
  $("olderYears").textContent=older?older+" বছর ("+fy(first)+" থেকে "+fy(cy-recent-1)+")":"০ বছর";
  $("currentLabel").textContent="("+fy(cy)+" — ১ বছর)";
  $("recentLabel").textContent="("+recent+" বছর)";
  $("olderLabel").textContent="("+older+" বছর)";
  $("currentAmount").textContent=fmt(annual);
  $("recentAmount").textContent=fmt(annual*recent);
  $("olderAmount").textContent=fmt(annual*older);
  $("penaltyAmount").textContent=fmt(penalty);
  $("totalAmount").textContent=fmt(total);
}
["nal","res","com","paidYear"].forEach(id=>{
  $(id).addEventListener("input",calc);
  $(id).addEventListener("change",calc);
});
const resultsButton=$("showResults");
const resultPanel=$("resultPanel");
resultsButton.addEventListener("click",()=>{
  const opening=resultPanel.hidden;
  resultPanel.hidden=!opening;
  resultsButton.setAttribute("aria-expanded",String(opening));
});
const areaButton=$("areaTypeButton");
const areaOptions=$("areaTypeOptions");
areaButton.addEventListener("click",()=>{
  const opening=areaOptions.hidden;
  areaOptions.hidden=!opening;
  areaButton.setAttribute("aria-expanded",String(opening));
});
areaOptions.querySelectorAll("[data-area-value]").forEach(option=>option.addEventListener("click",()=>{
  $("areaType").value=option.dataset.areaValue;
  areaButton.innerHTML=areaNames[option.dataset.areaValue]+' <span aria-hidden="true">⌄</span>';
  areaOptions.hidden=true;
  areaButton.setAttribute("aria-expanded","false");
  calc();
}));
$("clear").onclick=()=>{
  $("nal").value="";$("res").value="";$("com").value="";
  $("areaType").value="union";areaButton.innerHTML=areaNames.union+' <span aria-hidden="true">⌄</span>';areaOptions.hidden=true;areaButton.setAttribute("aria-expanded","false");$("paidYear").value="";
  resultPanel.hidden=true;resultsButton.setAttribute("aria-expanded","false");
  $("areaTotal").textContent="0.00 শতাংশ";
  ["selected","start","currentFY","count","recentYears","olderYears","currentLabel","recentLabel","olderLabel","currentAmount","recentAmount","olderAmount","penaltyAmount","totalAmount"].forEach(id=>$(id).textContent="—");
  $("paidText").textContent="";$("startText").textContent="";
  calc();
  toast("সব ইনপুট ও ফলাফল মুছে ফেলা হয়েছে");
  window.scrollTo({top:0,behavior:"smooth"});
};
document.querySelectorAll("[data-info]").forEach(b=>b.onclick=()=>toast(b.dataset.info));
calc();
if("serviceWorker"in navigator&&location.protocol.startsWith("http")){
  addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
}
})();