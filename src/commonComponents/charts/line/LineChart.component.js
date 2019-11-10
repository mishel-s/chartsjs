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

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      this.updateChart();
    }
  }

  createChart = () => {
    const {
      data,
      config: { type, title, label, barColor, yAxesTicks },
    } = this.props;

    this.myChart = new Chart(this.chartRef.current, {
      type: type,
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
                min: yAxesTicks.min,
                max: yAxesTicks.max,
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
            label: label,
            data: data.map(d => d.value),
            fill: 'none',
            backgroundColor: barColor,
            pointRadius: 3,
            borderColor: barColor,
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
