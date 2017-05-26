import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'localdate'})
export class LocalDatePipe implements PipeTransform {
    transform(date: Date): string {
        let raw_date = new Date(date);
        let _date = new Date(
            raw_date.getUTCFullYear(), raw_date.getUTCMonth(), raw_date.getUTCDate(),  
            raw_date.getUTCHours(), raw_date.getUTCMinutes(), raw_date.getUTCSeconds()
        );
        return _date.toLocaleString();
    }
}