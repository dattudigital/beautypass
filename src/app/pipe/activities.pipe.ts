import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activities'
})
export class ActivitiesPipe implements PipeTransform {

  transform(value: any): any {
    value.forEach(element => {
      if (element.activity_status == 1) {
        element.activity_status = "Active";
      } else if (element.activity_status == 0) {
        element.activity_status = "In Active";
      }
    });
    return value;
  }

}
