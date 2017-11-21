import { Injectable } from '@angular/core';
import {Validators} from '@angular/forms';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.email === undefined || user.username === undefined || user.password === undefined || user.agb === undefined){
      return false;
    } else {
      return true;
    }
  }
}
