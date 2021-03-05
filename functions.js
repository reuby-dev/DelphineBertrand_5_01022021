/*CONTIENT LES FONCTIONS GENERALES*/

/*RECUPERE L'IDENTIFIANT DU PRODUIT DANS L'URL*/
function getId() {
    const param = window.location.search;
    const id = param.replace('?id=', '');
    return id;
}

/**CREE UN NOUVEL OBJET ET L'AJOUTE AU PANIER */
function addToCart(item, cart) {
    let newObject = { 
        id : item._id,
        name : item.name,
        color : item.colors,
        price : item.price,
        quantity : 1
    }

    //si l'objet est présent dans le panier, incrémenter la quantité de 1 à chaque clic sur le bouton
    let isPresent = false;
    for (let i=0; i < cart.length; i++) {
        if (newObject.id === cart[i].id) {
            console.log('teddy déjà existant');
            isPresent = true;
            cart[i].quantity ++;
        }
    }

    //si l'objet n'est pas dans le panier, le pousser dedans
    if (isPresent === false) {
        cart.push(newObject);            
        console.log('nouveau teddy');
    }
}

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

/**CHOIX DES COULEURS DYNAMIQUE */
function choiceColor(item) {
    let colorContainer = document.getElementById('color-container')
    for (let i = 0; i < item.colors.length; i++) { 
        let colorChoice = document.createElement('div'); //pour chaque nom de couleur contenu dans la liste colors de l'api, ajouter une div
        let idColor = item.colors[i]; //récupère le nom de la couleur contenu dans l'élément teddy de l'api
        let hexColor = colorCollection[idColor]; //associe le nom de la couleur à un code hexadécimal
        colorChoice.classList.add('color-choice');
        colorChoice.style.backgroundColor = hexColor; //crée un style background color dynamique, lié au code hexa créé dans le tableau associatif
        colorContainer.appendChild(colorChoice);

        //taille dynamique des choix des couleurs
        if (item.colors.length === 1) {
            colorChoice.style.width = '100%';
        } else if (item.colors.length === 2) {
            colorChoice.style.width = '50%';
        } else if (item.colors.length === 3) {
            colorChoice.style.width = '30%';
        } else if (item.colors.length > 3) {
            colorChoice.style.width = '20%';
        }
    };
}

/**MESSAGE D'ALERTE POUR CHAMP VIDE */
function alertMessage(emptyChildren, parentContainer) {
    emptyChildren.classList.add('text-danger', 'mb-0');
    emptyChildren.innerText = 'Ce champ est obligatoire.';
    parentContainer.appendChild(emptyChildren);
}