fetch('http://localhost:3000/api/teddies')
    .then(function (response) {
        return response.json();
    }).then(function (teddy) {
        let index = 0;
        while (index < teddy.length) {
            
            /*ROW*/
            let rowProduct = document.getElementById('product-container'); //récupère la row où il est nécessaire d'ajouter des éléments

            /*COL*/
            let colProduct = document.createElement('div'); //crée la colonne qui va contenir la card
            rowProduct.appendChild(colProduct); //ajoute la colonne à la la ligne product-container
            colProduct.classList.add('col-xs-6', 'col-sm-6', 'col-lg-4','mb-4'); //ajoute les classes à la colonne
            
            /*CARD*/
            let card = document.createElement('div'); //crée la card
            card.classList.add('card');//ajoute la classe à la card
            colProduct.appendChild(card);//ajoute la card à la colonne

            /*IMG*/
            let imgProduct = document.createElement('img'); //crée la balise img
            imgProduct.src = teddy[index].imageUrl; //choisi l'image correspondante
            imgProduct.classList.add('card-img-top', 'img-teddy'); //ajoute la classe à l'image
            card.appendChild(imgProduct); //insère l'image dans le DOM

            /*CARD BODY */
            let cardBody = document.createElement('div'); //crée la div qui va contenir le body de la card
            cardBody.classList.add('card-body', 'd-flex', 'flex-column');//ajout les classes à card body
            card.appendChild(cardBody);//ajoute le body à la card

            /*CARD TOP IN BODY */
            let topCard = document.createElement('div'); //crée la div qui va contenir le titre et le prix
            topCard.classList.add('d-flex', 'flex-wrap', 'justify-content-between'); //ajoute les classes à la div
            cardBody.appendChild(topCard); //ajoute la div au DOM

            /**TITLE */
            let h2 = document.createElement('h2'); //crée le titre
            h2.classList.add('card-title'); //ajoute la classe
            h2.innerText = teddy[index].name; //sélectionne le titre dynamiquement
            topCard.appendChild(h2); //ajoute le titre au DOM

            /**PRICE */
            let price = document.createElement('p'); //crée la balise p
            price.classList.add('price');//ajoute la classe
            price.innerText = teddy[index].price + ' €'; //sélectionne le prix dynamiquement et ajoute la devise
            topCard.appendChild(price); //ajoute le prix au DOM
            

            /**DESCRIPTION */
            let description = document.createElement('p'); //crée la balise p
            description.innerText = teddy[index].description; // sélectionne la description dynamiquement
            cardBody.appendChild(description); //ajoute la description au DOM

            /**BUTTON */
            let knowMore = document.createElement('button'); //crée un bouton
            knowMore.classList.add('btn', 'bg-prim');
            knowMore.innerHTML = 'En savoir plus';
            cardBody.appendChild(knowMore);

            index++;
        }
});
