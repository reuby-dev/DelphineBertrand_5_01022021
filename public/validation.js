/**RECUPERE LE CONTENU DU PANIER*/
let cartContent = JSON.parse(localStorage.getItem('cart'));

//affiche le résultat dans le span subtotal
displaySubTotal (cartContent);

/**RECUPERE LE CONTENU DE L'ORDER ID */
let orderId = JSON.parse(localStorage.getItem('orderId'));

//affiche le résultat dans le span display order id
let displayOrderId = document.getElementById('display-order-id');
displayOrderId.innerText = ("\"" + orderId + "\"");