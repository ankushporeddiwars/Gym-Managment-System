import { Injectable, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Masters } from '../../../app/dataModels/common/common';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  // datePipe = inject(DatePipe);

  formatDate(date: string | null | undefined): any {
    if (date && date != null) {
      const x = new Date(date);
      const hoursDiff = x.getHours() - x.getTimezoneOffset() / 60;
      const minutesDiff = (x.getHours() - x.getTimezoneOffset()) % 60;
      x.setHours(hoursDiff);
      x.setMinutes(minutesDiff);
      return x;
    }
    return null;
  }

  // transform(date: Date | undefined) {
  //   return this.datePipe.transform(date, 'dd-MMM-yyyy', 'en-US');
  // }

  getDisplayName(group: string, id?: string, masters?: Masters[]): string {
    if (id) {
      return masters?.filter(x => x.key === group)[0]?.values.find(y => y.id === id)?.displayName ?? '';
    } else {
      return '';
    }
  }
}
