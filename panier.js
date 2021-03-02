//récupère le contenu du localStorage
let cartContent = JSON.parse(localStorage.getItem('cart'));

/**calcule le prix total du produit */
function calcPriceProduct(price, quantity) {
  return price * quantity;
}

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
    //quand 'click' sur +, augmente la quantité de 1
    cartContent[i].quantity++;
    //met à jour le panier
    localStorage.setItem('cart', JSON.stringify(cartContent));
    //met à jour l'affichage de la quantité et le prix
    productQuantity.innerText = cartContent[i].quantity;
    colPrice.innerText = divide(calcPriceProduct(cartContent[i].price, cartContent[i].quantity));
  });  

  /**Quantité du produit */
  let productQuantity = document.createElement('p');
  productQuantity.classList.add('quantity-product');
  productQuantity.innerText = cartContent[i].quantity;
  colQty.appendChild(productQuantity);
  
  /**icone moins dans col quantité */
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
    
    //met à jour l'affichage de la quantité et le prix
    localStorage.setItem('cart', JSON.stringify(cartContent));
    productQuantity.innerText = cartContent[i].quantity;
    //calcule le prix total du produit
    colPrice.innerText = divide(calcPriceProduct(cartContent[i].price, cartContent[i].quantity));
  });

  /**colonne prix du produit */
  let colPrice = document.createElement('td');
  colPrice.innerText = divide(calcPriceProduct(cartContent[i].price, cartContent[i].quantity));
  tRow.appendChild(colPrice); 
}

/**calcule le prix total du panier */


/**Contrôle du formulaire*/
function verification() {
  // Récupérer la valeur des champs
  let firstName = document.getElementById('first-name').value;
  let name = document.getElementById('name').value;
  let email = document.getElementById('idEmail').value;
  let adress = document.getElementById('adress').value;
  let postalCode = document.getElementById('postal-code').value;
  let city = document.getElementById('city').value;
}