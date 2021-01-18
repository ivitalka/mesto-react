import React from "react";
import api from "../utils/Api";
import Card from "./Card";



function Main({onEditProfile, onAddPlace, onEditAvatar, onImageClick}) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getProfile()
            .then(data =>{
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar)
            }).catch((err) => {
            console.log(err);
        });
        api.getInitialCards()
            .then(data => {setCards(data)})
            .catch((err) => {
            console.log(err);
        })
    }, []);


    return (
        <main className="content">
            <section className="profile">
                <button className="button_action_update" onClick={onEditAvatar}>
                    <img src={userAvatar} alt="Аватар профиля" className="profile__avatar"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="button button_action_edit" onClick={onEditProfile} />
                    <p className="profile__about">{userDescription}</p>
                </div>
                <button type="button" className="button button_action_add" onClick={onAddPlace}/>

            </section>

            <section className="gallery">
                <ul className="gallery__list">
                    {cards.map((card) =>
                        <Card key={card._id}
                              card={card}
                              onImageClick={onImageClick}
                        />
                    )}
                </ul>
            </section>
        </main>
    )
}
export default Main;