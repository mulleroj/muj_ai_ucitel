// Volitelně nastav veřejnou adresu webu. Na nasazeném webu se jinak použije aktuální URL.
const QR_PAGE_URL = "";
const promptBox = document.querySelector("[data-prompt]");
const statusNodes = [...document.querySelectorAll(".status")];
function announce(message){statusNodes.forEach(node=>node.textContent=message);setTimeout(()=>statusNodes.forEach(node=>node.textContent=""),2800)}
async function getPrompt(){const res=await fetch("prompt.txt");if(!res.ok)throw Error("Prompt není dostupný");return (await res.text()).replace(/^\uFEFF/,"").trimEnd()}
async function copyPrompt(){let text;try{text=await getPrompt()}catch{announce("Text promptu se nepodařilo načíst. Zkontroluj soubor prompt.txt a obnov stránku.");return}try{if(!navigator.clipboard?.writeText)throw Error("Schránka není dostupná");await navigator.clipboard.writeText(text);announce("Prompt byl zkopírován.")}catch{announce("Kopírování se nepodařilo. Zkus stránku otevřít přes HTTPS a povolit schránku.")}}
document.querySelectorAll("[data-copy]").forEach(button=>button.addEventListener("click",copyPrompt));
function renderPrompt(text){promptBox.replaceChildren();let list=null;text.replace(/^\uFEFF/,"").split(/\r?\n/).forEach((line,index)=>{const value=line.trim();if(!value){list=null;return}const heading=/^(?:\d+\. )?[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ –—!?.,]+$/.test(value);const numbered=/^\d+\.\s/.test(value),bullet=/^-\s/.test(value);if(heading){list=null;const el=document.createElement(index<2?"p":"h3");el.textContent=value;promptBox.append(el);return}if(numbered||bullet){const tag=numbered?"ol":"ul";if(!list||list.tagName.toLowerCase()!==tag){list=document.createElement(tag);promptBox.append(list)}const li=document.createElement("li");li.textContent=value.replace(numbered?/^\d+\.\s/:/^-\s/,"");list.append(li);return}list=null;const p=document.createElement("p");p.textContent=value;promptBox.append(p)})}
async function init(){try{renderPrompt(await getPrompt())}catch{promptBox.textContent="Prompt se nepodařilo načíst. Obnov stránku nebo otevři soubor prompt.txt."}const status=document.querySelector("[data-qr-status]"),canvas=document.getElementById("qr-canvas"),download=document.querySelector("[data-download]"),host=location.hostname;const localHost=["localhost","127.0.0.1","::1"].includes(host);if(!QR_PAGE_URL&&localHost){canvas.hidden=true;download.removeAttribute("href");download.setAttribute("aria-disabled","true");download.tabIndex=-1;download.textContent="QR ke stažení po nasazení";download.addEventListener("click",event=>event.preventDefault());document.querySelector("[data-qr-url]").textContent="QR kód pro sdílení bude dostupný až po nasazení stránky.";status.textContent="Místní náhled není veřejný odkaz.";return}const url=QR_PAGE_URL||location.href.split("#")[0];document.querySelector("[data-qr-url]").textContent=`QR odkaz: ${url}`;try{if(!window.QRCode)throw Error();await QRCode.toCanvas(canvas,url,{width:440,margin:2,errorCorrectionLevel:"M",color:{dark:"#1c2940",light:"#ffffff"}});download.href=canvas.toDataURL("image/png");download.removeAttribute("aria-disabled");status.textContent="Naskenuj a otevři stránku."}catch{canvas.hidden=true;status.textContent="QR kód se nepodařilo načíst. Zkus stránku otevřít znovu."}}
init();






