import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';


@Component({
  selector: 'app-display-history',
  templateUrl: './display-history.component.html',
  styleUrls: ['./display-history.component.css']
})
export class DisplayHistoryComponent implements OnInit {
  equation: string;

  constructor(private calculatorService: CalculatorService) { 
    this.calculatorService.equationObs.subscribe(value=>{
      let equationArr = (value.map(value=> value));
      this.equation = equationArr.join('');
    })
  }

  ngOnInit() {
  }

}
