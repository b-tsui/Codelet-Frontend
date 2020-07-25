# Codelet
Codelet is a helpful study tool inspired by Quizlet. Create sets on any coding related topics you want to study and add flashcards, or choose from the many pre-made sets available. Cement your knowledge with helpful study tools such as quizzes, matching games, and flip - to - study versions of cards.  

Check us out here: [Codelet](https://www.codelet.info/)

To log-in as a user, you can either use your existing github or gmail information via Auth0, or using the email email of demo@demo.com with the password demo123!

Frontend for app here: [Codelet Backend](https://github.com/b-tsui/Codelet-Frontend)

Backend for app here: [Codelet Backend](https://github.com/christophertalley/codelet-backend)

## Documentation links
- [Feature List](https://github.com/christophertalley/codelet-backend/blob/master/documentation/featureList.md)
- [Front End Routes](https://github.com/christophertalley/codelet-backend/blob/master/documentation/frontendRoutes.md)
- [Back End Routes](https://github.com/christophertalley/codelet-backend/blob/master/documentation/frontendRoutes.md)
- [Schema](https://github.com/christophertalley/codelet-backend/blob/master/documentation/schema.md)
- [Schema Image](https://github.com/christophertalley/codelet-backend/blob/master/documentation/Untitled%20(3).png)


## Screenshots
* Study flash cards!
![Study flash cards!](https://github.com/b-tsui/Codelet-Frontend/blob/master/documentation/images/card-flip.gif?raw=true)

* Play learning games!
![Quiz game gif](https://github.com/b-tsui/Codelet-Frontend/blob/master/documentation/images/quiz-game.gif?raw=true)

  ![Matching game gif](https://github.com/b-tsui/Codelet-Frontend/blob/master/documentation/images/matching-game.gif?raw=true)

* Save and vote on sets!
![favorite and voting](https://github.com/b-tsui/Codelet-Frontend/blob/master/documentation/images/set-manipulation.gif?raw=true)

## Technologies implented:
  - Javascript
  - Python3
  - React.js with hooks
  - Flask
  - Alembic
  - SQLAlchemy
  - PostgreSQL
  - Elastic Search
  - Auth0
  - HTML5
  - CSS3
  - Material UI
  - AWS 
  - Heroku
  
 ## Brandon Tsui's Contributions:
  - Frontend: 
    * Implemented user authorization and authentication using Auth0
    * Designed and integrated full-text search component which returns sets and flashcards that match search term user inputs
    * Created categories sidebar components on homepage that lets user filter all sets by category
    * Developed filter functionality that lets user sort sets on homepage by popularity, newest, and number of cards.
    * Created favoriting and voting functionality on homepage
    * Created profile page components which displays clients favorited and created sets
    * Created quiz game compontents for users to quiz themselves on flashcards in the set
  - Backend: 
    * Integrated Auth0's authentication and authorization for protect backend routes
    * Integrated Elasticsearch with our database and existing endpoints to create a more performative and scalable full-text search endpoint
    * Developed mixins that index sets and flashcards in the Elasticsearch server and our database when created or updated.
    * Developed favoriting and voting endpoints that store a users favorite and vote data in our database
    * Developed User routes/endpoints that allow the frontend grab user's favorite, set, and vote information upon login
  - Deployment:
    * Deployed frontend application on AWS using AWS Amplify
    * Deployed backend application on Heroku using Heroku CLI, Heroku Postgres Database, and Heroku Seachbox (for hosting Elasticsearch service)
