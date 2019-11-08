import React, { Component } from 'react';
import Chart from 'chart.js';
import styled from 'styled-components';

const ChartWrapper = styled.div`
  width: 90%;
  height: 400px;
  margin-bottom: 30px;
  @media (min-width: 860px) {
    width: 45%;
  }
`;

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  createChart = () => {
    const { title, data, color } = this.props;

    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      options: {
        title: {
          display: true,
          text: title,
          fontSize: 20,
          fontColor: 'white',
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'second',
                displayFormats: {
                  second: 'mm:ss a',
                },
                stacked: true,
              },
              gridLines: {
                color: 'rgb(91, 91, 91)',
                zeroLineColor: 'rgb(91, 91, 91)',
              },
              ticks: {
                fontColor: 'white',
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: 'rgb(91, 91, 91)',
                zeroLineColor: 'rgb(91, 91, 91)',
              },
              ticks: {
                min: -100,
                max: 100,
                fontColor: 'white',
              },
            },
          ],
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'rgb(255, 99, 132)',
          },
        },
      },
      data: {
        labels: data.map(d => d.timestamp),
        datasets: [
          {
            label: 'Number values',
            data: data.map(d => d.value),
            fill: 'none',
            backgroundColor: color,
            pointRadius: 3,
            borderColor: color,
            borderWidth: 1,
            lineTension: 0,
          },
        ],
      },
    });
  };

  updateChart = () => {
    const { data } = this.props;

    this.myChart.data.labels = data.map(d => d.timestamp);
    this.myChart.data.datasets[0].data = data.map(d => d.value);
    this.myChart.options.scales.xAxes[0].time.unit = data.length < 10 ? 'second' : 'minute';
    this.myChart.update();
  };

  render() {
    return (
      <ChartWrapper>
        <canvas ref={this.chartRef} />
      </ChartWrapper>
    );
  }
}

export default LineChart;
