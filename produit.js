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

function getId() {
    const param = window.location.search;
    const id = param.replace('?id=', '');
    return id;
}

fetch('http://localhost:3000/api/teddies/' + getId())
    .then(function (response) {
        return response.json();
    }).then(function (teddy) {

        
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
        function divide(price) {
            let division = price / 100;
            division = division.toFixed(2);
            return division;
        }

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

        /**CONTENEUR CHOIX DES COULEURS */
        let colorContainer = document.createElement('div');
        colorContainer.classList.add('d-flex', 'justify-content-between', 'mb-3');
        botContainer.appendChild(colorContainer);

        /**CHOIX DES COULEURS DYNAMIQUE */
        for (let i = 0; i < teddy.colors.length; i++) {
        let colorChoice = document.createElement('div');
        let idColor = teddy.colors[i]; //récupère la couleur contenue dans l'élément
        let hexColor = colorCollection[idColor];
        colorChoice.classList.add('color-choice');
        colorChoice.style.backgroundColor = hexColor;
        colorContainer.appendChild(colorChoice);
        };

        /**BOUTON AJOUTER AU PANIER */
        let idTeddy = teddy._id;
        let buttonAdd = document.createElement('button');
        buttonAdd.classList.add('btn', 'bg-white', 'w-100');
        buttonAdd.innerText = 'Ajouter au panier';
        botContainer.appendChild(buttonAdd);
});