import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent implements OnInit {
  keys: object[];

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit() {
    this.keys = this.calculatorService.getKeys();
    console.log('key  variable in keypad :',this.keys)

  }

}
