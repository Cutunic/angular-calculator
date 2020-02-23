import { Component, OnInit, Input } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {
  @Input() key:string;

  constructor(private calulatorService: CalculatorService) { }

  ngOnInit() {
  }

  onClick(){
    this.calulatorService.keyClicked(this.key);
  }
}
