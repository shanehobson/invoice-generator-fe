/* eslint-disable react/prop-types */
import React, { useState } from "react";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const MyDatePicker = (props) => {
  const [date, setDate] = useState(new Date());

  const updateDate = date => {
    setDate(date);
    if (props.date !== date) {
      props.updateDate(date);
    }
  }



  return (
      <DatePicker
        minDate={new Date()}
        dateFormat="MM/dd/yyyy"
        selected={date}
        onChange={date => updateDate(date)}
        isClearable
      />
  );
};

export default MyDatePicker;