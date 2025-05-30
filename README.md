# Exercice Nest Arthur BLANDIN

## Lancer le projet

Dans ce projet, on a un front en Angular, et un backend en Nest (comme demandé dans le sujet pour le back).
Pour lancer le projet, rien de plus simple, il suffit de se placer à la racine du projet et de lancer la commande suivante : 

`./init.sh`

Ce que ça va faire : 

-> Installer les dépendances dans le front et dans le back
-> Lancer les conteneurs (Front, Back, DB et Adminer)
-> Ajouter des groupes de discussion dans la table des groupes pour grouper les discussions

> Si jamais il y'a un soucis de dépendances sur le front, il faut relancer le `./init.sh`


## Comment se compose le projet ?

Dans ce projet, la base de données se compose de 3 tables :
- Discussion
- Group
- User

Un user est rattaché à un groupes, qui possède des discussions où chaque message est lié à un user.


## Étapes Post-lancement du projet

Une fois le projet lancé, il suffit de se rendre dans un premier temps dans le front via `http://localhost:4200`, qui va rediriger vers la page de login.

Aucun utilisateur étant initialisé (Parce que si on en rajoute manuellement, au register ça va péter une erreur et c'est pas ce qu'on veut), il faut donc se diriger vers la page de register pour créer un compte.

On y renseigne donc les informations demandées, avec les couleurs de bulle et de nom d'utilisateur.

Une fois ceci fait, on se connecte avec mail/mot de passe, et on a une liste de groupes qui apparaît (normalement) dès que l'utilisateur est connecté.

Il est ainsi possible de choisir un des groupes présentés, afin d'y accéder et de voir l'historique des messages (Qui est vide initialement, mais le but va être que chaque utilisateur peut envoyer des messages.)

Le but va être d'enregistrer plusieurs utilisateurs et de leur faire se taper la discussion pour simuler une discussion.

## OK, mais après avoir discuté on fait quoi ?

T'as discuté avec toi-même ? 
C'est cool ! Mais le but final va être de voir comment changer cette couleur que tu t'es initialement mis en couleur de bulle !

Pour ce faire, juste au dessus du bouton de déconnexion tu as un bouton qui te mène à une interface de profile, où tu peux changer les couleurs de bulle et de pseudo (Pratique nan ? :D)

Une fois ta couleur changée, tu valides le formulaire, et voilà ! Tout le monde verra ta nouvelle couleur (Qu'elle soit belle ou non :p)


## En résumé

- Le register/login est fonctionnel
- On peut rejoindre un groupe parmi ceux proposés
- On peut envoyer des messages via différents comptes qu'on peut créer, et voir un aperçu des messages dans le groupe en fonction de qui l'a envoyé
- On peut modifier la couleur de notre bulle de discussion, et tout le monde peut le voir

Si jamais y'a le moindre soucis avec le projet, n'hésite pas à revenir vers moi (Sur discord - **Umbrenite**)
