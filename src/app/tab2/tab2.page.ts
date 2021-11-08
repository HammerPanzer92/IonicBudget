import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  //Permet de gérer quelle partie de la page on montre
  addRev: boolean = false;

  revenus: any[];

  constructor(private budget: BudgetService) {   
  }

  ngOnInit(){
    this.revenus = this.budget.revenus;
  }

  /**
   * Mets addRev sur true
   */
  modifAddRev(){
    this.addRev = true;
  }

  /**
   * Ajoute un nouveau revenu dans le tableau
   * @param f Le ngForm
   */
  ajoutRevenu(f: NgForm){
    let newRevenu = {nom: f.value.intitule,montant: f.value.montant};
    this.budget.addRevenu(newRevenu);
    f.resetForm();
    this.addRev = false;
  }

  /**
   * Supprime un revenu du tableau
   * @param index index du revenu a supprimer
   */
  supRevenu(index:number){
    this.budget.supRevenu(index);
  }
}
