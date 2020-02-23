import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-display-temp',
  templateUrl: './display-temp.component.html',
  styleUrls: ['./display-temp.component.css']
})
export class DisplayTempComponent implements OnInit {
  tempValue: string;

  constructor(private calculatorMachine: CalculatorService) { 
    this.calculatorMachine.tempValueObs.subscribe(value =>{
      this.tempValue = value;
      console.log('tempValue in display temp : ', this.tempValue);
    })
  }

  ngOnInit() {
    this.tempValue = this.calculatorMachine.getTempValue();
    console.log('tempValue in display temp init: ', this.tempValue);

  }

}
