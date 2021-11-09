import { Component, OnInit, ViewChild } from '@angular/core';
import { BudgetService } from '../budget.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  //Ces variables servent a pouvoir créé le graphique
  @ViewChild("chart") chartHTML;
  chart: any;

  charges: any[];
  revenus: any[];
  total: number[];

  totalCharges: number = 0;
  totalRevenus: number = 0;

  constructor(private budget: BudgetService) { }

  ngOnInit() {
    this.charges = this.budget.charges;
    this.revenus = this.budget.revenus;
    this.budget.calculReste();
    this.total = this.budget.total;

    for(let charge of this.charges){
      this.totalCharges += charge.montant;
    }

    for(let revenu of this.revenus){
      this.totalRevenus += revenu.montant;
    }
  }

  //Quand la vue est affiché (cf https://ionicframework.com/docs/angular/lifecycle )
  ionViewDidEnter() {
    //On créé le graphique
    this.createChart();
  }

  //Pareil quand elle s'efface
  ionViewDidLeave(){
    //On détruis le graphique pour le redessiné après
    this.chart.destroy();
  }

  /**
   * Créé la charte graphique
   */
  createChart(){
    //On passe d'abord l'élément HTML
    this.chart = new Chart(this.chartHTML.nativeElement, {
      //Puis on précise le type (cf https://www.chartjs.org/docs/latest )
      type: 'pie',
      data: {
        //On précise ensuite les noms des champs
        labels: ['Charges', 'Revenus', "Reste"],
        datasets: [{
          //Les valeurs
          data: [this.total[0], this.total[1], this.total[2]],
          //Leurs couleurs de fond
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB'
          ]
        }]
      }, options:{
        responsive: true,
        maintainAspectRatio: true
      }
    });
    }  
}