Ce TP a pour but de créer une page web contenant un **CV personnel** en utilisant uniquement **HTML5 et CSS3** (sans JavaScript). 
L’objectif est de produire une page responsive et enrichie de micro-données, puis de la **publier en ligne via GitLab Pages**.

## 1. Structure HTML:
On crée un fichier `ubo-resume.html` contenant la structure de base du CV et on ajoute
les informations personnelles(nom, prénom, photo, ...)
On commite tout et puis on crée notre premier tag: **Structure**

## 2. Un peu de style:
On crée un fichier `css/style.css` pour la mise en forme des éléments qu'on a rédigé avec le HTML.
Ensuite, on commite toute les modifications et on crée un tag: **CSS**

## 3. Mise en ligne:
GitHub Pages est un service offert par GitHub qui permet d’héberger des sites web statiques (HTML, CSS, JavaScript) 
directement à partir d’un dépôt GitHub.
Dans ceci, après que j'ai poussé le dépôt de mon cv vers github,
j'ai suivi les démarches de configuration pour déployer automatiquement mon cv à chaque commit
sur la branche main.
Voulà le lien pour visualiser mon cv déployé:https:**https://kaoutariabakriman.github.io/mon-cv/**


## 4. Adaptatif ou <<responsive>>:
On crée un fichier `css/responsive.css` pour organiser la mise en forme de la page pourqu'il s'adapte à n'importe quel type d'écrans.
Le code qu'on a utilisé des requêtes médias (@media) pour rendre le responsive, c’est-à-dire qu’elle s’adapte automatiquement à la taille de l’écran.
Dans notre cas, il définit trois paliers de largeur d’écran : 740px, 570px et 480px.
À chaque palier, le style des éléments change pour améliorer l’affichage sur les petits écrans.
On commite tout et puis on crée notre premier tag: **responsive**
Après ces modifications, la mise en page se réorganise progressivement pour offrir une expérience utilisateur , alors en passant sur une grand écran à une structure verticale unique sur mobile,
sans aucune perte de contenu.

## 5. Micro-données:
On a pris le vocabulaire correspondant à une personne et on l'a appliqué à la partie des informations personnelles de la page HTML.
On commite tout et puis on crée notre premier tag: **microdata**



