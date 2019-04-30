import React from 'react';
import ReactDOM from 'react-dom';
import { CustomerCreateOrderForm } from '../../../components/customer/CustomerCreateOrderForm';

it('CustomerCreateOrderForm renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomerCreateOrderForm allShutterColor={[]} allShutterMaterials={[]} allShutterTypes={[]} createOrderCallback={ () => undefined } />, div);
  ReactDOM.unmountComponentAtNode(div);
});
