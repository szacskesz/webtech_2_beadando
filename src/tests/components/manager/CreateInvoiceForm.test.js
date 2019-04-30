import React from 'react';
import ReactDOM from 'react-dom';
import { CreateInvoiceForm } from '../../../components/manager/CreateInvoiceForm';

it('CreateInvoiceForm renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateInvoiceForm createInvoiceCallback={ () => undefined } />, div);
  ReactDOM.unmountComponentAtNode(div);
});
