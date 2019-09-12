import React from "react";
import Button from '../Buttons/Buttons'

const FormPage = (props) => {
  return (
   
          <form center >
              <MDBInput
                label={props.label}
                icon={props.icon}
                group
                type={props.type}
                validate
                error="wrong"
                success="right"
              />
        
          </form>
  
  );
};

export default FormPage;