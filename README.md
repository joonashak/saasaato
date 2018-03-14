# saasaato

This is an Angular 5 web app that provides the user with an interface and services to:

 - Enter new temperature observations into the system
 - View existing observations

The whole project is called *SääSäätö*, which is kind of a wordplay with the Finnish words *sää* (weather) and *säätö* (in this case as a slang word for a project that's somewhat...lightweight, let's say). This repository hosts theweb app providing UI and [saasaato-backend][api-repo] provides a REST API service to interact with the database.

There may be a demo running [here][demo-url]. Note that it runs on free Heroku dynos which sleeps after awhile and thus initial loading takes longer than usual.

### Usage

The following can be used to make a production build and serve it via Express HTTP server. For testing and development, simply use `ng serve`.

##### Install Node modules
    npm install

##### Build
    ng --aot --prod
    
##### Serve
    node server.js

### Deployment

This app is ready to be deployed via Heroku like so:

##### Create new app
    heroku create <optional app name>

##### Deploy

App is automatically built and started after git push.

    git push heroku master

[api-repo]: <https://github.com/joonashak/saasaato-backend>
[demo-url]: <https://saasaato.herokuapp.com/>
