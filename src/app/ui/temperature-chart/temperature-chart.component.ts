import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { ObservationService } from '../../services/observation.service';

/*
Temperature chart with multiple datasets and an interactive legend that
provides toggling datasets on/off.
 */
@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
})
export class TemperatureChartComponent {
  chart: any = [];
  observations;

  constructor(private observationService: ObservationService) { }

  ngAfterViewInit() {
    // Fetch data and call chart creating functions
    this.observationService.getAllGrouped()
      .subscribe((locations: any) => {
        let datasets = [];

        locations.forEach((location, i) => {
          datasets.push(this.createDataset(location, i));
        });

        this.chart = this.createChart(datasets);
        this.adjustRangeAndUpdate();
      });
  }

  createChart(datasets) {
    return new Chart('canvas',
      {
        type: 'scatter',
        data: { datasets: datasets },
        options: this.chartOptions() ,
      }
    );
  }

  createDataset(location, datasetIndex) {
    let temperatures = location.temperatures.map(t => t.temperature);
    let dates = location.dates.map(d => d.date);
    let data = [];

    temperatures.forEach((temperature, i) => {
      data.push({ x: dates[i], y: temperature });
    });

    let dataset = {
      label: location._id,
      data: data,
      showLine: true,
      fill: false,
      borderColor: this.getColor(datasetIndex),
      pointRadius: 0,
      pointHitRadius: 3,
    };

    return dataset;
  }

  // Get a "theme color" based on index (no upper limit, will re-use colors)
  getColor(index: number) {
    let themeColors = [
      '#3fce3a',
      '#ff6e30',
      '#618eff',
      '#c740ff',
      '#ff448b',
    ];

    while (index > themeColors.length) {
      index -= themeColors.length;
    }

    return themeColors[index];
  }

  // Toggle data series on/off
  toggleDataVisibility(seriesIndex) {
    if (this.chart.data.datasets[seriesIndex].showLine) {
      this.chart.data.datasets[seriesIndex].showLine = false;
      this.chart.data.datasets[seriesIndex].pointHitRadius = 0;
    } else {
      this.chart.data.datasets[seriesIndex].showLine = true;
      this.chart.data.datasets[seriesIndex].pointHitRadius = 3;
    }

    this.adjustRangeAndUpdate();
  }

  // Legend filter button styles for visible and hidden states
  setStyle(seriesIndex) {
    let color = this.getColor(seriesIndex);
    let visible = {
      'background-color': color,
      'border-color': color,
      'color': '#fff',
    };
    let hidden = {
      'background-color': '#fff',
      'border-color': '#a1a1a1',
      'color': '#a1a1a1',
    };

    return this.chart.data.datasets[seriesIndex].showLine ? visible : hidden;
  }

  // Adjust Y axis range to show all data comfortably
  adjustRangeAndUpdate() {
    // Find min & max values in visible datasets
    let yValues = [];
    this.chart.data.datasets.forEach(dataset => {
      if (dataset.showLine) {
        let newValues = dataset.data.map(point => point.y);
        yValues = yValues.concat(newValues);
      }
    });

    // Ensure ample spacing (chart.js may hide some data by setting too tight min/max values)
    this.chart.options.scales.yAxes[0].ticks.min = Math.round(Math.min(...yValues) / 10) * 10 - 10;
    this.chart.options.scales.yAxes[0].ticks.max = Math.round(Math.max(...yValues) / 10) * 10 + 10;

    this.chart.update();
  }

  chartOptions() {
    let options = {
      legend: { display: false },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            min: new Date(new Date().setDate(new Date().getDate() - 3)),
            max: new Date(),
            displayFormats: { hour: 'Do MMM HH:mm' },
          },
          ticks: {
            fontSize: 11,
            minRotation: 30,
            padding: 5,
          },
        }],
        yAxes: [{
          ticks: {
            stepSize: 10,
            padding: 5,
          },
          scaleLabel: {
            display: true,
            labelString: 'Temperature (°C)',
            fontSize: 11,
          },
        }],
      },
      tooltips: {
        custom: (tooltip) => {
          tooltip.displayColors = false;
        },
        callbacks: {
          title: (point) => {
            return Number(point[0].yLabel).toFixed(1) + ' °C';
          },
          beforeLabel: () => { },
          label: (point, data) => {
            let location = data.datasets[point.datasetIndex].label;
            let date = new Date(point.xLabel);
            return [location, date.toLocaleDateString()];
          },
        },
      },
    };

    return options;
  }
}
