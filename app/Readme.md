# ECE - Projet Chat

## BERNARD Romain - MIJON Pierre - SI GR04

## Informations générales

-Développement d'une application de chat avec les technologies nodeJs et React.

## Démarrage

- Installer les dépendances en exécutant npm install dans le back-end et front-end.
- Lancer le server en exécutant la commande npm run dev ou npm run start dans le back-end.
- Lancer le front en exécuteant la commande npm start dans le front-end.

## Application

- Créer un ou plusieurs comptes utilisateurs afin de pouvoir se connecter à l'application.
- Une fois connecté, l'utilisateur peut créer, modifier ou supprimer ses propres channels.
- Il peut ajouter le ou les membres qu'il souhaite dans ses channels à tout moment (lors de la création ou de l'édition d'une channel).
- Il peut également envoyer, modifier et supprimer ses propres messages.
- Il peut accéder à son profil et modifier son nom, sa photo de profil ou encore le thème du chat.
- Par défault, l'image générée pour le profil de l'utilisateur est un avatar. Il peut la modifier à tout moment.
- Il peut aussi accéder à l'historique des messages qu'il a envoyé.
- Pour finir, il peut se déconnecter grâce au bouton logout.

## Bonus

- Nous avons implémenter un système de role au sein de l'application.
- Chaque utilisateur à le role "ROLE_USER" par default.
- Si ce dernier est changé avec la valeur "ROLE_ADMIN", une fois connecté l'admin peut supprimer n'importe quel message envoyé dans une channel.
- Il a également accès à toutes les channels et peut les supprimer.
- Il peut aussi consulter la liste de tous les utilisateurs de l'application et en modifier certaines informations.
- Pour créer un utilisateur avec le role admin, nous n'avons pas trouver d'autre moyen pertinant que de modifier directement son role lors de sa creation.
- Il faut donc dans la fonction "signUp" du fichier AuthController, situé dans le back-end modifier "ROLE_USER" en "ROLE_ADMIN" à la ligne 51
(la modification manuelle, directement dans la bdd levelDB ne marchant pas).
