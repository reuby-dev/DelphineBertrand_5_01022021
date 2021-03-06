/*RECUPERE L'IDENTIFIANT DU PRODUIT DANS L'URL*/
function getId() {
    const param = window.location.search;
    const id = param.replace('?id=', '');
    return id;
}

//requête récupération du produit
fetch('http://localhost:3000/api/teddies/' + getId())
    .then(function (response) {
        return response.json();
    }).then(function (teddy) {
        displaySheet(teddy);
});

//tableau associatif de couleurs
let colorCollection = {
    'Pale brown' : '#A27557',
    'Tan': '#D2B48C',
    'Chocolate': '#805A46',
    'Black':'black',
    'White': 'white',
    'Dark brown': '#5C4033',
    'Brown': '#91672C',
    'Blue': '#0066CC',
    'Pink': '#FFC0CB',
    'Beige': '#C8AD7F',
};

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

/**CREE UN NOUVEL OBJET PUIS L'AJOUTE AU PANIER*/
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

//création de la fiche produit
function displaySheet(teddy) {

    /** IMG */
    let imgProduct = document.getElementById('img-product-sheet');
    imgProduct.classList.add('img-teddy-product');
    imgProduct.src = teddy.imageUrl; //récupère l'image du produit

    /**TITRE */
    let name = document.getElementById('name-product-sheet');
    name.innerText = teddy.name; //récupère le nom du produit

    /**PRIX */
    let price = document.getElementById('price-product-sheet');
    price.innerText = divide(teddy.price) + ' €';
    
    /**DESCRIPTION DU PRODUIT */
    let descriptionProduct = document.getElementById('description-product-sheet');
    descriptionProduct.innerText = teddy.description;

    /**CHOIX DES COULEURS DYNAMIQUE */
    choiceColor(teddy);

    /**BOUTON AJOUTER AU PANIER */
    let buttonAdd = document.getElementById('add-to-cart');
    buttonAdd.addEventListener('click',function(){

        //création du panier
        let cart = [];

        //vérifie si la valeur du localStorage existe
        if (localStorage.getItem('cart')) 
            cart = JSON.parse(localStorage.getItem('cart')); //si elle existe, alors récupérer son contenu
        
        //crée l'objet à ajouter au panier et l'ajoute au localstorage
        addToCart(teddy, cart);

        //fait apparaitre l'alerte de redirection
        let alertRedirection = document.getElementById('bg-box-alert');
        alertRedirection.style.display= 'block';

        //renvoie le panier mis à jour
        localStorage.setItem('cart', JSON.stringify(cart));   
        
    });
}