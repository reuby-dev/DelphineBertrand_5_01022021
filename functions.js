//contient les fonctions réutilisées dans plusieurs fichiers js

//divise le prix par 100 et le converti en nombre décimal
function divide(price) {
    let division = price / 100;
    division = division.toFixed(2);
    return division;
}