import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import '../../App.css'
//import {StickyContainer, Sticky} from 'react-sticky'

const AlertExample = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert className='sticky' color={props.color} isOpen={visible} toggle={onDismiss}>
        {props.msg}
    </Alert>
  );
}

export default AlertExample;