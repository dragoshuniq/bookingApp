import React, { useContext, useState, useEffect } from "react";

const CompanyContext = React.createContext();

export function useAddContext() {
  return useContext(CompanyContext);
}

export function AddCompanyProvider({ children }) {
  const [currentTimeTable, setCurrentTimeTable] = useState({
    sunday: true,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: true,
    friday: false,
    saturday: false,
  });

  const [isAddCompany, setIsAddCompany] = useState(false);
  const [isEditTime, setIsEditTime] = useState(false);
  const [isSelectTime, setIsSelectTime] = useState(false);

  const onClickSwitch = (day) => {
    setCurrentTimeTable({ ...currentTimeTable, [day]: !currentTimeTable[day] });
  };

  const value = {
    currentTimeTable,
    isAddCompany,
    isEditTime,
    isSelectTime,
    setIsAddCompany,
    setIsEditTime,
    setIsSelectTime,
    onClickSwitch,
  };
  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
}
