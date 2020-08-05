import { FormControl } from '@angular/forms';

export default {
    dueDateValidator() {
        return function(control: FormControl) {
            let date: Date = new Date(control.value);

            if (isNaN(date.getTime())) {
                return {dueDateError: 'Due date is not a date'};
            }

            if (date.getDay() === 0) // 0 is Sunday
                return {dueDateError: 'Due date cannot be Sunday'};

            return null;
        }
    }
}