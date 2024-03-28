let menus = [

    {
      'name': 'BRUSCHETTA DI POMODORI',
      'category': 'ANTIPASTI',
      'description': 'Geröstetes Ciabatta-Brot mit in Knoblauch marinierten Tomaten & Rucola ',
      'price': '8.00',
    },
    {
      'name': 'ZUPPA DI POMODORI ',
      'category': '',
      'description': 'Tomatensuppe mit frischem Basilikum & Croutons ',
      'price': '8.50',
    },
    {
      'name': 'INSALATA MISTA',
      'category': '',
      'description': 'Verschiedene Blattsalate mit Kirschtomaten, Karotten, Oliven mit hausgemachtem Balsamico-Dressing',
      'price': '9.50',
    },

    {
      'name': 'PIZZA VERDURE',
      'category': 'PIZZA',
      'description': 'Tomatensoße, Mozzarella, Zucchini, Paprika, Brokkoli',
      'price': '12.00',
    },
    {
      'name': 'PIZZA FUNGHI',
      'category': '',
      'description': 'Tomatensoße, Mozzarella, Champignons, rote Zwiebeln ',
      'price': '11.00',
    },
    {
      'name': 'PIZZA RUSTICA',
      'category': '',
      'description': 'Tomatensauce, Veganer Käse, Vegane Pfeffersalami, Champignons und Jalapeños.',
      'price': '12.00',
    },
    {
      'name': 'PIZZA VEGETARIA',
      'category': '',
      'description': 'Gegrillten Artischocken, Paprika, Champignons und Broccoli',
      'price': '11.00',
    },
    {
      'name': 'PIZZA VERDURE',
      'category': '',
      'description': 'Tomatensoße, Mozzarella, Zucchini, Paprika, Brokkoli',
      'price': '12.00',
    },
    {
      'name': 'PIZZA FUNGHI',
      'category': '',
      'description': 'Tomatensoße, Mozzarella, Champignons, rote Zwiebeln ',
      'price': '11.00',
    },
    {
      'name': 'PIZZA RUSTICA',
      'category': '',
      'description': 'Tomatensauce, Veganer Käse, Vegane Pfeffersalami, Champignons und Jalapeños.',
      'price': '12.00',
    },
    {
      'name': 'PIZZA VEGETARIA',
      'category': '',
      'description': 'Gegrillten Artischocken, Paprika, Champignons und Broccoli',
      'price': '11.00',
    },
    {
      'name': 'Vegano Rucola Pomodoro',
      'category': '',
      'description': 'San Marzano Tomatensoße, Mozzarella, Rucola, Kirschtomaten, Mandeln und Pesto',
      'price': '13.00',
    },
    {
      'name': 'LINGUINE AL PESTO',
      'category': 'PASTA',
      'category': 'PASTA',
      'description': 'Linguine mit hausgemachtem Basilikum-Pesto',
      'price': '14.00',
    },
    {
      'name': 'PENNE BOLOGNESE',
      'category': '',
      'description': 'Nudeln in Gemüse-Tomatensoße mit Beluga Linsen',
      'price': '13.00',
    },
    {
      'name': 'SPAGHETTI ALIO E OLIO',
      'category': '',
      'description': 'Knoblauch und Olivenöl mit Rucola und Petersilie',
      'price': '11.00',
    },
    {
      'name': 'CREMA AL LIMONE',
      'category': 'DESSERT',
      'description': 'Limonen-Creme aus veganem Joghurt, Hafer-Crunch & Früchten',
      'price': '8.00',
    },
    {
      'name': 'TORTA AL CIOCCOLATO',
      'category': '',
      'description': 'Warmer Schokoladenkuchen mit Vanille-Eis',
      'price': '11.00',
    },

];

load();

let dishes = [];
let prices = [];
let amounts = [];


