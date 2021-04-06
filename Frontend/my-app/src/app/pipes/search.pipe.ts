import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg.trim().length < 3) return value;
    const resultUser = [];
    for(const user of value){
      if(user.Name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultUser.push(user);
      }
    }
    return resultUser;
  }

}
