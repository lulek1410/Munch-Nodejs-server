# Munch-Nodejs-server
Server side code for Munch restaurant which can be seen [here]([https://pages.github.com/](https://github.com/lulek1410/Munch)https://github.com/lulek1410/Munch). The code is written in NodeJs and uses Express to handle routing. Ther server supports methods for specific routes:
- `/dishes/categories`, `/alcohol/categories`, `/drinks/categories`, `/softDrinks/categories`, `/dishes`, `/alcohol`, `/drinks`, `/softDrinks`, `/events` : GET, POST
- `/dishes/categories/{id}`, `/alcohol/categories/{id}`, `/drinks/categories{id}`, `/softDrinks/categories/{id}`, `/dishes/{id}`, `/alcohol/{id}`, `/drinks/{id}`, `/softDrinks/{id}`, `/events/{id}`: GET, PUT, DELETE
- `/contactInfo`, `/peopleInfo`: GET
- `/contactInfo/{id}`, `/peopleInfo/{id}`: GET, PUT

Server code makes use of MongoDB database to store information. Auth0 is used to limit access to specific routes(POST, PUT, DELETE). It also meks use of Helmet to secure the app and limit access to it.
