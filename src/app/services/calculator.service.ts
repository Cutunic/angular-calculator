import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  keys: object[] = [
    {value: 'AC', class: 'delete'},
    {value: '/', class: 'sign divide'},
    {value: '*', class: 'sign multiply'},
    {value: '-', class: 'sign minus'},
    {value: '+', class: 'sign plus'},
    {value: '=', class: 'equal'},
    {value: '7', class: 'number'},
    {value: '8', class: 'number'},
    {value: '9', class: 'number'},
    {value: '4', class: 'number'},
    {value: '5', class: 'number'},
    {value: '6', class: 'number'},
    {value: '1', class: 'number'},
    {value: '2', class: 'number'},
    {value: '3', class: 'number'},
    {value: '0', class: 'null'},
    {value: '.', class: 'sign decimal'}
  ];

  constructor() { }

  getKeys(){
    return this.keys;
  }
}
