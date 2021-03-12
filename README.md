# Orinoco
Quatrième projet réalisé dans le cadre de ma formation Développeur web Openclassroom. Le but était créer un premier MVP d'un site e-commerce. L'emphase était donc mise dans un premier temps sur le coté fonctionnel, plutôt qu'esthétique.

![image](https://user-images.githubusercontent.com/74512723/110957606-0d5ec580-834c-11eb-9954-ffb38b473474.png) ![image](https://user-images.githubusercontent.com/74512723/110957669-210a2c00-834c-11eb-90b9-678bb05338d3.png) ![image](https://user-images.githubusercontent.com/74512723/110957749-35e6bf80-834c-11eb-8c3e-090f9b2e0f93.png)

# Identité
Le but d'Orinoco est de se démarquer des grands site e-commerce comme Amazon en créant des applications thématiques ne vendant qu’un seul groupe de produits. Il y a par exemple Oribook pour les livres ou Oritextil pour les vêtements.

# Architecture générale
L’application web sera composée de 4 pages:

- Une page de vue sous forme de liste : montrant tous les articles disponibles à la vente.
- Une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier.
- Une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end.
- Une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.

# Technologies utilisées
HTML, CSS, Bootstrap et JavaScript en vanilla.

# Tester le site en local

- Prérequis

    Node.js (version 14.15.1 LTS utilisée durant le développement)
    NPM (version 6.14.8 utilisée durant le développement)

- Installation

npm install
npm start (dans le dossier back)
