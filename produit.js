//collection de couleur
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

//création de la fiche produit
function displaySheet(teddy) {
    /**ROW */
    let rowProduct = document.getElementById('product-card'); //récupère la ligne du DOM

    /** COL IMAGE PRODUIT */
    let colImg = document.createElement('div');//crée la colonne contenant l'image du produit
    colImg.classList.add('col-sm-6', 'margin-b-20'); //ajoute les classes
    rowProduct.appendChild(colImg);

    /** IMG */
    let imgProduct = document.createElement('img');
    imgProduct.src = teddy.imageUrl; //prend l'image concernée
    colImg.appendChild(imgProduct);

    /**COL DESCRIPTION PRODUIT */
    let colDescription = document.createElement('div');
    colDescription.classList.add('col', 'd-flex', 'flex-column', 'justify-content-between');
    rowProduct.appendChild(colDescription);

    /**CONTENEUR PARTIE HAUTE DE LA DESCRIPTION DU PRODUIT */
    let topContainer = document.createElement('div');
    topContainer.id = 'top-container'; //définit l'id
    colDescription.appendChild(topContainer);

    /**CONTENEUR TITRE ET PRIX */
    let titlePriceContainer = document.createElement('div');
    titlePriceContainer.classList.add('d-flex', 'justify-content-between');
    topContainer.appendChild(titlePriceContainer);

    /**TITRE */
    let name = document.createElement('h2');
    name.innerText = teddy.name;
    titlePriceContainer.appendChild(name);

    /**PRIX */
    let price = document.createElement('p');
    price.classList.add('price', 'bg-prim-dark', 'rounded');
    price.innerText = divide(teddy.price) + ' €';
    titlePriceContainer.appendChild(price);
    
    /**DESCRIPTION DU PRODUIT */
    let descriptionProduct = document.createElement('p');
    descriptionProduct.innerText = teddy.description;
    topContainer.appendChild(descriptionProduct);

    /**CONTENEUR PARTIE BASSE DE LA DESCRIPTION DU PRODUIT*/
    let botContainer = document.createElement('div');
    botContainer.id = 'bottom-container';
    colDescription.appendChild(botContainer);

    /**INSTRUCTION COULEUR */
    let instruction = document.createElement('h3');
    instruction.innerText = 'Sélectionnez une couleur pour votre produit :';
    botContainer.appendChild(instruction);

    /**CONTENEUR CHOIX DES COULEURS */
    let colorContainer = document.createElement('div');
    colorContainer.classList.add('d-flex', 'justify-content-between', 'mb-3', 'mt-3');
    botContainer.appendChild(colorContainer);

    /**CHOIX DES COULEURS DYNAMIQUE */
    for (let i = 0; i < teddy.colors.length; i++) { 
        let colorChoice = document.createElement('div'); //pour chaque nom de couleur contenu dans la liste colors de l'api, ajouter une div
        let idColor = teddy.colors[i]; //récupère le nom de la couleur contenu dans l'élément teddy de l'api
        let hexColor = colorCollection[idColor]; //associe le nom de la couleur à un code hexadécimal
        colorChoice.classList.add('color-choice');
        colorChoice.style.backgroundColor = hexColor; //crée un style background color dynamique, lié au code hexa créé dans le tableau associatif
        colorContainer.appendChild(colorChoice);

        //taille dynamique
        if (teddy.colors.length === 1) {
            colorChoice.style.width = '100%';
        } else if (teddy.colors.length === 2) {
            colorChoice.style.width = '50%';
        } else if (teddy.colors.length === 3) {
            colorChoice.style.width = '30%';
        } else if (teddy.colors.length > 3) {
            colorChoice.style.width = '20%';
        }
    };

    /**BOUTON AJOUTER AU PANIER */
    let buttonAdd = document.createElement('button');
    buttonAdd.classList.add('btn', 'bg-white', 'w-100', 'add-to-cart');
    buttonAdd.innerText = 'Ajouter au panier';
    botContainer.appendChild(buttonAdd);
    buttonAdd.addEventListener('click',function(){

        //création du panier
        let cart = [];

        //vérifie si la valeur du localStorage existe
        if (localStorage.getItem('cart')) 
            cart = JSON.parse(localStorage.getItem('cart')); //si elle existe, alors récupérer son contenu
        
        //crée l'objet à ajouter au panier
        let newObject = { 
            id : teddy._id,
            name : teddy.name,
            color : teddy.colors,
            price : teddy.price,
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

        //renvoie le panier mis à jour
        localStorage.setItem('cart', JSON.stringify(cart));        
    });
}

//récupère l'identifiant dans l'url
function getId() {
    const param = window.location.search;
    const id = param.replace('?id=', '');
    return id;
};

fetch('http://localhost:3000/api/teddies/' + getId())
    .then(function (response) {
        return response.json();
    }).then(function (teddy) {
        displaySheet(teddy);   
});