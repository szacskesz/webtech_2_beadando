import React from 'react';
import ReactDOM from 'react-dom';
import { CustomerCreateOrderForm } from '../../../components/customer/CustomerCreateOrderForm';

it('CustomerCreateOrderForm renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomerCreateOrderForm customerData={{name: "", email: "", address: ""}} isOwnOrdersFetching={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
