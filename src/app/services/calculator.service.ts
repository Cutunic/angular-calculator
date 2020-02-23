import { Injectable } from '@angular/core';
import * as machine from './calculator-machine.js';
import { Subject } from 'rxjs';

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

  numberReg = new RegExp(/[1234567890]/);
  signReg = new RegExp(/[*-/+]/);


  lastClicked: string;
  tempValue: string = '0';
  lastSolution: string;
  equation: string[] = [];
  dotInTemp: boolean = false;
  minusAllowed: boolean = true;

  private _tempValue: Subject<string> = new Subject;
  public tempValueObs = this._tempValue.asObservable();

  private _equation: Subject<string[]> = new Subject;
  public equationObs = this._equation.asObservable();

  constructor() {
    this._tempValue.next(this.tempValue);
    this._equation.next(this.equation);
    console.log('_tempValue in service :',this._tempValue);
  }

  getKeys(){
    return this.keys;
  }
  getTempValue(){
    return this.tempValue;
  }
  getEquation(){
    return this.equation;
  }

  keyClicked(value: string){
    // handle last clicked '=' --->>> SOLVED
    if (this.lastClicked==='='){
      if ((/^[+*\/-]$/).test(value)){
        this.tempValue = '';
        this.equation = [this.lastSolution];
        this._equation.next(this.equation);

      }
      
    }
    //------------ DELETE EVERYTHING--------->>>> SOLVED
    if (value==='AC'){
      this.tempValue = '0';
      this._tempValue.next(this.tempValue);
      this.equation = [];
      this._equation.next(this.equation);
      this.lastClicked = '';
      this.setDot(false);
      this.setMinusAllowed(true);

      console.log('delete');

    // ------------ SOLVE and HANDLE EQUATION ------------>>>> SOLVED
    } else if ((value==='=')&&(this.tempValue!='')&&(!this.signReg.test(value)&&(!(/^[+*\/-]$/).test(this.tempValue)))){
      this.setDot(false);
      this.setMinusAllowed(true);

      this.applyTempValue(value);

      // sending value not working --- s>>> SOLVED   ..... spreadOperator... reference
      this.lastSolution = machine.calculatorMachine([...this.equation]);

      console.log('equation : ',this.equation);

      this.equation.push(value);
      this._equation.next(this.equation);
      this.tempValue = this.lastSolution;
      this._tempValue.next(this.tempValue);
      

      this.lastClicked = '=';
      console.log('2. equation : ',this.equation);

      // ------------ DECIMAL NUMBERS ------------->>>> SOLVED
    } else if ((value==='.')&&(!this.dotInTemp)&&(this.lastClicked != '=')){
        if (this.tempValue===''){
          this.addToTempValue('0.');
        } else if (/^[+*\/]$/.test(this.tempValue)){
          this.applyTempValue(value);
          this.addToTempValue('0.');
        }  else if ((this.tempValue==='-')&&((/^[+*\/]$/).test(this.equation[this.equation.length-1])||(this.equation.length===0))){
          this.addToTempValue('0.');
        } else if ((this.tempValue==='-')) {
          this.applyTempValue(value);
          this.addToTempValue('0.');
        } else {
          this.addToTempValue(value);
        }

        this.lastClicked = value;
        this.setDot(true);

      // ------------ NUMBERS ------------->>>> SOLVED
    } else if(this.numberReg.test(value)&&(this.lastClicked != '=')){
      if (this.signReg.test(this.lastClicked)&&(this.lastClicked!='.')){
        if (!(/^[+*\/]$/).test(this.equation[this.equation.length-1])&&(this.equation.length!=0)){
          this.setDot(false);
          this.setMinusAllowed(true);
          
          this.applyTempValue(value);
          this.addToTempValue(value);
          console.log('proba 1.');
        } else {
          this.addToTempValue(value);  
          console.log('proba 1.1');
        }
        
      } else {
          if (this.tempValue==='0'){
            this.tempValue = '';
            console.log('handle 00000 :', 'tempValue : ',this.tempValue,'   value: ',value)
          }

        this.addToTempValue(value);
      }

      //---------------- SIGNS ------------------>>>>>>>>>> SOLVED
    } else if (this.signReg.test(value)&&(value!='.')){
        if ((this.equation.length===0)&&(this.tempValue==='0'||this.tempValue==='')){
          if ((value==='-')&&(this.minusAllowed===true)) {
            // handling first sign '-' ... and avoid inputing '' in equation -->>> SOLVED
          this.setDot(false);
          this.setMinusAllowed(false);
          
          this.tempValue = '';
          this.addToTempValue(value);
          }
        } else if (!this.signReg.test(this.lastClicked)){

          if (this.lastClicked != '='){
            this.applyTempValue(value);
          }

          this.addToTempValue(value);
          this.setDot(false);
          
        }else if ((value==='-')&&(this.signReg.test(this.lastClicked)&&(this.lastClicked!='-')&&(this.minusAllowed===true))){
          this.setDot(false);
          this.setMinusAllowed(false);

          this.applyTempValue(value);
          this.addToTempValue(value);

          console.log('minus as negative to number');
        } else if ((value==='-')&&(!this.signReg.test(this.lastClicked))&&(this.minusAllowed===true)){
          this.setDot(false);
          this.setMinusAllowed(false);

          this.applyTempValue(value);

          console.log('minus as operator');
        }
    } 
  }

  setDot(value: boolean){
    this.dotInTemp = value;
  }
  setMinusAllowed(value: boolean){
    this.minusAllowed = value;
  }
  applyTempValue(value: string){
    this.equation.push(this.tempValue);
    this._equation.next(this.equation);

    console.log('equation : ',this.equation);
    this.tempValue = '';
    this.lastClicked = value;
    this._tempValue.next(this.tempValue);
  }

  addToTempValue(value: string){
    this.tempValue = this.tempValue + value;
    this.lastClicked = value;
    this._tempValue.next(this.tempValue);
    console.log('tempValue : ',this.tempValue);
  }
}
