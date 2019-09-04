import 'rc-time-picker/assets/index.css';
import React from 'react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
const format = 'h:mm a';

const now = moment().hour(0).minute(0);

// function onChange(value) {
//   console.log(value && value.format(format));
// }
class TimeSelector extends React.Component {
    render() {
        return (<TimePicker
    showSecond={false}
    defaultValue={now}
    className="xxx"
    format={format}
    use12Hours
    inputReadOnly/>
    )
    }
}

export default TimeSelector
 
