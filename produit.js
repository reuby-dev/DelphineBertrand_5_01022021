//requête récupération du produit
fetch('http://localhost:3000/api/teddies/' + getId())
    .then(function (response) {
        return response.json();
    }).then(function (teddy) {
        displaySheet(teddy);   
});

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