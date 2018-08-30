import { Pipe, PipeTransform } from '@angular/core';

import { VoteEdit } from '../votes.model';

@Pipe({
  name: 'notCastText'
})
export class NotCastTextPipe implements PipeTransform {

  transform(value: VoteEdit, args?: any): string {
    return value.voterIsAbsent ? '(Absent)' : 'Not Cast';
  }

}
