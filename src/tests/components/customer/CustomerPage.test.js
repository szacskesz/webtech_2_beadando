import React from 'react';
import ReactDOM from 'react-dom';
import { CustomerPage } from '../../../components/customer/CustomerPage';

it('CustomerPage renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomerPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
