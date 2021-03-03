/*CONTIENT LES FONCTIONS GENERALES*/

/*RECUPERE L'IDENTIFIANT DU PRODUIT DANS L'URL*/
function getId() {
    const param = window.location.search;
    const id = param.replace('?id=', '');
    return id;
}

/*DIVISE LE PRIX PAR 100 ET LE CONVERTI EN NOMBRE DECIMAL*/
function divide(price) {
    let division = price / 100;
    division = division.toFixed(2);
    return division;
}

/**CALCULE LE PRIX TOTAL DU PRODUIT */
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

/**DEFINI LE COMPORTEMENT DE L'ICONE + ou - */
function comportmentIcon(addOrRemove, cartContent, i, productQuantity, colPrice) {

    //quand 'click' sur icone + ou - , augmente ou diminue la quantité de 1
   cartContent[i].quantity += addOrRemove;
   //si la quantité du produit est inférieure ou égale à 0, supprimer le produit du localstorage et de l'affichage du tableau
   if (cartContent[i].quantity <= 0) {
     cartContent.splice([i], 1);
     localStorage.setItem('cart', JSON.stringify(cartContent));
     tBody.removeChild(tRow);
   }
   
   //met à jour l'affichage de la quantité le prix des articles et le prix total du panier
   localStorage.setItem('cart', JSON.stringify(cartContent));
   productQuantity.innerText = cartContent[i].quantity;
   subTotal.innerText = divide(getSubTotal(cartContent));
   //calcule le prix total du produit
   colPrice.innerText = divide(calcPriceProduct(cartContent[i].price, cartContent[i].quantity));
}

/**CREE LE MESSAGE DE CHAMP OBLIGATOIRE*/
function messageAlert(emptyChildren, parentContainer) {
    emptyChildren.classList.add('text-danger', 'fs-6', 'mb-0');
    emptyChildren.innerText = 'Ce champ est obligatoire.';
    parentContainer.appendChild(emptyChildren);    
}