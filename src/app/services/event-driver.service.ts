import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {ActionEvent} from '../state/product.state';

@Injectable({
  providedIn: 'root'
})
export class EventDriverService {
  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>(); /* subject pour faire la communication entre les composants
                                                                            et on y cree un publisher d'event ActionEvent
                                                                          */
  sourceEventSubjectObservable$ = this.sourceEventSubject.asObservable(); // on cree un observable

  sourceEventSubject2: Subject<ActionEvent> = new Subject<ActionEvent>();
  sourceEventSubjectObservable2$ = this.sourceEventSubject.asObservable();
  constructor() { }

  // tslint:disable-next-line:typedef
   publishEvent(event: ActionEvent){
      this.sourceEventSubject.next(event); // publieur d event ici le message c'est actionEvent
    }

}
