import { Component, OnInit } from '@angular/core';
import { Subscription, observable, interval } from 'rxjs';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  charges: any[];
  revenus: any[];
  reste: number = 0;
  sub: Subscription = new Subscription;

  constructor(private budget: BudgetService) {}

  ngOnInit(){
    this.charges = this.budget.charges;
    this.revenus = this.budget.revenus;
    this.budget.calculReste();
    this.reste = this.budget.reste;
    const test= interval(1000);
    this.sub=test.subscribe(
      (osef) => {this.reste = this.budget.reste;},
      (error) => {console.warn(error)},
      ()=>{console.log("A plus");}
    );
  }
}
