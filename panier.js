//récupère le contenu du localStorage
let cartContent = JSON.parse(localStorage.getItem('cart'));

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
  let plusIcon = document.createElement('p');
  plusIcon.classList.add('fas', 'fa-plus', 'plus-icon');
  colQty.appendChild(plusIcon);
  plusIcon.addEventListener('click', function() {
    //quand 'click' sur +, augmente la quantité de 1
    cartContent[i].quantity++;
    //calcule le prix total du produit
    let priceProduct = cartContent[i].price * cartContent[i].quantity;
    //met à jour le panier
    localStorage.setItem('cart', JSON.stringify(cartContent));
    //met à jour l'affichage de la quantité et le prix
    productQuantity.innerText = cartContent[i].quantity;
    colPrice.innerText = divide(priceProduct);
  });  

  /**Quantité du produit */
  let productQuantity = document.createElement('p');
  productQuantity.classList.add('quantity-product');
  productQuantity.innerText = cartContent[i].quantity;
  colQty.appendChild(productQuantity);

  /**icone moins dans col quantité */
  let minusIcon = document.createElement('p');
  minusIcon.classList.add('fas', 'fa-minus', 'minus-icon');
  colQty.appendChild(minusIcon);
  minusIcon.addEventListener('click', function() {
    //quand 'click' sur -, diminue la quantité de 1
    cartContent[i].quantity--;
    //calcule le prix total du produit
    let priceProduct = cartContent[i].price * cartContent[i].quantity;
    localStorage.setItem('cart', JSON.stringify(cartContent));
    //met à jour l'affichage de la quantité et le prix
    productQuantity.innerText = cartContent[i].quantity;
    colPrice.innerText = divide(priceProduct);
  });  

  /**colonne prix du produit */
  let priceProduct = cartContent[i].price * cartContent[i].quantity;
  let colPrice = document.createElement('td');
  colPrice.innerText = divide(priceProduct);
  tRow.appendChild(colPrice);
  
  

  
}