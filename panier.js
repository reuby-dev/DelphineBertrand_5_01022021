//récupère le contenu du localStorage
let cartContent = JSON.parse(localStorage.getItem('cart'));

/** boucle remplissage du tableau */
for (let i=0; i < cartContent.length; i++) {

  /**Ligne parent du tableau récapitulatif du panier */
  let tBody = document.getElementById('cart-tablebody');

  /**création de ligne de tableau */
  let tRow = document.createElement('tr');
  tBody.appendChild(tRow);

  /**colonne nom du produit*/
  let colName = document.createElement('td');
  colName.innerText = cartContent[i].name;
  tRow.appendChild(colName);

  /**colonne quantité du produit */
  let colQty = document.createElement('td');
  tRow.appendChild(colQty);

  /**icone plus dans col quantité */
  let plusIcon = document.createElement('i');
  plusIcon.classList.add('fas', 'fa-plus', 'plus-icon');
  colQty.appendChild(plusIcon);

  plusIcon.addEventListener('click', function() {
    comportmentIcon(+1, cartContent, i, productQuantity, colPrice);
  });  

  /**Quantité du produit à l'arrivée sur la page */
  let productQuantity = document.createElement('p');
  productQuantity.classList.add('quantity-product');
  productQuantity.innerText = cartContent[i].quantity;
  colQty.appendChild(productQuantity);
  
  /**icone moins dans col quantité */
  let minusIcon = document.createElement('i');
  minusIcon.classList.add('fas', 'fa-minus', 'minus-icon');
  colQty.appendChild(minusIcon);

  minusIcon.addEventListener('click', function() {
    comportmentIcon(-1, cartContent, i, productQuantity, colPrice);
  });

  /**colonne prix du produit */
  let colPrice = document.createElement('td');
  colPrice.innerText = divide(calcPriceProduct(cartContent[i].price, cartContent[i].quantity));
  tRow.appendChild(colPrice); 
}

//ajoute le total au span 'subtotal' à l'arrivée sur la page panier
let subTotal = document.getElementById('subtotal');
subTotal.innerText = divide(getSubTotal(cartContent));


/**Requête d'envoi de la commande */

//quand on clique sur le bouton de confirmation, envoie la requete
let buttonConfirm = document.getElementById('confirm-command');
buttonConfirm.addEventListener('click', function(){

  //Récupère les valeurs des champs du formulaire
  let firstName = document.getElementById('first-name').value;
  let lastName = document.getElementById('last-name').value;
  let email = document.getElementById('email').value;
  let address = document.getElementById('address').value;
  let postalCode = document.getElementById('postal-code').value;
  let city = document.getElementById('city').value;

  //conditions d'envoi
  if (cartContent.length === 0 ) {
    let containerCart = document.getElementById('container-cart');
    let emptyCart = document.createElement('p');
    emptyCart.classList.add('text-danger', 'fs-6');
    emptyCart.innerText = 'Votre panier est vide, merci d\'y ajouter au moins un produit.';
    containerCart.appendChild(emptyCart);
  }
  if (firstName === "") {
    let firstNameContainer = document.getElementById('first-name-container');
    let emptyFirstName = document.createElement('p');
    messageAlert(emptyFirstName, firstNameContainer)
  }
  if (lastName === "") {
    let lastNameContainer = document.getElementById('last-name-container');
    let emptyLastName = document.createElement('p');
    messageAlert(emptyLastName, lastNameContainer)  
  }
  if (email === "") {
    let emailContainer = document.getElementById('email-container');
    let emptyEmail = document.createElement('p');
    messageAlert(emptyEmail, emailContainer)
  }
  if (address === "") {
    let addressContainer = document.getElementById('address-container');
    let emptyAddress = document.createElement('p');
    messageAlert(emptyAddress, addressContainer)   
  }
  if (postalCode === "") {
    let postalCodeContainer = document.getElementById('postal-code-container');
    let emptyPostalCode = document.createElement('p');
    messageAlert(emptyPostalCode, postalCodeContainer)   
  }
  if (city === "") {
    let cityContainer = document.getElementById('city-container');
    let emptyCity = document.createElement('p');
    messageAlert(emptyCity, cityContainer) 
  }  
  
  //récupère les identifiants des produits du panier
  let idProducts=[];
  for (let i =0; i < cartContent.length; i++) {
    result = cartContent[i].id;
    idProducts.push(result);
  }

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({"contact":{"firstName":firstName,"lastName":lastName,"address":address,"city":city,"email":email},"products":[idProducts]});

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

fetch("http://localhost:3000/api/teddies/order/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
})