import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import JafAppBar from './Appbar';
import { Provider } from 'react-redux';
import store from './store/index.js';
import { listenToAuth } from './actions/auth';
import { listenToJobs } from './actions/jobs';
import './App.css';
import Feedback from './feedback';
import JobsTable from './JobsTable.js';

class App extends Component {
  componentWillMount() {
    store.dispatch(listenToAuth());
    store.dispatch(listenToJobs());
  }
  render() {
    const egCompanies = 'Faceboock,Rad,Verint,IBM';
    const data = [{
      title: 'Senior Developer',
      location: 'תל אביב',
    }, {
      title: 'איש תמיכה למוקד שירות',
      location: 'תל קיבוץ אילות',
    }];
    return (
      <Provider store={store}>
        <div className="App">
          <JafAppBar setLocale={this.props.setLocale} sLocale={this.props.sLocale} />
          <div style={{ width: '80%', margin: 'auto' }}>
            <p className="App-intro">
              <FormattedMessage
                id="intro"
                defaultMessage={'Here you can find a list of available job opportunities in leading high-tech companies such as {egCompanies}, that prioritize experienced employees.'}
                values={{ egCompanies: <b dir="rtl">{egCompanies}</b> }}
              />
            </p>
            <JobsTable data={data} />
          </div>
          <Feedback />

        </div>
      </Provider>
    );
  }
}

export default App;
