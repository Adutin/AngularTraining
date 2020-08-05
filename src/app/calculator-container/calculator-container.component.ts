import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-calculator-event',
  template: `
    <div>
      <h2>Event calculator</h2>
      <input id="figure1" (keyup)="calculate($event)" type="number" [value]="figure1" />
      +
      <input id="figure2" (keyup)="calculate($event)" (click)="calculate($event)" type="number" [value]="figure2" />
      =
      {{result}}
    </div>
    `,
  styleUrls: ['./calculator-container.component.css']
})
export class CalculatorEvent implements OnInit {
  @Input() figure1: number = 0;
  @Input() figure2: number = 0;
  @Output() figure1Change: EventEmitter<number> = new EventEmitter();
  @Output() figure2Change: EventEmitter<number> = new EventEmitter();

  @Output() resultChange: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.resultChange.emit(this.result);
  }

  calculate(ev) {
    this[ev.target.id] = Number(ev.target.value);

    this[ev.target.id+'Change'].emit(this[ev.target.id]);
    this.resultChange.emit(this.result);
  }

  get result() {
    return this.figure1 + this.figure2;
  }

  constructor(){}
}

@Component({
  selector: 'app-calculator-effective',
  template: `
    <div>
      <h2>Effective calculator</h2>
      <input type="number" [(ngModel)]="figure1" />
      +
      <input type="number" [(ngModel)]="figure2" />
      =
      {{figure1 + figure2}}
    </div>
    `,
  styleUrls: ['./calculator-container.component.css']
})
export class CalculatorEffective {
  @Input('fig1') figure1: number = 0;
  @Input('fig2') figure2: number = 0;

  constructor(){}
}

@Component({
  selector:'app-calculator-ref',
  template:`
    <div>
      <h2>Ref calculator</h2>  
      <input #fig1/>
      +
      <input #fig2/>
      <input type="button" (click)="calculate()" value="=" />
      <span #res [innerHTML]="result">Tulos</span>
    </div>`
})
export class CalculatorRefComponent{
  @ViewChild("fig1",{static:true}) fig1: ElementRef;
  @ViewChild("fig2",{static:true}) fig2: ElementRef;
  @ViewChild("res",{static:true}) res: ElementRef;
  result:number=0

  calculate(){
      let f1=Number(this.fig1.nativeElement.value);
      let f2=Number(this.fig2.nativeElement.value);
      this.result=f1+f2;
  }
}


@Component({
  selector: 'app-calculator-container',
  template: `
    <h1>Calculator container</h1>
    <app-calculator-effective [fig1]="6" [fig2]="7"></app-calculator-effective>
    <hr />
    <app-calculator-event [(figure1)]="f1" [(figure2)]="f2" (resultChange)="fr=$event"></app-calculator-event>
    {{f1}} + {{f2}} = {{fr}}
    <hr />
    <app-calculator-ref></app-calculator-ref>
    `,
  styleUrls: ['./calculator-container.component.css']
})
export class CalculatorContainerComponent implements OnInit {
  f1: number = 1;
  f2: number = 2;
  fr: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
