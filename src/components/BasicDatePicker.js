import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

// function BasicDatePicker() {
//   // const [selectedDate] = useState(new Date()) //handleDateChange

//   function handleDateChange () {
//     console.log(value);

//   }

//   return (
//     <MuiPickersUtilsProvider utils={MomentUtils}>
//       <DatePicker value={new Date()} onChange={handleDateChange} />
//     </MuiPickersUtilsProvider>
//   );
// }

// function BasicDatePicker() {
//   const [selectedDate, handleDateChange] = useState(new Date());

//   function handleChangeTo (val){
//     console.log(val);
//     return val
//   }

//   return (
//     <MuiPickersUtilsProvider  utils={MomentUtils}>
//       <DatePicker
//         label="Year and Month"
//         helperText="With min and max"
//         value={}
//         onChange={val => {
//           // handleDateChange(val);
//           handleChangeTo(val);
//         }}
//       />
//     </MuiPickersUtilsProvider>
//   );
// }

// import React, { useState, useEffect } from 'react';
// 	import DateFnsUtils from '@date-io/date-fns'; // choose your lib
// 	import {
// 	  DatePicker,
// 	  TimePicker,
// 	  DateTimePicker,
// 	  MuiPickersUtilsProvider,
// 	} from '@material-ui/pickers';

// function BasicDatePicker(props) {
//   const [selectedDate, handleDateChange] = useState(new Date());
//   // useEffect(() => {
//   //   props.updateDate(selectedDate)
//   // }, [selectedDate])

//   function logEvent(event){
//     console.log(event);
    
//   }

//   return (
//     <MuiPickersUtilsProvider utils={MomentUtils}>
//       <DatePicker value={selectedDate} onChange={handleDateChange} onClick={logEvent}/>
//     </MuiPickersUtilsProvider>
//   )
// }
// export default DatePickerDialog

<MuiPickersUtilsProvider utils={MomentUtils}>
<span>Start date:</span><DatePicker
    id="start-date" value={this.state.startDate} onChange={this.handleStartDateChange} />
<span>End date:</span><DatePicker id="end-date" value={this.state.endDate} onChange={this.handleEndDateChange} />
</MuiPickersUtilsProvider>

export default BasicDatePicker;

