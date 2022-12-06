import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOARD } from '../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Board() {
    //set value of title using useState to null/ initial title to null
    const [bTitle, setbTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('Name is required');
    const [board, { error, data }] = useMutation(ADD_BOARD);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        console.log(bTitle);

        if (!bTitle) {
            e.preventDefault();
            errorMessage();
            return;
        }
        try {
            const { data } = await board({
                variables: { bTitle },
            });

        } catch (error) {
            console.log(e);
        }
        window.location.assign('/');
        console.log(`Board ${bTitle} created`);
        setbTitle('');

    };

    const handleCancel = (e) => {
        e.preventDefault();
        window.location.assign('/');
    }

    const handleInput = (e) => {
        // Getting the value and name of the input which triggered the change
        const { value } = e.target;
        setbTitle(value);
    };

    return (

        <main className="flex-row justify-center mb-4">
            {Auth.loggedIn() ? (
                <div className="col-5 col-lg-5">
                    {data ? (
                        <p>
                            Success!
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (
                        <div className="my-2">
                            <h4 className="bg-dark text-light p-2">Create Board</h4>


                            <form className="form">
                                <input className="form-input" type='text' name="bTitle" onChange={handleInput} value={bTitle} placeholder="Enter Board Title"></input>
                                <div className="w-100">
                                    <button className="btn btn-light m-1" type="submit" onClick={handleCancel}>Cancel</button>
                                    <button className="btn btn-light m-1" type="submit" onClick={handleSubmit}>Submit</button>
                                </div>
                            </form >


                        </div>
                    )}
                    {error && (
                        <div className="my-3 p-3 bg-danger text-white">
                            <p >{error.message}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <p> Please login/signup </p>
                </div>
            )}
        </main>
    )

};

export default Board;

