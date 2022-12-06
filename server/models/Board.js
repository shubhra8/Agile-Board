const { Schema, model } = require('mongoose');

const boardSchema = new Schema(
    {

        bTitle: {
            type: String,
            required: true,
        },
        lists: [
            {
                type: Schema.Types.ObjectId,
                ref: 'List',
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

const Board = model('Board', boardSchema);

module.exports = Board;