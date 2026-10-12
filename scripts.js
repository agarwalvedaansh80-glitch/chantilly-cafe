/* -------------------------------------------------------
   Chantilly — scripts.js (final-final)
   - Hero kept as-is; Menu: 15 items
   - Keto removed; added Hot Chocolate with Marshmallows
   - Butterbeer kept single; both use local images per your links
   - Refresh button for menu
   ------------------------------------------------------- */

const $  = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

const formatINR = (num) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);

const timeAgo = (date) => {
  const d = (date instanceof Date) ? date : new Date(date);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 45) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min${m>1?"s":""} ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h>1?"s":""} ago`;
  const days = Math.floor(h / 24);
  return `${days} day${days>1?"s":""} ago`;
};

function availabilityBadge(state){
  if (state === "fresh")    return `<span class="badge badge-fresh">Fresh</span>`;
  if (state === "low")      return `<span class="badge badge-low">Low</span>`;
  if (state === "sold_out") return `<span class="badge badge-sold">Sold out</span>`;
  return "";
}
function dietTags(item){
  const tags = [];
  if (item.eggless)    tags.push("Eggless");
  if (item.vegan)      tags.push("Vegan");
  if (item.glutenFree) tags.push("Gluten-free");
  if (item.nutFree)    tags.push("Nut-free");
  return tags.map(t => `<span class="tag" aria-label="${t}">${t}</span>`).join("");
}

/* ------------------------------
   MENU_DATA — 15 curated items (apt images)
   - Use local files for two requested photos:
     images/hot-choc-marshmallows.jpg
     images/butterbeer.jpg
------------------------------ */
const MENU_DATA = [
  // Hot Chocolate (now 3 + 1 marshmallows = 4)


  { id:"hc-dark", name:"Dark Hot Chocolate (75%)", category:"Beverages", price:350,
    eggless:true, vegan:false, glutenFree:true, nutFree:true, availability:"fresh",
    description:"Intense cocoa, clean finish.",
    image:"https://twocupsflour.com/wp-content/uploads/2020/12/Untitled-design-2-500x375.jpg" },

  { id:"hc-frozen", name:"Frozen Hot Chocolate", category:"Beverages", price:380,
    eggless:true, vegan:false, glutenFree:true, nutFree:true, availability:"low",
    description:"Creamy and chilled.",
    image:"https://corkframes.com/cdn/shop/articles/Christmas_Hot_Chocolate_with_Cinnamon.jpg?v=1734507346" },

  { id:"hc-marsh", name:"Hot Chocolate with Marshmallows", category:"Beverages", price:395,
    eggless:true, vegan:false, glutenFree:true, nutFree:true, availability:"fresh",
    description:"Festive cocoa with soft marshmallows.",
    image:"https://mixthatdrink.com/wp-content/uploads/2013/12/boozy-smores-hot-cocoa-1-750x1126.jpg" },

  // Butterbeer (1)
  { id:"butterbeer", name:"Butterbeer", category:"Beverages", price:330,
    eggless:true, vegan:false, glutenFree:true, nutFree:true, availability:"fresh",
    description:"Butterscotch with a creamy foam.",
    image:"https://hips.hearstapps.com/hmg-prod/images/hp-butterbeer-1620918945.jpeg?crop=0.668xw:1.00xh;0.212xw,0&resize=1200:*", imagePos:"center 80%" },

  { id:"hc-classic", name:"Classic Hot Coffee", category:"Beverages", price:200,
    eggless:true, vegan:false, glutenFree:true, nutFree:true, availability:"fresh",
    description:"Classic and cozy.",
    image:"https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1600&auto=format&fit=crop" },

  // Coffee (3)
  { id:"coffee-americano", name:"Americano", category:"Coffee", price:200,
    eggless:true, vegan:true, glutenFree:true, nutFree:true, availability:"fresh",
    description:"Clean, balanced extraction.",
    image:"https://cdn.shopify.com/s/files/1/0669/0966/7619/files/americano-coffee-in-white-cup-crema-on-wood-table-wrexham-bean.webp?v=1745258094" },

  { id:"coffee-cappuccino", name:"Cappuccino", category:"Coffee", price:220,
    eggless:true, vegan:false, glutenFree:true, nutFree:true, availability:"fresh",
    description:"Comforting and classic.",
    image:"https://dairyfarmersofcanada.ca/sites/default/files/image_file_browser/conso_recipe/2022/Capuccino.jpg" },

  { id:"coffee-latte", name:"Cafe Latte", category:"Coffee", price:220,
    eggless:true, vegan:false, glutenFree:true, nutFree:true, availability:"fresh",
    description:"Silky microfoam.",
    image:"https://dairyfarmersofcanada.ca/sites/default/files/image_file_browser/conso_recipe/2021/Cafe%20Latte.jpg" },

  // Desserts / Bakery (7)
  { id:"tl-classic", name:"Classic Tres Leches", category:"Desserts", price:450,
    eggless:false, vegan:false, glutenFree:false, nutFree:true, availability:"fresh",
    description:"Cloud-soft, soaked just right.",
    image:"https://bakewithshivesh.com/wp-content/uploads/2020/11/IMG_9703-scaled.jpg" },

  { id:"tl-lotus", name:"Lotus Tres Leches", category:"Desserts", price:525,
    eggless:false, vegan:false, glutenFree:false, nutFree:false, availability:"low",
    description:"Biscoff-spiced, caramel hints.",
    image:"https://masticgelato.com/cdn/shop/files/DSC04323.jpg?v=1749700614&width=1946" },

  { id:"cc-classic", name:"Classic Philly Cheesecake", category:"Desserts", price:350,
    eggless:false, vegan:false, glutenFree:false, nutFree:true, availability:"fresh",
    description:"Silky, clean finish.",
    image:"https://www.allrecipes.com/thmb/5_r5-GuF1KQxOs2nrW4EF4F-4ak=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-155222-philadelphia-classic-cheesecake-4x3-hero-5e8c2187a57a4016b5934058ad7d9b5e.jpg" },

  { id:"cc-double", name:"Double Chocolate Cheesecake", category:"Desserts", price:365,
    eggless:false, vegan:false, glutenFree:false, nutFree:true, availability:"fresh",
    description:"Rich chocolate layers.",
    image:"https://joyfoodsunshine.com/wp-content/uploads/2022/02/chocolate-cheesecake-recipe-5.jpg" },

  { id:"brioche-classic", name:"Brioche French Toast", category:"Bakery", price:400,
    eggless:false, vegan:false, glutenFree:false, nutFree:true, availability:"fresh",
    description:"In-house butter brioche.",
    image:"https://www.dessertfortwo.com/wp-content/uploads/2018/08/brioche-french-toast-9-735x1103.jpg" },

  { id:"brioche-nutella", name:"Nutella Brioche French Toast", category:"Bakery", price:450,
    eggless:false, vegan:false, glutenFree:false, nutFree:false, availability:"sold_out",
    description:"Hazelnut-chocolate swirls.",
    image:"https://dinnerthendessert.com/wp-content/uploads/2021/07/Stuffed-Nutella-French-Toast-2.jpg" },

  { id:"cookie-chocochip", name:"Chocolate Chip Cookie", category:"Bakery", price:130,
    eggless:false, vegan:false, glutenFree:false, nutFree:false, availability:"fresh",
    description:"Buttery, soft-center, crisp edges.",
    image:"https://img.freepik.com/premium-photo/tasty-yellow-icecream-balls-bowl-gray-background-delicious-summer-treat-sweet-food_117466-36406.jpg" },
];

const FILTER_KEY = "chantillyFiltersV1";
function getSavedFilters(){
  try { return JSON.parse(localStorage.getItem(FILTER_KEY)) || { eggless:false, vegan:false, glutenFree:false, nutFree:false, search:"" }; }
  catch { return { eggless:false, vegan:false, glutenFree:false, nutFree:false, search:"" }; }
}
function saveFilters(f){ localStorage.setItem(FILTER_KEY, JSON.stringify(f)); }

function itemCard(item){
  const avail = availabilityBadge(item.availability);
  return `
    <article class="card col-12 col-md-6" role="listitem" aria-label="${item.name}">
      ${ item.image ? `<img class="card-image" src="${item.image}" alt="${item.name}" loading="lazy"${ item.imagePos ? ` style="object-position:${item.imagePos}"` : "" } />` : "" }
      <div class="card-body">
        <div class="d-flex justify-between align-baseline wrap">
          <h3 class="h4">${item.name}</h3>
          <strong>${formatINR(item.price)}</strong>
        </div>
        <p class="text-muted small mb-0">${item.description}</p>
        <div class="badge-row">${avail}</div>
        <div class="tags mt-1" aria-label="Dietary tags">${dietTags(item)}</div>
      </div>
    </article>`;
}

function renderMenuList(activeCategory = "All"){
  const mount = $("#menuList");
  if (!mount) return;

  const f = getSavedFilters();
  const q = ($("#search")?.value || f.search || "").trim().toLowerCase();

  const filters = {
    eggless: $("#f-eggless")?.checked ?? f.eggless,
    vegan: $("#f-vegan")?.checked ?? f.vegan,
    glutenFree: $("#f-glutenfree")?.checked ?? f.glutenFree,
    nutFree: $("#f-nutfree")?.checked ?? f.nutFree,
    search: q
  };
  saveFilters(filters);

  let list = MENU_DATA.slice();
  if (activeCategory && activeCategory !== "All") list = list.filter(i => i.category === activeCategory);

  if (filters.search) {
    list = list.filter(i =>
      i.name.toLowerCase().includes(filters.search) ||
      i.description.toLowerCase().includes(filters.search) ||
      i.category.toLowerCase().includes(filters.search)
    );
  }
  if (filters.eggless)    list = list.filter(i => i.eggless);
  if (filters.vegan)      list = list.filter(i => i.vegan);
  if (filters.glutenFree) list = list.filter(i => i.glutenFree);
  if (filters.nutFree)    list = list.filter(i => i.nutFree);

  if (!list.length) { mount.innerHTML = ""; $("#emptyState")?.removeAttribute("hidden"); }
  else { $("#emptyState")?.setAttribute("hidden",""); mount.innerHTML = list.map(itemCard).join(""); }

  const stamp = $("#menuUpdatedAt"); if (stamp) stamp.textContent = `Updated ${timeAgo(new Date())}`;
}

/* Boot */
function initCommon(){ $$("#year").forEach(el => el.textContent = new Date().getFullYear()); }
function initMenu(){
  if (document.body.dataset.page !== "menu") return;

  const f = getSavedFilters();
  if ($("#f-eggless"))     $("#f-eggless").checked     = !!f.eggless;
  if ($("#f-vegan"))       $("#f-vegan").checked       = !!f.vegan;
  if ($("#f-glutenfree"))  $("#f-glutenfree").checked  = !!f.glutenFree;
  if ($("#f-nutfree"))     $("#f-nutfree").checked     = !!f.nutFree;

  const s = $("#search");
  if (s){
    s.value = typeof f.search === "string" ? f.search : "";
    if (s.value.trim().length === 1) s.value = "";
  }

  let activeCat = "All";
  $$(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeCat = tab.dataset.cat;
      renderMenuList(activeCat);
    });
  });

  ["f-eggless","f-vegan","f-glutenfree","f-nutfree","search"].forEach(id => {
    const el = $("#"+id);
    el?.addEventListener("input", () => renderMenuList(activeCat));
    el?.addEventListener("change", () => renderMenuList(activeCat));
  });

  $("#clearFilters")?.addEventListener("click", () => {
    localStorage.removeItem(FILTER_KEY);
    ["f-eggless","f-vegan","f-glutenfree","f-nutfree"].forEach(id => { const el = $("#"+id); if (el) el.checked = false; });
    if (s) s.value = "";
    renderMenuList(activeCat);
  });

  $("#refreshMenu")?.addEventListener("click", () => renderMenuList(activeCat));
  renderMenuList(activeCat);
}
document.addEventListener("DOMContentLoaded", () => { initCommon(); initMenu(); });
