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

  /**colonne prix du produit */
  let colPrice = document.createElement('td');
  colPrice.innerText = divide(cartContent[i].price);
  tRow.appendChild(colPrice);

  /**colonne quantité du produit */
  let colQty = document.createElement('td');
  colQty.innerText = cartContent[i].quantity; //temporaire
  tRow.appendChild(colQty);

}