import React, { Component } from 'react';
import './App.css';


const ranges = ['<8','8-8.4','8.5-8.9','9.0-9.4','9.5-9.9','10.0-10.4','10.5-10.9','11.0-11.4','11.5-11.9','12.0-12.4', '>12.5'];
const data = {
  0: {0: 'n/a',1: '+40%', 2: '+30%', 3: 'Igual', 4: '-10%', 5: '-20%', 6: '-25%', 7: '-25%', 8: '-25%', 9: '-50%', 10: '-50%'},
  1: {0: 'n/a',1: '+40%', 2: '+30%', 3: '+20%', 4: 'Igual', 5: '-10%', 6: '-20%', 7: '-25%', 8: '-25%', 9: '-50%', 10: '-50%'},
  2: {0: 'n/a',1: '+50%', 2: '+40%', 3: '+20%', 4: '+10%', 5: 'Igual', 6: '-10%', 7: '-20%', 8: '-25%', 9: '-50%', 10: '-50%'},
  3: {0: 'n/a',1: '+50%', 2: '+40%', 3: '+30%', 4: '+10%', 5: 'Igual', 6: '-10%', 7: '-10%', 8: '-30%', 9: '-50%', 10: '-50%'},
  4: {0: 'n/a',1: '+60%', 2: '+50%', 3: '+30%', 4: '+20%', 5: '+5%', 6: 'Igual', 7: '-5%', 8: '-20%', 9: '-30%', 10: '-50%'},
  5: {0: 'n/a',1: '+60%', 2: '+50%', 3: '+40%', 4: '+20%', 5: '+5%', 6: 'Igual', 7: 'Igual', 8: '-20%', 9: '-20%', 10: '-50%'},
  6: {0: 'n/a',1: '+70%', 2: '+60%', 3: '+40%', 4: '+30%', 5: '+10%', 6: 'Igual', 7: 'Igual', 8: '-10%', 9: '-20%', 10: '-50%'},
  7: {0: 'n/a',1: '+70%', 2: '+60%', 3: '+50%', 4: '+30%', 5: '+10%', 6: '+5%', 7: 'Igual', 8: '-5%', 9: '-10%', 10: '-50%'},
  8: {0: 'n/a',1: '+80%', 2: '+70%', 3: '+50%', 4: '+40%', 5: '+20%', 6: '+10%', 7: '+5%', 8: 'Igual', 9: '-10%', 10: '-50%'},
  9: {0: 'n/a',1: '+90%', 2: '+80%', 3: '+70%', 4: '+40%', 5: '+20%', 6: '+10%', 7: '+5%', 8: 'Igual', 9: '-5%', 10: '-50%'},
  10: {0: 'n/a',1: '+100%', 2: '+90%', 3: '+60%', 4: '+50%', 5: '+30%', 6: '+20%', 7: '+10%', 8: '+5%', 9: '-5%', 10: '-50%'},
  };


class App extends Component {

  state = {
      actual: 0,
      prev: 0,
      dose: 0,
      newDose: 0,
      increment: '',
      valid: false,
    };

  onPrevSelected = (event) => {
    this.setState({
      prev: event.target.value
    });
  }

  onActualSelected(event){
    this.setState({
      actual: event.target.value
    });
  }

  onDoseSelected(event){
    this.setState({
      dose: event.target.value
    });
  }

  calculateNewDose(){
    const {
      actual,
      prev,
      dose
    } = this.state;

    if(dose <= 0){
      this.setState({
        valid: false,
      });
      return true;
    }

    this.setState({
      valid: true,
      increment: data[prev][actual],
    });
  }

  render() {

    const {
      actual,
      prev,
      dose,
      valid,
      increment
    } = this.state;

    return (
      <main className="app" >
        <h1>Manejo de Hemoglobina</h1>
        <section className="app-form-container">
          <form className="app-form" action="" onSubmit={(e) => {e.preventDefault()}}>
            <div className="app-form-input-block">
              <label className="app-label" htmlFor="">Hemoglobina Previa (mes anterior)</label>
              <select value={prev} onChange={(e) => {this.onPrevSelected(e)}}>
                {ranges.map((label, index) => (<option value={index} key={index}>{label}</option>))}
              </select>
            </div>
            <div  className="app-form-input-block">
              <label className="app-label" htmlFor="">Hemoglobina Actual</label>
              <select value={actual} onChange={(e) => this.onActualSelected(e)}>
                {ranges.map((label, index) => (<option value={index} key={index}>{label}</option>))}
              </select>
            </div>
            <div className="app-form-input-block">
              <label className="app-label" htmlFor="">Dosis eritropoyetina(unidades/semana)</label>
             <input value={dose} onChange={(e) => this.onDoseSelected(e)} type="number"/>
            </div>
            <div className="app-form-button-block">
              <button className="app-button" onClick={() => this.calculateNewDose()}>Calcular</button>
            </div>
          </form>
        {valid &&
          <section>
            <h5>Modificación de dosis eritropoyetina</h5>
            {increment}
          </section>}
        </section>
      </main>
    );
  }

}

export default App;
