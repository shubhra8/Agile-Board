const { Schema, model } = require('mongoose');

const listSchema = new Schema(
    {
        lTitle: {
            type: String,
            required: true
        },

        cards: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Card',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const List = model('List', listSchema);
module.exports = List;