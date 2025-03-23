const routes = require('express').Router();
const profileController = require('../controllers/ProfileController');

routes.post('/add', profileController.addProfile);
routes.get('/all', profileController.getAllProfiles);
routes.post('/addWithFile', profileController.addProfileWithFile);
routes.get('/getProfileByUserId/:userId', profileController.getAllProfileByUserId);
routes.post('./updateprofile',profileController.updateProfile)

module.exports = routes;
