import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  addRev: boolean = false;

  revenus: any[];

  constructor(private budget: BudgetService) {   
  }

  ngOnInit(){
    this.revenus = this.budget.revenus;
  }

  modifAddRev(){
    this.addRev = true;
  }

  ajoutRevenu(f: NgForm){
    let newRevenu = {nom: f.value.intitule,montant: f.value.montant};
    this.budget.addRevenu(newRevenu);
    f.resetForm();
    this.addRev = false;
  }

  supRevenu(index:number){
    this.budget.supRevenu(index);
  }
}
