/*CONTIENT LES FONCTIONS GENERALES*/

/*RECUPERE L'IDENTIFIANT DU PRODUIT DANS L'URL*/
function getId() {
    const param = window.location.search;
    const id = param.replace('?id=', '');
    return id;
};

/*DIVISE LE PRIX PAR 100 ET LE CONVERTI EN NOMBRE DECIMAL*/
function divide(price) {
    let division = price / 100;
    division = division.toFixed(2);
    return division;
}