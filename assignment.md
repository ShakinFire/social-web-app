# Web apps with Node.js: Teamwork assignment

## Project Description

Design and implement a **Standard Web application** using [Node.js](http://nodejs.org), [Express](expressjs.com) and [MariaDB](https://mariadb.com/)

It can be a discussion forum, blog system, e-commerce site, online gaming site, social network, or any other web application by your choice.

The application should have a:

- **public part** (accessible without authentication)
- **private part** (available for registered users)

### Public Part

The **public part** of your projects should be **visible without authentication**.
This public part could be the application start page, application statistics, the user login and user registration forms, as well as the public data of the users, e.g. the blog posts in a blog system, the public offers in a bid system, the products in an e-commerce system, etc.

### Private Part (Registered users area)

**Registered users** should have personal area in the web application accessible after **successful login**.
This area could hold for example the user's profiles management functionality, the user's offers in a bid system, the user's posts in a blog system, the user's photos in a photo sharing system, the user's contacts in a social network, etc.

## Technical Requirements

Your Web application should use the following technologies, frameworks and development techniques:

### Application Back-end (Server)

- **Some public dynamic web pages**
  - Using [Pug](https://pugjs.org/)
- **Some private (authenticated) dynamic web pages**
  - Using [Pug](https://pugjs.org/)
- **Some pblic RESTful routes** for AJAX
- At least **1 private (authenticated) route** for AJAX
- Use **Express** for the server
  - Use an **MVC** pattern
- Use **MariaDB**
  - As data storage
  - Use Sequelize
- Create a data/service layer for accessing the database
- Use [Passport](http://passportjs.org/) - for managing **users**

### Application front-end (client)

- Use any framework of your choice for the front-end
  - Optional, not required
  - KendoUI, AngularJS, Angular 2, Knockout, Bootstrap, etc...
- Implement responsive design
  - It may be based on **Bootstrap**, **Materialize**, any other UI framework or no framework at all
- Use **AJAX form and/or WebSockets communication**
- Apply **error handling** and **data validation** to avoid crashes when invalid data is entered
- Use loaders, modals and notifications when applicable
- Create usable UI
  - No need to be pretty, but **usable**

### Testing

- Unit test your application backend
  - 50%+ code coverage is required

##  General Requirements

- Use Git
  - Github, Gitlab, Bitbucket, or other
- Brief **documentation** of the project and the project architecture
  - As `README.md` file at the root of the github repository
- Deploy your application and database in the cloud
  - We suggest Heroku, but you are free to use MS Azure, Amazon AWS or anything else

### Optional Requirements

- Nice looking UI supporting of all modern and old Web browsers
- Record a short video showcasing your application
  - ~1-2 minutes, just show the interesting features
  - Do not record register/login functionality, this is not interesting...

### Deliverables

- Register your application at [Our Showcase System](http://best.telerikacademy.com)
  - Link to the live application
  - Link to the video
  - Link to the git repository

### Public Project Defense

Each team member will have to make a **defense** of their work in front of a trainer.
The public defense includes:

- Live **demonstration** of the developed web application (prepare sample data).
- Explain application structure and its back-end and front-end **source code**
- Run the tests
- Show the **commit logs** in the source control repository to prove a contribution from all team members.
- May include a simple task for each team member
  - The task must be implemented immediately

### Give Feedback about Your Teammates

You will be invited to **provide feedback** about all your teammates, their attitude to this project, their technical skills, their team working skills, their contribution to the project, etc.
The feedback is important part of the project evaluation so **take it seriously** and be honest.