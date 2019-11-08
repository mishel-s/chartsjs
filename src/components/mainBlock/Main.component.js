import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';

import LineChart from '../../commonComponents/charts/line/LineChart.component';
import BarChart from '../../commonComponents/charts/bar/BarChart.component';

import socketRoutes from '../../config/socketRoutes';

const MainWrapper = styled.main`
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 0;
  @media (min-width: 860px) {
    padding: 0;
  }
`;

const ChartsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media (min-width: 860px) {
    flex-direction: row;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;

  &:hover {
    &:before {
      position: absolute;
      top: 70px;
      background-color: #464646;
      font-size: 14px;
      width: 200px;
      content: 'You can enter number and see in the notification all of the payloaded values, that greater then entered!';
      color: white;
      z-index: 1;
      border-radius: 5px;
    }
  }

  @media (min-width: 860px) {
    &:hover {
      &:before {
        top: 50px;
      }
    }
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;

  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: white;

  @media (min-width: 860px) {
    flex-direction: row;
  }
`;

const Input = styled.input`
  margin: 10px;
`;

class MainBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      threshold: '',
    };
    this.socket = socketIOClient(socketRoutes().randomNumbers);
  }
  componentDidMount() {
    const { socket } = this;
    socket.on('data', data => this.setState({ ...this.state, response: [...this.state.response, data] }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.response.length !== this.state.response.length) {
      const { showNotification } = this.props;
      const { response, threshold } = this.state;
      if (threshold && +response.length > 0 && response[response.length - 1].value > +threshold) {
        showNotification({
          message: `The payloaded value is ${response[response.length - 1].value.toFixed(2)}`,
          type: 'info',
        });
      }
    }
  }

  componentWillUnmount() {
    const { socket } = this;
    socket.close();
  }

  handleCangeInput = ({ target: { name, value } }) => {
    let regExpNumbers = /^$|^-?[\d]*$|^-?[\d]+[.][\d]{0,2}$/;

    name === 'threshold' &&
      regExpNumbers.test(value) &&
      this.setState(() => ({
        [name]: value,
      }));
  };

  render() {
    const { threshold } = this.state;
    return (
      <MainWrapper>
        <ChartsWrapper>
          <LineChart data={this.state.response && this.state.response} title={'A line chart'} color="#70CAD1" />
          <BarChart
            data={this.state.response && this.state.response}
            title={'A bar chart'}
            barColor="#70CAD1"
            backgroundColor="#202020"
          />
        </ChartsWrapper>
        <InputWrapper>
          <Label>
            Enter threshold: <Input type="text" value={threshold} name={'threshold'} onChange={this.handleCangeInput} />
          </Label>
        </InputWrapper>
      </MainWrapper>
    );
  }
}

export default MainBlock;
