import React from "react";
import Header from "./Header"
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    function handleEditProfileClick() { setIsEditProfilePopupOpen(true) }
    function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) }
    function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) }
    function handleCardClick(card) {setSelectedCard(card)}

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }
  return (
      <div className="root">
      <div className="page">

        <Header />
        <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onImageClick={handleCardClick}
        />
        <PopupWithForm
            name={"edit"}
            title={"Редактировать профиль"}
            children={
                <>
                    <div className="popup__input-container">
                        <input className="popup__input popup__input_profile_name" type="text" name="name" id="profile-name"
                               value="" required minLength="2" maxLength="40"/>
                        <span id="profile-name-error" className="error"/>
                    </div>
                    <div className="popup__input-container">
                        <input className="popup__input popup__input_profile_about" type="text" name="about" id="profile-about"
                        value="" required minLength="2" maxLength="200"/>
                        <span id="profile-about-error" className="error"/>
                    </div>
                </>
            }
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
        />
        <PopupWithForm
            name={"add"}
            title={"Новое место"}
            children={
                <>
                    <div className="popup__input-container">
                        <input className="popup__input popup__input_picture_name" placeholder="Название" type="text"
                               name="pictureName" id="picture-name" value="" required minLength="2" maxLength="30"/>
                        <span id="picture-name-error" className="error"/>
                    </div>
                    <div className="popup__input-container">
                        <input className="popup__input popup__input_picture_link" placeholder="Ссылка на картинку" type="url"
                               name="pictureLink" id="picture-link" value="" required/>
                        <span id="picture-link-error" className="error"/>
                    </div>
                </>}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
        />
        <PopupWithForm
            name={"update"}
            title={"Обновить аватар"}
            children={
                <>
                    <div className="popup__input-container">
                        <input className="popup__input popup__input_avatar_link" placeholder="Ссылка на аватар" type="url"
                               name="avatar" id="avatar-link" value="" required/>
                        <span id="avatar-link-error" className="error"/>
                    </div>
                </>
            }
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
        />
        <PopupWithForm
            name={"submit"}
            title={"Вы уверены?"}
            children={''}
            onClose={closeAllPopups}
        />
        <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
        />
        <Footer />

      </div>
      </div>
  );
}

export default App;
