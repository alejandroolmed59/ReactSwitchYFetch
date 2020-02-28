import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const CreateForm = (props) => {
  const { title, text, image, submitHandler, changeHandler } = props;
  return (
    <Form inline >
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="text" className="mr-sm-2">Titulo</Label>
        <Input type="text" name="title" id="title" placeholder="" value={title} onChange={changeHandler}/>
      </FormGroup>
      {' '}
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="text" className="mr-sm-2">¿Que estas pensando?</Label>
        <Input type="text" name="text" id="text" placeholder="" value={text} onChange={changeHandler}/>
      </FormGroup>
      {' '}
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="image" className="mr-sm-2">Link a la imagen</Label>
        <Input type="text" name="image" id="image" placeholder="" value={image} onChange={changeHandler}/>
      </FormGroup>
      {' '}
      <Button onClick={submitHandler}>Submit</Button>
    </Form>
  );
}

export default CreateForm;