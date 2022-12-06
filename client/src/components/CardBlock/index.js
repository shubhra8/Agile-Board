import React from "react";

function CardBlock (props) {

    const dragStart = e => {
        const target = e.target;
        const parent_id = e.target.parentElement.id;
        console.log(`source list id: ${parent_id}`);
        e.dataTransfer.setData('card_id', target.id+'#'+parent_id);
        console.log(`Card ID taht is being dragged: ${target.id}`);
        // setTimeout(() => {
        //     target.style.display = "none";
        // }, 0);
    }

    const dragOver = e => {
        e.stopPropagation();
    }
    
    return (
        <div
        id={props.id}
        className={props.className}
        draggable={props.draggable}
        onDragStart={dragStart}
        onDragOver={dragOver}
        >
            {props.children}
        </div>
    )
}

export default CardBlock;