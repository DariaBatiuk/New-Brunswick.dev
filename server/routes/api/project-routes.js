const router = require('express').Router(); // creates a new instance of the Express.js Router middleware.

// imports the thought controller's functions for handling each request.
const {
  getAllProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  createReaction,
  deleteReaction
} = require('../../controllers/projectt-controller');

/*  sets up the route for getting all thoughts and creating a new thought. 
This route is set up using the .route() method of the router object and chaining the .get() and .post() methods. */
router
  .route('/')
  .get(getAllProject)
  .post(createProject);

/* sets up the route for getting a single thought by ID, updating a thought, and deleting a thought. 
This route is set up using the .route() method of the router object and chaining the .get(), .put(), and .delete() methods. */
router
  .route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

/*  sets up the route for adding a reaction to a thought. 
This route is set up using the .route() method of the router object and chaining the .post() method. */
router
  .route('/:id/reactions')
  .post(createReaction);

/* sets up the route for deleting a reaction from a thought. 
This route is set up using the .route() method of the router object and chaining the .delete() method. */
  router
  .route('/:projectId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router; // exports the router middleware for use in the main server file.