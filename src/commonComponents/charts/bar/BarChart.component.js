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

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  createChart = () => {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'bar',
      options: {
        title: {
          display: true,
          text: this.props.title,
          fontSize: 20,
          fontColor: 'white',
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgb(91, 91, 91)',
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
                min: 0,
                max: 10,
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
        labels: [
          '-100 - -81',
          '-80 - -61',
          '-60 - -41',
          '-40 - -21',
          '-20 - -1',
          '0 - 20',
          '21 - 40',
          '41 - 60',
          '61 - 80',
          '81 - 100',
        ],
        datasets: [
          {
            label: 'The amount of numbers',
            order: 2,
            data: [
              this.props.data.filter(item => item.value >= -100 && item.value < -80).length,
              this.props.data.filter(item => item.value >= -80 && item.value < -60).length,
              this.props.data.filter(item => item.value >= -60 && item.value < -40).length,
              this.props.data.filter(item => item.value >= -40 && item.value < -20).length,
              this.props.data.filter(item => item.value >= -20 && item.value < 0).length,
              this.props.data.filter(item => item.value >= 0 && item.value < 21).length,
              this.props.data.filter(item => item.value >= 21 && item.value < 41).length,
              this.props.data.filter(item => item.value >= 41 && item.value < 61).length,
              this.props.data.filter(item => item.value >= 61 && item.value < 81).length,
              this.props.data.filter(item => item.value >= 81 && item.value < 101).length,
            ],
            backgroundColor: this.props.barColor,
            minBarLength: 1,
          },
        ],
      },
    });
  };

  updateChart = () => {
    this.myChart.data.datasets[0].data = [
      this.props.data.filter(item => item.value >= -100 && item.value < -80).length,
      this.props.data.filter(item => item.value >= -80 && item.value < -60).length,
      this.props.data.filter(item => item.value >= -60 && item.value < -40).length,
      this.props.data.filter(item => item.value >= -40 && item.value < -20).length,
      this.props.data.filter(item => item.value >= -20 && item.value < 0).length,
      this.props.data.filter(item => item.value >= 0 && item.value < 21).length,
      this.props.data.filter(item => item.value >= 21 && item.value < 41).length,
      this.props.data.filter(item => item.value >= 41 && item.value < 61).length,
      this.props.data.filter(item => item.value >= 61 && item.value < 81).length,
      this.props.data.filter(item => item.value >= 81 && item.value < 101).length,
    ];
    const { max } = this.myChart.options.scales.yAxes[0].ticks;
    this.myChart.data.datasets[0].data.some(number => number >= max) &&
      (this.myChart.options.scales.yAxes[0].ticks.max += 10);
    this.myChart.update();
  };

  render() {
    return (
      <ChartWrapper>
        <canvas ref={this.canvasRef} />
      </ChartWrapper>
    );
  }
}

export default BarChart;
