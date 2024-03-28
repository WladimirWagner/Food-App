function menuTemplate(index) {
  const menu = menus[index];
  return `
  <span id="${menu['category']}" class="category">${menu['category']}</<span>
  <div class="menu">
    <div class="menu-name">
      <h3>${menu['name']}</h3><img id="addButton${index}" class="icon" src="./icon/plus.png" alt="addBasket" onclick="addToBasket(${index})">
    </div>
      <span id="menu${index}">${menu['description']}</span><br>
      <span id="price${index}">${menu['price']} €</span>
  </div>
  `;
}

function basketTemplate(index) {
  return `
  <div class="basket-content">
    <div class="margin-right margin-bottom">
    <span >${amounts[index]}x </span><span>${dishes[index]}</span>
    </div> 
    <div class="margin-bottom">
      <button class="basket-button" onClick="removeAmount(${index})"><img class="dish-icon" src="./icon/minusOR.png" alt="" ></button>
      <span>${amounts[index]}</span>
      <button class="basket-button" onclick="addAmount(${index})"><img class="dish-icon" src="./icon/plusOR.png" alt="" ></button>
    </div>
    <div class="margin-bottom">
     <span class="margin-right">${(prices[index] * amounts[index]).toFixed(2)} € </span> <button class="basket-button" onclick="deleteMenu(${index})"><img class="dish-icon" src="./icon/trash.png" alt=""></button>
    </div>
  </div>
  `;
}

function sumContent1(sum, deliverycosts) {
  return `
  <div><button id="close-button" class="close-button d-none" onclick="closeBasket()">MEHR PRODUKTE</button>
  </div>
  <div>Zwischensumme ${sum.toFixed(2)} €</div> 
    <div>Lieferkosten ${deliverycosts.toFixed(2)} €</div>
    <span id="min-worth">Mindestbestellwert 30.00 €</span>
    <div>Gesamtkosten ${(sum + deliverycosts).toFixed(2)} €</div>
    
  `;
}

function sumContent2(sum, deliverycosts) {
  return `
  <div><button id="close-button" class="close-button d-none" onclick="closeBasket()">PRODUKTE HINZUFÜGEN</button>
  </div>
  <div>Zwischensumme ${sum.toFixed(2)} €</div> 
    <div>Lieferkosten ${deliverycosts.toFixed(2)} €</div>
    <div>Gesamtkosten ${(sum + deliverycosts).toFixed(2)} €</div>
    <div><button id="order-button" class="order-button" onclick="order()">BESTELLEN</button></div>
    
  `;
}