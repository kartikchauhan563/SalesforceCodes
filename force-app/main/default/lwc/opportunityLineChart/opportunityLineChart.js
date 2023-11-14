import {LightningElement, wire, track} from 'lwc';
import getOpportunities from '@salesforce/apex/getOpportunities.getOpportunities';
export default class OpportunityBarChart extends LightningElement {
 @track chartConfiguration;

 @wire(getOpportunities, {})
 getOpportunities({error, data}) {
  if (error) {
   this.error = error;
   console.log('error => ' + JSON.stringify(error));
   this.chartConfiguration = undefined;
  } else if (data) {
   let chartData = [];
   let chartLabels = [];
   data.forEach(opp => {
    chartData.push(opp.Amount);
    chartLabels.push(opp.Name);
   });

   this.chartConfiguration = {
    type: 'line',
    data: {
     labels: chartLabels,
     datasets: [
      {
       label: 'Closed Won Last Week',
       barPercentage: 0.5,
       barThickness: 6,
       maxBarThickness: 8,
       minBarLength: 2,
       backgroundColor: "green",
       data: chartData,
      },
     ],
    },
    options: {
    },
   };
   console.log('data => ', data);
   this.error = undefined;
  }
 }
}