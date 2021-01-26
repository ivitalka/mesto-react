import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext"
import Header from "./Header"
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);


    function handleEditProfileClick() { setIsEditProfilePopupOpen(true) }
    function handleAddPlaceClick() { setIsAddPlacePopupOpen(true) }
    function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true) }
    function handleCardClick(card) {setSelectedCard(card)}

    function handleUpdateUser(data) {
        api.updateProfile(data)
            .then(res => {
            setCurrentUser(res);
            closeAllPopups();
        })
            .catch((err) => {
            console.log(err);
        })
    }
    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
            console.log(err);
        })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            const newCards = cards.map((item) => item._id === card._id ? newCard : item);
            setCards(newCards);
        })
            .catch((err) => {
                console.log(err);
            })
    }
    function handleCardDelete(card){
        api.removeCard(card._id)
            .then(() => {
                const newCards = cards.filter(c => c !== card);
                setCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function handleAddPlaceSubmit(card) {
        api.postCard(card)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    React.useEffect(() => {
        api.getProfile().then((data) => {
            setCurrentUser(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    React.useEffect(() => {
        api.getInitialCards()
            .then(data => {setCards(data)})
            .catch((err) => {
                console.log(err);
            })
    }, []);
  return (
      <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
      <div className="page">

        <Header />
        <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onImageClick={handleCardClick}

        />
        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
        />
          <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          />
        <EditProfilePopup />
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
      </CurrentUserContext.Provider>
  );
}

export default App;
