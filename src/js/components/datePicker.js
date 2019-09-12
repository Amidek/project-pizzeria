/* global flatpickr */ // eslint-disable-line no-unused-vars

import {settings, select} from '../settings.js';
import baseWidget from './baseWidget.js';
import utils from '../utils.js';

class datePicker extends baseWidget {
  constructor(wrapper) {
    super (wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisWidget.initPlugin();
  }

  initPlugin() {
    const thisWidget = this;
    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);
    flatpickr(thisWidget.dom.input, {
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      locale: {
        firstDayOfWeek: 1
      },
      disable: [
        function(date) {
          return (date.getDay() === 1);
        }
      ],
      onChange: function(selectedDates, dateStr) {
        thisWidget.value = dateStr;
      },
    });
  }

  parseValue(date) {
    return date;
  }

  isValid() {
    return true;
  }

  renderValue() {

  }
}
export default datePicker;
