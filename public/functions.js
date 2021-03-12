/*DIVISE LE PRIX PAR 100 ET LE CONVERTI EN NOMBRE DECIMAL*/
function divide(price) {
    let division = price / 100;
    division = division.toFixed(2);
    return division;
}

/**CALCULE LE PRIX TOTAL DU PRODUIT*/
function calcPriceProduct(price, quantity) {
    return price * quantity;
}

/**CALCULE LE PRIX TOTAL DU PANIER */
function getSubTotal(cartContent) {

    //initialise la variable du prix total
    let total = 0;
  
    //additionne les prix entre eux
    for (let i = 0; i < cartContent.length; i++) {
      let allPrices =  calcPriceProduct(cartContent[i].price, cartContent[i].quantity);
      total += allPrices;
    }
    return total;
}

/**AJOUTE LE SUBTOTAL AU SPAN */
function displaySubTotal (cartContent) {
    let subTotal = document.getElementById('subtotal');
    subTotal.innerText = divide(getSubTotal(cartContent));
}