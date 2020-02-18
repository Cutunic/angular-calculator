import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {

  @Input() key:string;
  
  constructor() { }

  ngOnInit() {
    console.log('in key :',this.key)
  }

}
