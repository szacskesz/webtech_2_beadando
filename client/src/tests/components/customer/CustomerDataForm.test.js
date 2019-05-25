import React from 'react';
import ReactDOM from 'react-dom';
import { CustomerDataForm } from '../../../components/customer/CustomerDataForm';

it('CustomerDataForm renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomerDataForm isOwnOrdersFetching={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
