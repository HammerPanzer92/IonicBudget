import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, observable, interval } from 'rxjs';
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
  sub: Subscription = new Subscription;

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

  ionViewDidEnter() {
    this.createChart();
    console.log("coucou")
  }

  createChart(){
    this.chart = new Chart(this.chartHTML.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Charges', 'Revenus', "Reste"],
        datasets: [{
          label: '# of Votes',
          data: [this.total[0], this.total[1], this.total[2]],
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
        responsive: true
      }
    });
    }
  
}