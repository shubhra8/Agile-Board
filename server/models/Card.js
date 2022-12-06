const { model, Schema } = require('mongoose');


const cardSchema = new Schema(
    {
        cTitle: {
            type: String,
            required: true,

        },
        description: {
            type: String,
        },
        duedate:{
             type: String,
             //default: Date.now,
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
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

const Card = model('Card', cardSchema);

module.exports = Card;
