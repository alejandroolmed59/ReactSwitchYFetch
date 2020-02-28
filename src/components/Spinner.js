import React from 'react';
import { Spinner } from 'reactstrap';

const Spinnner = (props) => {
  return (
    <div>
      <Spinner style={{ width: '5rem', height: '5rem' }} color="primary" />
      <Spinner style={{ width: '5rem', height: '5rem' }} type="grow" color="secondary" />
      <Spinner style={{ width: '5rem', height: '5rem' }} color="success" />
      <Spinner style={{ width: '5rem', height: '5rem' }} type="grow" color="danger" />
      <Spinner style={{ width: '5rem', height: '5rem' }}  color="warning" />
      <Spinner style={{ width: '5rem', height: '5rem' }} type="grow" color="info" />
      <Spinner style={{ width: '5rem', height: '5rem' }}  color="dark" />
    </div>
  );
}

export default Spinnner;
