// Angular

import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Returns only first letter of string
 */
@Injectable()
@Pipe({
	name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {

	/**
	 * Transform
	 *
	 * @param value: any
	 * @param args: any
	 */
	transform(value: any, args?: any): any {
		return (value || '').split(' ').map(n => n[0]).join('');
	}
}
