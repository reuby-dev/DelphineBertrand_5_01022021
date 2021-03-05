/**RECUPERE LE CONTENU DU LOCAL STORAGE*/
let cartContent = JSON.parse(localStorage.getItem('cart'));

/** BOUCLE REMPLISSAGE DU TABLEAU */
for (let i=0; i < cartContent.length; i++) {

  //Ligne parent du tableau récapitulatif du panier
  let tBody = document.getElementById('cart-tablebody');

  //création de ligne de tableau
  let tRow = document.createElement('tr');
  tBody.appendChild(tRow);

  //colonne nom du produit
  let colName = document.createElement('td');
  colName.innerText = cartContent[i].name;
  tRow.appendChild(colName);

  //colonne quantité du produit
  let colQty = document.createElement('td');
  tRow.appendChild(colQty);

  //icone plus dans col quantité
  let plusIcon = document.createElement('i');
  plusIcon.classList.add('fas', 'fa-plus', 'plus-icon');
  colQty.appendChild(plusIcon);

  plusIcon.addEventListener('click', function() {
    //quand 'click' sur +, augmente la quantité de 1
    cartContent[i].quantity++;
    //met à jour le panier
    localStorage.setItem('cart', JSON.stringify(cartContent));
    //met à jour l'affichage de la quantité, le prix des articles et le prix total du panier
    productQuantity.innerText = cartContent[i].quantity;
    displaySubTotal (cartContent);
    colPrice.innerText = divide(calcPriceProduct(cartContent[i].price, cartContent[i].quantity));
  });  

  /**QUANTITE DU PRODUIT */
  let productQuantity = document.createElement('p');
  productQuantity.classList.add('quantity-product');
  productQuantity.innerText = cartContent[i].quantity;
  colQty.appendChild(productQuantity);
  
  /**ICONE MOINS DANS COL QUANTITE */
  let minusIcon = document.createElement('i');
  minusIcon.classList.add('fas', 'fa-minus', 'minus-icon');
  colQty.appendChild(minusIcon);

  minusIcon.addEventListener('click', function() {
    //quand 'click' sur -, diminue la quantité de 1
    cartContent[i].quantity--;
    //si la quantité du produit est inférieure ou égale à 0, supprimer le produit du localstorage et de l'affichage du tableau
    if (cartContent[i].quantity <= 0) {
      
      cartContent.splice([i], 1);
      localStorage.setItem('cart', JSON.stringify(cartContent));
      tBody.removeChild(tRow);
    }
    
    //met à jour l'affichage de la quantité le prix des articles et le prix total du panier
    localStorage.setItem('cart', JSON.stringify(cartContent));
    console.log(i);
    console.log(cartContent[i]);
    
    productQuantity.innerText = cartContent[i].quantity;
    displaySubTotal (cartContent);
    //calcule le prix total du produit
    colPrice.innerText = divide(calcPriceProduct(cartContent[i].price, cartContent[i].quantity));
  });

  /**COLONNE PRIX DU PRODUIT */
  let colPrice = document.createElement('td');
  colPrice.innerText = divide(calcPriceProduct(cartContent[i].price, cartContent[i].quantity));
  tRow.appendChild(colPrice); 
}

/**AJOUTE LE TOTAL AU SPAN SUBTOTAL A L'ARRIVEE SUR LA PAGE DU PANIER*/
displaySubTotal (cartContent);


/**REQUETE D'ENVOI DE LA COMMANDE */

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

  //si le panier est vide
  if (cartContent.length === 0 ) {
    let containerCart = document.getElementById('container-cart');
    let emptyCart = document.createElement('p');
    emptyCart.classList.add('text-danger', 'fs-6');
    emptyCart.innerText = 'Votre panier est vide, merci d\'y ajouter au moins un produit.';
    containerCart.appendChild(emptyCart);
  }

  //si le champ firstname est vide
  if (firstName === "") {
    let firstNameContainer = document.getElementById('first-name-container');
    let emptyFirstName = document.createElement('p');
    alertMessage(emptyFirstName, firstNameContainer);   
  }

  //si le champ nom est vide
  if (lastName === "") {
    let lastNameContainer = document.getElementById('last-name-container');
    let emptyLastName = document.createElement('p');
    alertMessage(emptyLastName, lastNameContainer);
  }

  //si le champ email est vide
  if (email === "") {
    let emailContainer = document.getElementById('email-container');
    let emptyEmail = document.createElement('p');
    alertMessage(emptyEmail, emailContainer);
  }

  //si le champ adresse est vide
  if (address === "") {
    let addressContainer = document.getElementById('address-container');
    let emptyAddress = document.createElement('p');
    alertMessage(emptyAddress, addressContainer);
  }

  //si le champ code postal est vide
  if (postalCode === "") {
    let postalCodeContainer = document.getElementById('postal-code-container');
    let emptyPostalCode = document.createElement('p');
    alertMessage(emptyPostalCode, postalCodeContainer);   
  }

  //si le champ ville est vide
  if (city === "") {
    let cityContainer = document.getElementById('city-container');
    let emptyCity = document.createElement('p');
    alertMessage(emptyCity, cityContainer);    
  }
  
  /**RECUPERE LES IDENTIFIANTS DU PRODUIT DU PANIER */
  let idProducts=[];
  for (let i =0; i < cartContent.length; i++) {
    result = cartContent[i].id;
    idProducts.push(result);
  }

  /**REQUETE D'ENVOI */
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({"contact":{"firstName":firstName,"lastName":lastName,"address":address,"city":city,"email":email},"products":[idProducts]});

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  function saveOrderId(result) {
    //récupère l'order Id depuis la réponse de l'api
    let id = result.orderId;  

    //stocke l'order Id dans le local storage pour pouvoir le récupérer dans la page de validation
    let orderId = [];
    orderId.push(id);
    localStorage.setItem('orderId', JSON.stringify(orderId));
  }


  fetch('http://localhost:3000/api/teddies/order/', requestOptions)
  .then(function (response) {
      return response.json();
  }).then(function (result) {
      console.log(result);  
      saveOrderId(result);
  })
})