# Online Learning Platform (MERN)

---

## Table of Contents

1. Motivation
2. Objectives
3. Project Description
4. Build Status
5. TECHS
6. Architecture

   - Model
   - View
   - Controller

7. Installation
8. Usage

## Motivation

This project is part of the Advanced Computer Lab at the German Unversity in cairo and is intended to teach students web development through MERN stack.

## Objectives

- Learn how to properly use the Agile Methodology to plan out a project and develop the software
- Learn the process of following a given set of System Requirements to develop a software
- Learn to research and master the use of the MERN Stack
- Learn how to work together as a team on GitHub

## Project Description

The theme of the project, is to create a complete Online Learning System. An Online Learning System is a web application through which individuals can attend pre-recorded courses online.

## Build Status

The tasks in [this Google Sheet](https://docs.google.com/spreadsheets/d/1FnRiRfsTdeA9Lf1veuoYfL6R2Wd4P7bt/edit?usp=sharing&ouid=104786973149745973546&rtpof=true&sd=true "Sheet") are all completed and tested. All tasks work as intended; however, further imrpovments could be made in the future to the front end. However, this is still a proof of concept and is not to be used as an actual platform

## TECHS

- [React js](https://reactjs.org/): A library used for creating interfaces "frontend"
- [Nodejs](https://nodejs.org/en/): an open source server environment that allows java script to run on the server side
- [Expressjs](https://expressjs.com/): a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
- [Mongo DB](https://www.mongodb.com/): a source-available cross-platform document-oriented database program. Classified as a NoSQL database program
- [Mongoose](https://mongoosejs.com/): a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment
- [dotenv](https://www.npmjs.com/package/dotenv): a zero-dependency module that loads environment variables from a . env file into process. env
- [ByCrypt](https://www.npmjs.com/package/bcrypt): a password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher and presented at USENIX in 1999
- [JSONwebtoken](https://jwt.io/): a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims
- [Stripe](https://stripe.com/): one of the prime payment gateways
- [nodemailer](https://nodemailer.com/): a module for Node. js applications to allow easy as cake email sending

## Code Style

Following the basic [js conventions](https://google.github.io/styleguide/jsguide.html) and using camelCase

## Architecture

The basic MVC typically used for MERN stack was used

### 1. Model

    Model is where the logic related to data goes. This part is connected to the database and help to retrieve data and use that data in the rest of the application

### 2. View

    View is used to represent data to the client, so what basically we see on the website when we visit is due to the view part of MVC. View is created by the logic related to data written in model, however the data-logic is not decoded (and represented) by the view directly

### 3. Controller

    Controller acts as a broker between model and view as it gets the data from the model and sends it to the view so that data can be represented to the user (client). Without controller it would be impossible to establish the connection between model and the view

## Screen Shots

### Guest

<img width="1440" alt="Screen Shot 2023-01-06 at 8 44 53 PM" src="https://user-images.githubusercontent.com/81631814/211079356-b289f34d-0dbb-4889-a643-faf2fb318081.png">

<img width="1440" alt="Screen Shot 2023-01-06 at 8 44 56 PM" src="https://user-images.githubusercontent.com/81631814/211079287-5f7a2ec5-f2ec-43d8-9605-d24edae19674.png">

### Admin

<img width="1440" alt="Screen Shot 2023-01-06 at 8 45 30 PM" src="https://user-images.githubusercontent.com/81631814/211079426-9860cfde-e628-4c1e-8b6e-cdec6b0f67c7.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 8 45 34 PM" src="https://user-images.githubusercontent.com/81631814/211079501-6d437c00-a661-4c54-83d7-5a8b9e04f832.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 8 45 37 PM" src="https://user-images.githubusercontent.com/81631814/211079612-4ad650c7-e77c-4658-a0cc-bc28f7b6ba02.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 8 45 40 PM" src="https://user-images.githubusercontent.com/81631814/211079647-eafe8263-bd66-473a-8564-19ba9b1eaaa0.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 8 45 49 PM" src="https://user-images.githubusercontent.com/81631814/211079718-7ab7d50c-cdfe-486c-a13e-f8a5b485620d.png">

### Instructor

<img width="1440" alt="Screen Shot 2023-01-06 at 8 46 10 PM" src="https://user-images.githubusercontent.com/81631814/211079776-83da2eb8-0802-4e7b-ab19-3c9b47351594.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 8 46 32 PM" src="https://user-images.githubusercontent.com/81631814/211079857-15a02017-0add-4265-b86f-7ff333d6e7de.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 8 46 36 PM" src="https://user-images.githubusercontent.com/81631814/211079907-3ca8e79a-91b5-4483-a57e-262ebaa64ff3.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 8 46 43 PM" src="https://user-images.githubusercontent.com/81631814/211080084-2a7940f5-a882-4727-b908-50d6ea28091a.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 8 46 50 PM" src="https://user-images.githubusercontent.com/81631814/211080312-472ff111-f6fe-4950-995e-22daae38c8fb.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 8 47 05 PM" src="https://user-images.githubusercontent.com/81631814/211080557-40a71039-6f38-40bb-905f-d5386e1f0a7f.png">

### Trainee

<img width="1440" alt="Screen Shot 2023-01-06 at 8 49 42 PM" src="https://user-images.githubusercontent.com/81631814/211080618-a60be950-ba96-41b4-bca3-aca8fd29b007.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 8 49 48 PM" src="https://user-images.githubusercontent.com/81631814/211080652-59ed427d-4ac0-413a-b10b-75fcaf64394b.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 8 59 32 PM" src="https://user-images.githubusercontent.com/81631814/211081302-fb7fdf21-dff9-49b4-b5c6-efb67b31689e.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 9 01 16 PM" src="https://user-images.githubusercontent.com/81631814/211081465-0a00d309-f255-438c-89b2-54bd49059f1e.png">
<img width="1440" alt="Screen Shot 2023-01-06 at 9 01 23 PM" src="https://user-images.githubusercontent.com/81631814/211081614-a08b8ca3-5f02-4b47-a4de-1be24d333d36.png">

## API Refrences

### All Users

#### /courses

##### GET

- /Course
- /filterCoursePrice
- /viewMyCourses
- /filterCourse
- /Cours:e/id
- /filterSubject
- /getCourses
- /getall
- /filterRating
- /filterViews
- /myProgress

##### POST

- /addCourse
- /markCompleted

#### /instructor

##### GET

- /myProblems
- /unresolved
- /calcMyAverageRating
- /calcCourseAveragerating
- /viewMyRatings
- /viewMyCourseRatings
- /myCourses
- /filterPrice
- /filterSubject
- /filterTitle
- /completeCourse
- /calcMoneyOwed

##### POST

- /forgotPassword
- /changeforgot
- /makePromotion
- /forgotPassword
- /changeMail
- /changePassword
- /createCourse
- /changeCountry
- /updateBio
- /addSubtitle
- /updatePreview
- /addExam

#### /user

##### GET

- /logout
- /users
- /activeUser

##### POST

- /signup
- /loginIndividualTrainee
- /loginCorporateTrainee
- /logininstructor
- /loginAdmin

#### /invidualTrainee

##### GET

- /wallet
- /myCourses
- /unresolved
- /myProblems
- /percentage_completed
- /viewExcercises
- /viewSubtitles
- /watchVideo
- /completeCourse
- /isComplete

##### POST

- /forgotPassword
- /changeCountry
- /reviewCourse
- /followUpProblem
- /reviewInstructor
- /refund
- /changePassword
- /payCourse
- /changeforgot
- /newProblem
- /payCourse

#### /corporateTrainee

##### GET

- /wallet
- /myCourses
- /unresolved
- /myProblems
- /percentage_completed
- /viewExcercises
- /viewSubtitles
- /watchVideo
- /completeCourse
- /isComplete

##### POST

- /forgotPassword
- /changeCountry
- /reviewCourse
- /followUpProblem
- /reviewInstructor
- /refund
- /changePassword
- /payCourse
- /changeforgot
- /newProblem
- /payCourse

#### /admin

##### GET

- /viewrefunds
- /viewProblems
- /viewRequests

##### POST

- /addAdministrator
- /addcorporate
- /addinstructor
- /refund
- /markProblem
- /grantCourse
- /setPromotion

#### /guest

##### GET

- /wallet
- /myCourses
- /unresolved
- /myProblems
- /percentage_completed
- /viewExcercises
- /viewSubtitles
- /watchVideo
- /completeCourse
- /isComplete

##### POST

- /forgotPassword
- /changeCountry
- /reviewCourse
- /followUpProblem
- /reviewInstructor
- /refund
- /changePassword
- /payCourse
- /changeforgot
- /newProblem
- /payCourse

#### /problems

##### POST

- /newProblem

#### /c

##### GET

- /Course
- /filterCoursePrice
- /viewMyCourses
- /filterCourse
- /Cours:e/id
- /filterSubject
- /getCourses
- /getall
- /filterRating
- /filterViews
- /myProgress

##### POST

- /addCourse
- /markCompleted

## Installation

Once the project is open make sure that all the needed packages are installed by opening package-lock.json. Running the following line in the terminal should automatically install all the missing packages

    npm install

### dotenv

Multiple values are not added automatically and will need to be added in a .env file for the application to run

- MONG_URI
- PORT
- SECRET

## Usage

In order to run this project you can simply type in the terminal :

    npm run dev

This command will run a script named dev which will run the server (nodemon) for the backend

    npm start

This command will start the client (react start script) for the front end
