import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase";
const CompanyContext = React.createContext();

export function useAddContext() {
  return useContext(CompanyContext);
}

export function AddCompanyProvider({ children }) {
  const defaultService = {
    duration: 30,
    price: 10,
    name: "",
    description: "",
    capacity: 1,
    availability: {
      sunday: { isOpen: false, openTime: "00.00", closeTime: "00.00" },
      monday: { isOpen: true, openTime: "00.00", closeTime: "00.00" },
      tuesday: { isOpen: true, openTime: "00.00", closeTime: "00.00" },
      wednesday: { isOpen: true, openTime: "00.00", closeTime: "00.00" },
      thursday: { isOpen: true, openTime: "00.00", closeTime: "00.00" },
      friday: { isOpen: true, openTime: "00.00", closeTime: "00.00" },
      saturday: { isOpen: false, openTime: "00.00", closeTime: "00.00" },
    },
  };
  const [currentTimeTable, setCurrentTimeTable] = useState(
    defaultService.availability
  );
  const [currentTimeTableIndex, setCurrentTimeTableIndex] = useState(0);
  const [services, setServices] = useState([defaultService]);

  const addService = () => {
    setServices([...services, defaultService]);
  };

  const updateService = (val, ind, type) => {
    const srvs = JSON.parse(JSON.stringify(services));
    srvs[ind][type] = val;
    setServices(srvs);
  };

  const [currentTimeEdit, setCurrentTime] = useState({
    hour: 0,
    min: 0,
    type: "close",
    day: "sunday",
  });

  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const [currentDocID, setCurrentDocID] = useState("");
  const [isDeleteConfirmShow, setIsDeleteConfirmShow] = useState({
    show: false,
    id: "",
  });
  const [isViewCompanyShow, setIsViewCompanyShow] = useState({
    show: false,
    company: {},
  });
  const [isAddCompany, setIsAddCompany] = useState(false);
  const [isEditTime, setIsEditTime] = useState(false);
  const [isSelectTime, setIsSelectTime] = useState(false);
  const [activeButton, setActiveButton] = useState("profile");
  const [file, setFile] = React.useState(null);
  const [companies, setCompanies] = React.useState([]);

  const onClickSwitch = (day) => {
    setCurrentTimeTable({
      ...currentTimeTable,
      [day]: {
        ...currentTimeTable[day],
        isOpen: !currentTimeTable[day].isOpen,
      },
    });
  };

  useEffect(() => {
    var unsubscribe = getCompanies();
    return unsubscribe;
  }, [isAddCompany, isDeleteConfirmShow]);

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

  const deleteCompany = (id) => {
    firebase
      .firestore()
      .collection("companies")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        setIsDeleteConfirmShow({ show: false, id: "" });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const value = {
    companies,
    currentTimeTable,
    isAddCompany,
    isEditTime,
    isSelectTime,
    activeButton,
    file,
    currentDocID,
    isDeleteConfirmShow,
    isViewCompanyShow,
    daysOfWeek,
    currentTimeEdit,
    defaultService,
    services,
    currentTimeTableIndex,
    setIsAddCompany,
    setIsEditTime,
    setIsSelectTime,
    onClickSwitch,
    setActiveButton,
    setFile,
    setCurrentDocID,
    setIsDeleteConfirmShow,
    deleteCompany,
    setIsViewCompanyShow,
    setCurrentTimeTable,
    setCurrentTime,
    addService,
    updateService,
    setServices,
    setCurrentTimeTableIndex,
  };
  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
}
