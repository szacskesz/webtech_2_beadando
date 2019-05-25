import React from 'react';
import ReactDOM from 'react-dom';
import { CustomerMainPage } from '../../../components/customer/CustomerMainPage';

it('CustomerMainPage renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CustomerMainPage
      customerData={{name: "", email: "", address: ""}}
      ownOrders={[]}
      isOwnOrdersFetching={false}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
