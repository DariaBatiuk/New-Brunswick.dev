const { User, Project} = require('../models');

const ProjectController = {
  // /api/Projects

  //  retrieves all Projects in the database and populates their reactions.
  getAllProject(req, res) {
    Project.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbProjectData => res.json(dbProjectData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // retrieves a single Project by its ID and populates its reactions.
  getProjectById({ params }, res) {
    Project.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No Projects found with that id!' });
          return;
        }
        res.json(dbProjectData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

// creates a new Project in the database and adds it to the User's Projects array.
  createProject({ body }, res) {
    Project.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { Projects: _id } },
                { new: true }
            );
        })
        .then(dbProjectData => {
            if (!dbProjectData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbProjectData);
        })
        .catch(err => res.json(err));
},

  // updates a Project by its ID with the provided data.
  updateProject({ params, body }, res) {
    Project.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No Projects found with that id!' });
          return;
        }
        res.json(dbProjectData);
      })
      .catch(err => res.json(err));
  },

  // deletes a Project by its ID and removes it from the User's Projects array.
  deleteProject({ params }, res) {
    Project.findOneAndDelete({ _id: params.id })
      .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No Projects found with that id!' });
          return;
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { Projects: params.Id } },
          { new: true }
        )
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

// adds a new reaction to a Project by its ID.
  createReaction({params, body}, res) {
    Project.findOneAndUpdate(
      {_id: params.id}, 
      {$push: {reactions: body}}, 
      {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbProjectData => {
        if (!dbProjectData) {
            res.status(404).json({message: 'No Projects with this ID.'});
            return;
        }
        res.json(dbProjectData);
    })
    .catch(err => res.status(400).json(err))
},

// deletes a reaction from a Project by its ID and the reaction's ID.
  deleteReaction({ params }, res) {
    Project.findOneAndUpdate(
      { _id: params.ProjectId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'Nope!'});
          return;
        }
       res.json(dbProjectData);
      })
      .catch(err => res.json(err));
  }


};

module.exports = ProjectController; // The line is exporting the ProjectController object as a module 