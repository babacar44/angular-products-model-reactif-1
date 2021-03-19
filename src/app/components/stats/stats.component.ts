import { Component, OnInit } from '@angular/core';
import {EventDriverService} from '../../services/event-driver.service';
import {ActionEvent} from '../../state/product.state';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  counter = 0;
  constructor(private eventDriven: EventDriverService) { }

  ngOnInit(): void {
    this.eventDriven.sourceEventSubjectObservable$.subscribe((actionEvent: ActionEvent) =>{
      ++this.counter;
    });
  }

}
