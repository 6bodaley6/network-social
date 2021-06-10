const { User, Thought } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtDdata))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'no thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //create thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id, _doc }) => {
                return User.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thouths: _id } }
                ).then(res.json(_doc))
            }).catch(err => res.status(400).json(err));
    },
    //update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'no thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    //delete thought
    deleteThough({ params }, res) {
        Thought.findOneAndDelte({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(400).json({ message: 'no though found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    //add reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'no thought found with this id' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    //remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { id: params.id },
            { $pull: { reactions: params.reactionId } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;