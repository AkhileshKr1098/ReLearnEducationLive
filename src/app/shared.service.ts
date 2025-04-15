import { Injectable } from '@angular/core';
import { flush } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  base_url = new BehaviorSubject<string>('')
  base_url_audio = new BehaviorSubject<string>('')
  base_url_icon = new BehaviorSubject<string>('')
  base_url_answer = new BehaviorSubject<string>('')

  CurrentQuestionStatus = new BehaviorSubject<boolean>(false)

}
