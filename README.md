# Trendemics

## CIS4301 Group Project

### Description

(Trendemics Description)

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites

Before you begin, ensure you have the following installed:
- [Git](https://git-scm.com/downloads)
- [Node.js and npm](https://nodejs.org/en/download/) (npm comes with Node.js)

#### Clone the Repository

To get started, clone the repository to your local machine:
```
git clone https://github.com/your-username/trendemics.git
cd Trendemics
```
#### Create a New Branch
```
git checkout -b your-branch-name
```
Replace 'your-branch-name' with a suitable name for your branch.


#### Install Dependencies

Navigate to the project directory and install the necessary dependencies:
```
npm install
```
#### Starting the Application Locally
npm start

#### Making Changes

Make your changes in your brnach and commit them: 
```
git add .
git commit -m "Your commit message" 
```
After pushingyour changes, push them to the remote repository: 
```git push origin your-branch-name ```

#### Contributing 

### Authors 
  - List of [contributors](https://github.com/micielkirsten/trendemics/graphs/contributors) who participated in this project.




# Structure
## /server (backend)
* /server/models contains data structures for database entities/attributes/etc.
* /server/routes contain the routes for our API calls (e.g. GET from the database)

## /src (frontend)
* src/App.js
    * each subdirectory/route has a folder within the app folder, e.g. the about page would be found at src/about/about.js

## .env 
* contains our database credentials