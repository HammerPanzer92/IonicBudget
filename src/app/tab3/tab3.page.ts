import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
//Cette classe fait la même chose que Tab2, mais avec les charges
export class Tab3Page {
  addCharge: boolean = false;

  charges: any[];

  constructor(private budget: BudgetService) {   
  }

  ngOnInit(){
    this.charges = this.budget.charges;
  }

  modifAddCharge(){
    this.addCharge = true;
  }

  ajoutCharge(f: NgForm){
    let newCharge = {nom: f.value.intitule,montant: f.value.montant};
    this.budget.addCharge(newCharge);
    f.resetForm();
    this.addCharge = false;
  }

  supCharge(index:number){
    this.budget.supCharge(index);
  }
}
