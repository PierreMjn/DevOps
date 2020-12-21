# ECE - Projet Chat

## BERNARD Romain - MIJON Pierre - SI GR04

## Informations g�n�rales

-D�veloppement d'une application de chat avec les technologies nodeJs et React.

## D�marrage

- Installer les d�pendances en ex�cutant npm install dans le back-end et front-end.
- Lancer le server en ex�cutant la commande npm run dev ou npm run start dans le back-end.
- Lancer le front en ex�cuteant la commande npm start dans le front-end.

## Application

- Cr�er un ou plusieurs comptes utilisateurs afin de pouvoir se connecter � l'application.
- Une fois connect�, l'utilisateur peut cr�er, modifier ou supprimer ses propres channels.
- Il peut ajouter le ou les membres qu'il souhaite dans ses channels � tout moment (lors de la cr�ation ou de l'�dition d'une channel).
- Il peut �galement envoyer, modifier et supprimer ses propres messages.
- Il peut acc�der � son profil et modifier son nom, sa photo de profil ou encore le th�me du chat.
- Par d�fault, l'image g�n�r�e pour le profil de l'utilisateur est un avatar. Il peut la modifier � tout moment.
- Il peut aussi acc�der � l'historique des messages qu'il a envoy�.
- Pour finir, il peut se d�connecter gr�ce au bouton logout.

## Bonus

- Nous avons impl�menter un syst�me de role au sein de l'application.
- Chaque utilisateur � le role "ROLE_USER" par default.
- Si ce dernier est chang� avec la valeur "ROLE_ADMIN", une fois connect� l'admin peut supprimer n'importe quel message envoy� dans une channel.
- Il a �galement acc�s � toutes les channels et peut les supprimer.
- Il peut aussi consulter la liste de tous les utilisateurs de l'application et en modifier certaines informations.
- Pour cr�er un utilisateur avec le role admin, nous n'avons pas trouver d'autre moyen pertinant que de modifier directement son role lors de sa creation.
- Il faut donc dans la fonction "signUp" du fichier AuthController, situ� dans le back-end modifier "ROLE_USER" en "ROLE_ADMIN" � la ligne 51
(la modification manuelle, directement dans la bdd levelDB ne marchant pas).
