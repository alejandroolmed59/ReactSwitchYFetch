import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const AlertExample = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="success" isOpen={visible} toggle={onDismiss}>
      Su accion se realizó con exito :D. (Soy una etiqueta verde btw)
    </Alert>
  );
}

export default AlertExample;