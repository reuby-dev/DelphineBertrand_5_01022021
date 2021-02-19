fetch('http://localhost:3000/api/teddies')
    .then(function (response) {
        return response.json();
    }).then(function (teddy) {
        let index = 0;
        while (index < teddy.length) {

            index++;
        }
});