function render() {
  let menu = document.getElementById('menu');
  
  menu.innerHTML = '';

  for (let i = 0; i < menus.length; i++) {
    
    menu.innerHTML += menuTemplate(i);
  }

  let basket = document.getElementById('basket-content')
  basket.innerHTML = '';

  for (let j = 0; j < dishes.length; j++) {
    
    basket.innerHTML += basketTemplate(j);
  }

  updateBasket();
  calcBasket();
}

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
    <div class="margin-right">
    <span >${amounts[index]}x </span><span>${dishes[index]}</span>
    </div> 
    <div>
      <button onClick="removeAmount(${index})"><img class="dish-icon" src="./icon/minusOR.png" alt="" ></button>
      <span>${amounts[index]}</span>
      <button onclick="addAmount(${index})"><img class="dish-icon" src="./icon/plusOR.png" alt="" ></button>
    </div>
    <div>
     <span class="margin-right">${(prices[index] * amounts[index]).toFixed(2)} € </span> <button onclick="deleteMenu(${index})"><img class="dish-icon" src="./icon/trash.png" alt=""></button>
    </div>
  </div>
  `;
}

function addToBasket(index) {
  let dish = menus[index]['name'];
  let price = parseFloat(menus[index]['price']);
  
  let menuIndex = getDishIndex(dish);
 
  if(menuIndex !== -1) {
    amounts[menuIndex]++
  
  }else {
    dishes.push(dish);
    prices.push(price);
    amounts.push(1)
  }
  
  render();
}

function getDishIndex(dish) {
  
  let index = dishes.indexOf(dish);

  return index;
}

function updateBasket() {
  let emptyBasket = document.getElementById('contentEmptyBasket');

  if(dishes.length === 0) {
    emptyBasket.classList.remove('d-none');
  } else {
    emptyBasket.classList.add('d-none');
  }
}

function removeAmount(index) {
  if (amounts[index] > 1) {
    amounts[index]--;
    calcBasket();
  } else {
    dishes.splice(index, 1);
    prices.splice(index, 1);
    amounts.splice(index, 1);
  }
  
  render();
}

function addAmount(index) {
  amounts[index]++;

  render();

}

function deleteMenu(index) {
  let basketSum = document.getElementById('basketSum');
  let menuIndex = dishes[index];

  if (menuIndex !== -1) {
    dishes.splice(menuIndex, 1);
    prices.splice(menuIndex, 1);
    amounts.splice(menuIndex, 1);
   
  }

  if(dishes.length === 0) {
    basketSum.innerHTML = '';
  }
  updateBasket();
  render();
}

function order() {
  dishes.length = 0;
  prices.length = 0;
  amounts.length = 0; 

  let basketText = document.getElementById('contentEmptyBasket');
  let basketSum = document.getElementById('basketSum');

  basketText.innerHTML = '';
  basketSum.innerHTML = '';

  basketText.innerHTML= 'Vielen Dank für deine Bestellung!';

  render();
}

function calcBasket() {
  let sum = 0;
  let deliverycosts = 0;

  for (let i = 0; i < prices.length; i++) {
    sum += prices[i]*amounts[i];
  }


  if(sum < 25) {
    deliverycosts = 3.50;
  }
  
  if(sum > 0) {
    document.getElementById('basketSum').innerHTML = `
    <div>Zwischensumme ${sum.toFixed(2)} €</div> 
    <div>Lieferkosten ${deliverycosts.toFixed(2)} €</div>
    <span id="min-worth">Mindestbestellwert 30.00 €</span>
    <div>Gesamtkosten ${(sum + deliverycosts).toFixed(2)} €</div>
  `;
  } 
  
  if (sum > 30) {
    document.getElementById('basketSum').innerHTML = `
    <div>Zwischensumme ${sum.toFixed(2)} €</div> 
    <div>Lieferkosten ${deliverycosts.toFixed(2)} €</div>
    <div>Gesamtkosten ${(sum + deliverycosts).toFixed(2)} €</div>
    <div><button id="order-button" class="order-button" onclick="order()">BESTELLEN</button></div>
  `;
  }
}

function openBasket() {
  let responsiveBasket = document.getElementById('responsive-basket')
  responsiveBasket.innerHTML = '';

  for (let i = 0; i < dishes.length; i++) {
    
    responsiveBasket.innerHTML += basketTemplate(i);
  }
    
  updateBasket();
  calcBasket();
  render();
}

function closeBasket(event)  {
  let close = document.getElementById('responsive-basket');
  if(event.target.tagName.toUpperCase() == 'DIV') {
		close.classList.add('d-none');
		close.innerHTML = '';
	}
}


function save() {
  let dishesAsText = JSON.stringify(dishes);
  let pricesAsText = JSON.stringify(prices);
  let amountsAsText = JSON.stringify(amounts);

  localStorage.setItem('dishes', dishesAsText);
  localStorage.setItem('prices', pricesAsText);
  localStorage.setItem('amounts', amountsAsText);
}

function load() {
  let dishesAsText = localStorage.getItem('dishes');
  let pricesAsText = localStorage.getItem('prices');
  let amountsAsText = localStorage.getItem('amounts');

  if(dishesAsText && pricesAsText && amountsAsText) {
    dishes = JSON.parse(dishesAsText);
    prices = JSON.parse(pricesAsText);
    amounts = JSON.parse(amountsAsText);
  }
}
