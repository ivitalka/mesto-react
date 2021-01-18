import React from 'react';

function Card({ card, onImageClick }) {
    return (
        <>
            <li className="gallery__item" id={card._id}>
                <button type="button" className="button button_action_remove"/>
                <img className="gallery__picture" src={card.link} alt=""
                     onClick={_ => onImageClick(card)}
                />
                <h2 className="gallery__heading">{card.name}</h2>
                <div className="gallery__container">
                    <button type="button" className="button button_action_like"/>
                    <p className="gallery__like-counter">{card.likes.length}</p>
                </div>
            </li>
        </>
    );
}

export default Card;