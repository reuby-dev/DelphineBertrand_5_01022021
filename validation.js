/**RECUPERE LE CONTENU DU LOCAL STORAGE*/
let cartContent = JSON.parse(localStorage.getItem('cart'));

displaySubTotal (cartContent);