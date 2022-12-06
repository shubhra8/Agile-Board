import React, {useState} from "react";
import { useMutation } from '@apollo/client';
import { DRAG_CARD, DROP_CARD } from '../../utils/mutations';

function ListPage (props) {

const [moveCard, { error, data }] = useMutation(DRAG_CARD);
const [dropCard, {error1, data1 }] = useMutation(DROP_CARD);


    const drop = async (e) => {
        e.preventDefault();
        const target = e.target;
        const ids = e.dataTransfer.getData('card_id');
        const [card_id, parentBoard_id ] = ids.split('#')
        console.log(card_id, parentBoard_id);
        const card = document.getElementById(card_id);
        console.log(card);
        card.style.display = 'block';
      
        e.target.appendChild(card);
        const destination_id = target.id;
        console.log(`list id where card is dropped ${destination_id}`);
        try {
            const { data } = await moveCard({
                variables: { listId: parentBoard_id, cardId:card_id },
            });
            
        } catch (error) {
            console.log(error);
        }

        try { 
            const { data1 } = await dropCard({
                variables: { listId: destination_id, cardId:card_id},
            })
        } catch (error1) {
            console.log(error1)
        }
    }   

    const dragOver = e => {
        e.preventDefault();
    }

 return (
    <div 
    id={props.id}
    className={props.className}
    onDrop={drop}
    onDragOver={dragOver}
    >
        {props.children}
    </div>
 )
}

export default ListPage;