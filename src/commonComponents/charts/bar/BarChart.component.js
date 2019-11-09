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
    const {
      data,
      config: { type, title, label, barColor, yAxesTicks, categories },
    } = this.props;

    this.myChart = new Chart(this.canvasRef.current, {
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
        labels: categories.map(category => `${category[0]} - ${category[1]}`),
        datasets: [
          {
            label: label,
            order: 2,
            data: categories.map(
              category => data.filter(item => item.value >= category[0] && item.value <= category[1]).length
            ),
            backgroundColor: barColor,
            minBarLength: 1,
          },
        ],
      },
    });
  };

  updateChart = () => {
    const {
      config: { categories },
      data,
    } = this.props;

    this.myChart.data.datasets[0].data = categories.map(
      category => data.filter(item => item.value >= category[0] && item.value <= category[1]).length
    );
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
