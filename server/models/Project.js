const { Schema, model } = require("mongoose");
const User = require('./User');
const reactionSchema = new Schema({
     reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
     },
     reactionBody: {
          type: String,

          maxLength: 280
     },
     user: {
          type: String,

     },
     createdAt: {
          type: Date,
          default: Date.now
     }
},
{
     toJSON: {
          virtuals: true,
          getters: true
     },
     id: false
});

const projectSchema = new Schema({
     title: {
          type: String,
          required: true,
          max_length: 50,
     },
     date: {
          type: Date,
          default: Date.now(),
     },
     description: {
          type: String,
          required: true,
          max_length: 500,
     },
     originalPoster: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
     },
     collaborators: {
          type: [
               {
                    type: Schema.Types.ObjectId,
                    ref: "User",
               },
          ],
          default: []
     },
     reactions: [reactionSchema],
     tags: {
          type: [String],
          default: [],
     },
});
const Project = model("Project", projectSchema);
module.exports = Project;

     // reactions: {
     //      type: [
     //           {
     //           type: Schema.Types.ObjectId,
     //           ref: "Reaction",
     //           },
     //      ],
     //      default: [],
     // },