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

  //quantité du produit texte
  let productQuantity = document.createElement('p');
  productQuantity.classList.add('quantity-product');
  productQuantity.innerText = cartContent[i].quantity;
  colQty.appendChild(productQuantity);
  
  //icone moins dans col quantité
  let minusIcon = document.createElement('i');
  minusIcon.classList.add('fas', 'fa-minus', 'minus-icon');
  colQty.appendChild(minusIcon);

  //colonne prix du produit
  let colPrice = document.createElement('td');
  colPrice.innerText = divide(calcPriceProduct(cartContent[i].price, cartContent[i].quantity));
  tRow.appendChild(colPrice); 

  /**GESTION DE BOUTON + */
  let productId = cartContent[i].id;
  plusIcon.addEventListener('click', function() {
    // Utiliser poductId pour trouver notre produit dans le panier
    for(let j = 0; j < cartContent.length ; j++) {

      // Si on trouve le produit
      if(cartContent[j].id === productId) {
        //quand 'click' sur +, augmente la quantité de 1
        cartContent[j].quantity++;
        //met à jour le panier
        localStorage.setItem('cart', JSON.stringify(cartContent));
        //met à jour l'affichage de la quantité, le prix des articles et le prix total du panier
        productQuantity.innerText = cartContent[j].quantity;
        colPrice.innerText = divide(calcPriceProduct(cartContent[j].price, cartContent[j].quantity));
        displaySubTotal(cartContent);
      }
    }
  });

  /**GESTION DE BOUTON - */
  minusIcon.addEventListener('click', function() {

    for (let j = 0; j < cartContent.length; j++) {
      if (productId === cartContent[j].id) {

        //quand 'click' sur -, diminue la quantité de 1
        cartContent[j].quantity--;

        //si la quantité du produit est inférieure ou égale à 0, supprimer le produit du localstorage et de l'affichage du tableau
        if (cartContent[j].quantity <= 0) {
          cartContent.splice(j, 1);
          tBody.removeChild(tRow);
        } else {
            productQuantity.innerText = cartContent[j].quantity;
            //calcule le prix total du produit
            colPrice.innerText = divide(calcPriceProduct(cartContent[j].price, cartContent[j].quantity));
        }
        //met à jour le local storage
        localStorage.setItem('cart', JSON.stringify(cartContent));
        //calcule le prix total du panier
        displaySubTotal (cartContent);
      }
    }
  });
}

/**AJOUTE LE TOTAL AU SPAN SUBTOTAL A L'ARRIVEE SUR LA PAGE DU PANIER*/
displaySubTotal (cartContent);