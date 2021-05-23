import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase";
const PublicContext = React.createContext();

export function usePublicContext() {
  return useContext(PublicContext);
}

export function PublicProvider({ children }) {
  const [companies, setCompanies] = useState([]);
  const [isBookingCompany, setIsBookingCompany] = useState(false);
  const [currentBookCompany, setCurrentBookCompany] = useState({});
  const [bookService, setBookService] = useState({});
  const [isUserInfoShow, setIsUserInfoShow] = useState(false);
  const [isConfirmBookShow, setIsConfirmBookShow] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});

  useEffect(() => {
    var unsubscribe = getCompanies();
    return unsubscribe;
  }, []);

  const buttonSelectedStyle = {
    color: "#EF6313",
    borderColor: "#EF6313",
  };

  const getCompanies = () => {
    return firebase
      .firestore()
      .collection("companies")
      .get()
      .then((querySnapshot) => {
        var companies = [];
        querySnapshot.forEach((doc) => {
          var comp = doc.data();
          comp.id = doc.id;
          companies.push(comp);
        });
        setCompanies(companies);
      });
  };

  const value = {
    companies,
    buttonSelectedStyle,
    isBookingCompany,
    currentBookCompany,
    bookService,
    isUserInfoShow,
    isConfirmBookShow,
    currentUserData,
    setCompanies,
    setIsBookingCompany,
    setCurrentBookCompany,
    setBookService,
    setIsUserInfoShow,
    setIsConfirmBookShow,
    setCurrentUserData,
  };
  return (
    <PublicContext.Provider value={value}>{children}</PublicContext.Provider>
  );
}
