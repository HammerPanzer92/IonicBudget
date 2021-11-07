import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BudgetService {

  charges: any[] = [{nom: "Cacahuétes",montant:25},{nom:"Offrande a Gaben",montant:100}];
  revenus: any[] = [{nom: "Pistache", montant:30},{nom: "Vente de Krabby Patty",montant:500}];
  reste: number = 0;

  constructor() { }

  calculReste(){
    for(let revenu of this.revenus){
      this.reste += revenu.montant;
    }

    for(let charge of this.charges){
      this.reste -= charge.montant;
    }
  }

  addRevenu(revenu:any){
    this.revenus.push(revenu);
    this.reste += revenu.montant;
  }

  addCharge(charge:any){
    this.charges.push(charge);
    this.reste -= charge.montant;
  }

  supRevenu(index:number){
    this.reste -= this.revenus[index].montant;
    this.revenus.splice(index,1);
  }

  supCharge(index:number){
    this.reste += this.charges[index].montant;
    this.charges.splice(index,1);
  }
}
