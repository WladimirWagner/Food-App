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

let dishes = [];
let prices = [];
let amounts = [];

load();

function render() {
  renderMenu();
  renderBasket();
  updateBasket();
  calcBasket();
}

function renderMenu() {
  let menu = document.getElementById('menu');
  menu.innerHTML = '';

  for (let i = 0; i < menus.length; i++) {
    
    menu.innerHTML += menuTemplate(i);
  }
}

function renderBasket() {
  let basket = document.getElementById('basket-content')
  basket.innerHTML = '';

  for (let i = 0; i < dishes.length; i++) {
    
    basket.innerHTML += basketTemplate(i);
  }
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
  save();
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
  save();
}

function addAmount(index) {
  amounts[index]++;

  render();
  save();
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
  save();
}

function order() {
  dishes.length = 0;
  prices.length = 0;
  amounts.length = 0; 

  let basketText = document.getElementById('contentEmptyBasket');
  let basketSum = document.getElementById('basketSum');

  basketText.innerHTML = '';
  basketSum.innerHTML = '';

  basketText.innerHTML= `Vielen Dank für deine Bestellung!
  <div><button id="close-button" class="close-button d-none" onclick="closeBasket()">MEHR BESTELLEN?</button></div>
  `;
  
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
    document.getElementById('basketSum').innerHTML = sumContent1(sum, deliverycosts);
  } 
  if (sum > 30) {
    document.getElementById('basketSum').innerHTML = sumContent2(sum, deliverycosts);
  }
}

function openBasket() {
  let responsiveBasket = document.getElementById('sidebar-right');

  responsiveBasket.classList.add('d-flex');
}

function closeBasket()  {
  let responsiveBasket = document.getElementById('sidebar-right');

  responsiveBasket.classList.remove('d-flex');
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
