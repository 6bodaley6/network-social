const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/:id')
    .get(updateThought)
    .post(addReaction)
    .delete(deleteThought);
router
    .route('/:id/:reactionId')
    .delete(removeReaction);

module.exports = router;