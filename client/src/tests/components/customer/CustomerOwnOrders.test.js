import React from 'react';
import ReactDOM from 'react-dom';
import { CustomerOwnOrders } from '../../../components/customer/CustomerOwnOrders';

it('CustomerOwnOrders renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomerOwnOrders customerData={{name: "", email: "", address: ""}} ownOrders={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
