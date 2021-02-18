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
            colProduct.classList.add('col-sm-6', 'col-lg-4','mb-4'); //ajoute les classes à la colonne
            rowProduct.appendChild(colProduct); //ajoute la colonne à la la ligne product-container, dans le DOM

            /**LIEN */
            let productLink = document.createElement('a');
            colProduct.appendChild(productLink);
            productLink.setAttribute('href', 'produit.html' + '?id=' + teddy[index]._id); //crée des attributs au lien
            
            /*CARD*/
            let card = document.createElement('div');
            card.classList.add('card');
            productLink.appendChild(card);

            /*IMG*/
            let imgProduct = document.createElement('img');
            imgProduct.src = teddy[index].imageUrl; //choisi l'image correspondante dynamiquement
            imgProduct.classList.add('card-img-top', 'img-teddy'); 
            card.appendChild(imgProduct);

            /*CARD BODY */
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body', 'd-flex', 'flex-column');
            card.appendChild(cardBody);

            /*CARD TOP IN BODY */
            let topCard = document.createElement('div'); 
            topCard.classList.add('d-flex', 'flex-wrap', 'justify-content-between'); 
            cardBody.appendChild(topCard);

            /**TITLE */
            let h2 = document.createElement('h2');
            h2.classList.add('card-title');
            h2.innerText = teddy[index].name;
            topCard.appendChild(h2);

            /**PRICE */
            let price = document.createElement('p');
            price.classList.add('price');
            price.innerText = teddy[index].price + ' €'; //sélectionne le prix dynamiquement et ajoute la devise
            topCard.appendChild(price);
            
            /**DESCRIPTION */
            let description = document.createElement('p');
            description.innerText = teddy[index].description;
            cardBody.appendChild(description);

            /**BUTTON */
            let knowMore = document.createElement('button');
            knowMore.classList.add('btn', 'bg-prim');
            knowMore.innerHTML = 'En savoir plus';
            cardBody.appendChild(knowMore);

            index++;
        }
});
