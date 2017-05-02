

import { Component,Pipe,PipeTransform } from '@angular/core';
@Pipe({name: 'myfilter'})
export class FilterPipe implements PipeTransform {
    /*   transform(items: Array<any>, category: string): Array<any> {
        return items.filter(item => item.category === category);
    }*/

      transform(items: any, filter: any): any {
      if (filter && Array.isArray(items)) {
          let filterKeys = Object.keys(filter);
          return items.filter(item =>
              filterKeys.reduce((memo, keyName) =>
                  (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "", true));
      } else {
          return items;
      }
    }

  
}
