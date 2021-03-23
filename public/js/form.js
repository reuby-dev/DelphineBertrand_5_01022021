/**SAUVEGARDE L'ORDER ID DANS LE LOCAL STORAGE */
function saveOrderId(result) {
    //récupère l'order Id depuis la réponse de l'api
    let id = result.orderId;  

    //stocke l'order Id dans le local storage pour pouvoir le récupérer dans la page de validation
    let orderId = [];
    orderId.push(id);
    localStorage.setItem('orderId', JSON.stringify(orderId));
}

/**REGEX UNIQUEMENT DES LETTRES */
function checkLetters(value) {
    let re = /[a-zA-Z]/;
    return re.test(value);
}

/**VALIDATION DES CHAMPS AVEC UNIQUEMENT DES LETTRES */
function validateOnlyLetters (fieldValue, parentContainerId) {
    // Nettoyer les messages d'erreurs
    let parentContainer = document.getElementById(parentContainerId);
    for (let i = 0; i < parentContainer.children.length; i++) {
        if (parentContainer.children[i].tagName === 'P') {
            parentContainer.children[i].remove();
        }
    }

    let error = false;

    //on analyse les champs
    if (checkLetters(fieldValue) === false) {
        
        error = true;
        let parentContainer = document.getElementById(parentContainerId);
        let emptyChildren = document.createElement('p');
        emptyChildren.classList.add('text-danger', 'mb-0');
        emptyChildren.innerText = 'Ce champ ne doit contenir que des lettres';
        parentContainer.appendChild(emptyChildren);
    } 
    
    return error;
}

/**VALIDATION DES CHAMPS VIDES */
function validateEmptyField (fieldValue, parentContainerId) {
    // Nettoyer les messages d'erreurs
    let parentContainer = document.getElementById(parentContainerId);
    for (let i = 0; i < parentContainer.children.length; i++) {
        if (parentContainer.children[i].tagName === 'P') {
            parentContainer.children[i].remove();
        }
    }

    let error = false;

    // On analyse le champ vide
    if (fieldValue === "") {
        error = true;
        let parentContainer = document.getElementById(parentContainerId);
        let emptyChildren = document.createElement('p');
        emptyChildren.classList.add('text-danger', 'mb-0');
        emptyChildren.innerText = 'Ce champ est obligatoire.';
        parentContainer.appendChild(emptyChildren);
    }
    
    return error;
}

