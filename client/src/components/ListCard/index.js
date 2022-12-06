import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useLocation } from 'react-router-dom';
import { BOARD_DETAILS } from "../../utils/queries";
import { ADD_CARD, ADD_LIST, REMOVE_CARD, EDIT_CARD } from "../../utils/mutations";
import CardBlock from '../CardBlock';
import ListPage from '../ListPage';
import Popup from 'reactjs-popup';
import { BsFillPencilFill } from 'react-icons/bs';
import { BsFillTrashFill } from 'react-icons/bs';



const ListCard = ({boards}) => {
    console.log(`boards inside listcard ${boards}`);

    // const { boardParam } = useParams();
    const location = useLocation();
    const {boardParam} = location.state;
    console.log(boardParam);
    const [Title, setTitle] = useState('');
    const [listTitle, setListTitle] = useState('');
    const [cardTitle, setCardTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [parentId, setParentId] = useState('');
    const [parentListId, setParentListId] = useState('');
    const [parentCardId, setParentCardId] = useState('');
    const [showFrom, setShowForm] = useState(false);
    const [descform, setDescForm] = useState(false);
    const [showListFrom, setShowListForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Title Required');

    // const { loading, data } = useQuery(BOARD_DETAILS, {
    //     variables: { boardId: boardParam },
    // });

    // const boards = data?.boards || [];

    const openForm = async (e) => {
        e.stopPropagation();
        setShowForm(!showFrom);
    }

    const openDescForm = async (e) => {

        setDescForm(!descform);
    }

    const openListForm = () => {
        setShowListForm(!showListFrom);
    }

    const [addCard, { error, data1 }] = useMutation(ADD_CARD);
    const [addList, { error2, data2 }] = useMutation(ADD_LIST);
    const [removeCard, { error3 }] = useMutation(REMOVE_CARD);
    const [editcard, { error4 }] = useMutation(EDIT_CARD);

    const handleAddCard = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        console.log(Title);
        console.log(parentId);

        if (!Title) {
            e.preventDefault();
            errorMessage();
            return;
        }


        try {
            const { data } = await addCard({
                variables: { cTitle: Title, listId: parentId },
            });

        } catch (error) {
            console.log(error);
        }
        window.location.reload();
        console.log(`Card ${Title} created`);
        setTitle('');
    };

    const handleAddList = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        console.log(listTitle);
        console.log(parentListId);

        if (!listTitle) {
            e.preventDefault();
            setErrorMessage('Title required/Press Cancel');
            return;
        }
        try {
            const { data } = await addList({
                variables: { lTitle: listTitle, boardId: parentListId },
            });

        } catch (error) {
            console.log(error);
        }
        window.location.reload();
        console.log(`List ${listTitle} created`);
        setListTitle('');

    };

    const handleCardDesc = async (e, title, descrip) => {
        e.preventDefault();

        try {
            const { data } = await editcard({
                variables: { title: cardTitle ? cardTitle : title, cardId: parentCardId, desc: Description ? Description : descrip },
            });

        } catch (error) {
            console.log(error);
        }
        window.location.reload();
        setErrorMessage('');
    };

    const handleRemoveCard = async (cardid) => {
        try {
            const { data } = await removeCard({
                variables: { cardId: cardid },
            });
        } catch (err) {
            console.error(err);
        }
        window.location.reload();
    };

    const handleInput = (e) => {
        // Getting the value and name of the input which triggered the change
        const { value, id } = e.target;
        setTitle(value);
        setParentId(id);
    };

    const handleDescInput = (e) => {
        // Getting the value and name of the input which triggered the change
        const { value, id } = e.target;
        setDescription(value);
        setParentCardId(id);
    };

    const handleListInput = (e) => {
        // Getting the value and name of the input which triggered the change
        const { value, id } = e.target;
        setListTitle(value);
        setParentListId(id);
    };

    const handleCardTitle = (e) => {
        // Getting the value and name of the input which triggered the change
        const { value, id } = e.target;
        setCardTitle(value);
        setParentCardId(id);
    };

    return (

       <div className="flex-row">
 {boards.lists.map((listDetail, index) => (
 <ListPage key={index} id={listDetail._id} className='liststyle' >
       <h5 className="p-2 m-1 h-1">{listDetail.lTitle}</h5>
       {listDetail.cards.map((cardDetail, index) => (
        <CardBlock key={index} id={cardDetail._id} className='cardstyle' draggable='true'>
          <div className="title">{cardDetail.cTitle}</div>
              <div className="cardtools">
             <Popup trigger={<button type="button" id={cardDetail._id} className="btn btn-sm"><BsFillPencilFill /></button>} position='top center'>
                 <form className="form">
                   <input className="form-input" id={cardDetail._id} type="text" name="cardTitle" onChange={handleCardTitle} defaultValue={cardDetail.cTitle} placeholder={cardDetail.cTitle ? cardDetail.cTitle : "Enter Card Title"} ></input>
                   <input className="form-input" id={cardDetail._id} type='text' name="Description" onChange={handleDescInput} defaultValue={cardDetail.description} placeholder={cardDetail.description ? cardDetail.description : "Enter Card Description"} ></input>
                    <button className="btn btn-light m-1" onClick={openDescForm}>Cancel</button>
                    <button className="btn btn-light m-1" onClick={e => handleCardDesc(e, cardDetail.cTitle, cardDetail.description)}>Submit</button>
               </form >
               </Popup>
               <button className="btn btn-sm" onClick={() => handleRemoveCard(cardDetail._id)}><BsFillTrashFill /></button>
            {/* <button className="btn btn-sm" onClick={() => handleRemoveCard(cardDetail._id)}>hi</button> */}
            </div>
       </CardBlock>
       ))}
      <Popup trigger={<button type="button" id={listDetail._id} className="btn btn-lg btn-light w-100">add card</button>} position='bottom center'>
           <form className="form">
                  <input className="form-input" id={listDetail._id} type='text' name="Title" onChange={handleInput} value={Title} placeholder="Card Title"></input>
           <button className="btn btn-light m-1" onClick={openForm}>Cancel</button>
             <button className="btn btn-light m-1" onClick={handleAddCard}>Submit</button>
              </form >

         </Popup>

                            
  </ListPage>
    ))}

 
         


            </div>
          
       
    )
};
export default ListCard;


 // <div className="my-2">
          
        //         <h4 className="text-white">{boards.bTitle}</h4>
        //     {showListFrom ? (

        //         <form className="form form-width">
        //             <input className="form-input" id={boards._id} type='text' name="listTitle" onChange={handleListInput} value={listTitle} placeholder="List Title"></input>

        //             <button className="btn btn-light m-1" onClick={openForm}>Cancel</button>
        //             <button className="btn btn-light m-1" onClick={handleAddList}>Add </button>
        //         </form >

        //     ) : (
        //         <button type="button" id={boards._id} className="btn btn-lg btn-light m-2" onClick={openListForm}>Add List</button>
        //     )}

        //     <div>
        //         {loading ? (
        //             <div> Loading...</div>
        //         ) : (
        //             <div className="flex-row" >