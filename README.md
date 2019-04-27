# sleepasasymptom
SaaS Web (version 1.2)
# ReleaseNotes
## New Software Features
 - View Studies Page
    - Exporting data from a study
    - Editing a study (admin)
    - Changing the status of a study (admin)
    - Manage Researchers in a study (supervisor and admin)
    - Studies older than 60 days switch to inactive
 - Profile page
 - View Researchers Page
    - Manage a researcher's role (admin)
 - Create a Study
    - add constraints to study
    - upload informed consent pdf
    - Study Name
    - Description
## Bug Fixes
N/A
## Known Bugs and defects
   - Exporting to CSV is missing

# Install Guide
## Dependencies

- twbs / bootstrap ^ 4.3.0

- firebase / firebase-js-sdk firebase ^ 5.8.2

- facebook / prop-types ^ 15.7.2

- facebook / react ^ 16.8.1

- facebook / react react-dom ^ 16.8.1

- reduxjs / react-redux ^ 6.0.1

- ReactTraining / react-router react-router-dom ^ 4.3.1

- facebook / create-react-app react-scripts ^2.1.5

- Vashnak / react-toasts ^ 3.0.2

- reactstrap / reactstrap ^ 7.1.0

- acdlite / recompose ^ 0.30.0

- reduxjs / redux ^ 4.0.1

- rt2zz / redux-persist ^ 5.10.0

- reduxjs / redux-thunk

## Run project Locally

If you have just cloned the project, in the '../saasweb/' directory run 'npm install' to install all dependencies. 

After the dependencies are installed, you can run 'npm start' and the project will launch locally.

## Update and deploy to production

First make sure you have firebase tools installed: https://firebase.google.com/docs/hosting/quickstart

To deploy an update to production first run 'npm run build' this creates a optimized version to be deployed. Then run 'firebase deploy'