/**REGEX EMAIL */
function checkEmail(email) {
    let re = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

/**VALIDATION DU CHAMP EMAIL */
function validateEmail (fieldValue, parentContainerId) {
    // Nettoyer les messages d'erreurs
    let parentContainer = document.getElementById(parentContainerId);
    for (let i = 0; i < parentContainer.children.length; i++) {
        if (parentContainer.children[i].tagName === 'P') {
            parentContainer.children[i].remove();
        }
    }
    let error = false;

    //on analyse le champ email
    if (checkEmail(fieldValue) === false) {
        error = true;
        let parentContainer = document.getElementById(parentContainerId);
        let emptyChildren = document.createElement('p');
        emptyChildren.classList.add('text-danger', 'mb-0');
        emptyChildren.innerText = 'Merci de renseigner une adresse e-mail valide';
        parentContainer.appendChild(emptyChildren);
    } 
    return error;
}

//regex uniquement 5 nombres
function checkPostalCode(postalCode) {
    let re = /^\d{5}$/;
    return re.test(postalCode)
}

/**VALIDATION DU CHAMP CODE POSTAL */
function validatePostalCode (fieldValue, parentContainerId) {
    // Nettoyer les messages d'erreurs
    let parentContainer = document.getElementById(parentContainerId);
    for (let i = 0; i < parentContainer.children.length; i++) {
        if (parentContainer.children[i].tagName === 'P') {
            parentContainer.children[i].remove();
        }
    }
    let error = false;

    if (checkPostalCode(fieldValue) === false) {
        error = true;
        let parentContainer = document.getElementById(parentContainerId);
        let emptyChildren = document.createElement('p');
        emptyChildren.classList.add('text-danger', 'mb-0');
        emptyChildren.innerText = 'Merci de renseigner un code postal valide';
        parentContainer.appendChild(emptyChildren);
    } 
    return error;
}

/**VALIDATION DU PANIER */
function validateCart(cartValue) {
    let error = false;
    let containerCart = document.getElementById('container-cart');

    // Nettoyer les messages d'erreurs du panier
    for (let i = 0; i < containerCart.children.length; i++) {
        if (containerCart.children[i].tagName === 'P' && containerCart.children[i].id  != 'subtotal-container') {
            containerCart.children[i].remove();
        }
    }

    //si le panier est vide
    if (cartValue.length === 0 ) {
        error = true;
        let emptyCart = document.createElement('p');
        emptyCart.classList.add('text-danger', 'fs-6');
        emptyCart.innerText = 'Votre panier est vide, merci d\'y ajouter au moins un produit.';
        containerCart.appendChild(emptyCart);
  }
  return error;
}

/**VALIDATION DU FORMULAIRE */
function validateForm (cartContent) {

    //Récupère les valeurs des champs du formulaire
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let postalCode = document.getElementById('postal-code').value;
    let city = document.getElementById('city').value;
        
    //erreur de tout le formulaire
    let error = false;

    //si le panier est vide
    if (validateCart(cartContent) === true) {
        error = true;
    }

    //si le champ firstname est vide
    if (validateEmptyField (firstName, 'first-name-container') === true || validateOnlyLetters (firstName, 'first-name-container') === true) {
        error = true;
    }

    //si le champ nom est vide
    if (validateEmptyField (lastName, 'last-name-container') === true || validateOnlyLetters (lastName, 'last-name-container') === true) {
        error = true;
    }

    //email
    if (validateEmptyField (email, 'email-container') === true || validateEmail (email, 'email-container') === true) {
        error = true;
    }


    //si le champ adresse est vide
    if (validateEmptyField (address, 'address-container') === true) {
        error = true;
    }

    //si le champ code postal est vide
    if (validateEmptyField (postalCode, 'postal-code-container') === true || validatePostalCode (postalCode, 'postal-code-container')) {
        error = true;
    }

    //si le champ ville est vide
    if (validateEmptyField (city, 'city-container') === true || validateOnlyLetters (city, 'city-container') === true) {
        error = true;
    }  

    return error;
}

/**REQUETE D'ENVOI DE LA COMMANDE */

let buttonConfirm = document.getElementById('confirm-command');
buttonConfirm.addEventListener('click', function(e){
    e.preventDefault();

    //recupère le contenu du local storage
    let cartContent = JSON.parse(localStorage.getItem('cart'));
    let globalError = validateForm (cartContent);
    // Si j'ai une erreur après ma validation, je m'arrete
    if (globalError === true) {
        console.log("STOPPING because globalError is", globalError);
        return;
    }

    /**RECUPERE LES IDENTIFIANTS DU PRODUIT DU PANIER */
    let idProducts=[];
    for (let i =0; i < cartContent.length; i++) {
        result = cartContent[i].id;
        idProducts.push(result);
    }

    /**REQUETE D'ENVOI */
    //Récupère les valeurs des champs du formulaire
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let postalCode = document.getElementById('postal-code').value;
    let city = document.getElementById('city').value;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({"contact":{"firstName":firstName,"lastName":lastName,"address":address, "postalCode":postalCode, "city":city,"email":email},"products":idProducts});

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

  fetch("http://localhost:3000/api/teddies/order", requestOptions)
  .then(function (response) {
      
      return response.json();
  }).then(function (result) {
      console.log(result);  
      saveOrderId(result);
      document.location.href="validation.html";
  }).catch(error => {
      console.log('fetch error', error)
  })

});