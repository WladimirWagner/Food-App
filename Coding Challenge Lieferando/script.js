let menus = ['Buddha Bowl', 'Curry Bowl'];
let prices = [12.50, 10.50];
let amounts = [2, 1];


function getValueFromInput(inputId) {
  let inputField = document.getElementById(inputId);

  return inputField.value;
}

function getMenuFromInput() {
  let menuValue = getValueFromInput('menu').trim();
  
  return menuValue;
}

function getPriceFromInput() {
  let priceValue = getValueFromInput('price');
  
  let parsedPrice = parseFloat(priceValue);
  
  return parsedPrice;
}

function onAddMenu() {
  let menu = getMenuFromInput();
  let price = getPriceFromInput();
  
  let menuIndex = getMenuIndex(menu);
 
  if(menuIndex !== -1) {
    amounts[menuIndex]++
  
  }else {
    menus.push(menu);
    prices.push(price);
    amounts.push(1)
  }

  console.log(menus);
  console.log(prices);
  console.log(amounts);
}

function getMenuIndex(menu) {
  
  let index = menus.indexOf(menu);

    return index;
}