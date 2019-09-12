import React, { Fragment } from "react";
import { MDBBtn } from "mdbreact";

const ButtonPage = (props) => {
   
    return (
        <div  style={{textAlign:'center'}}>
            <Fragment>
                <MDBBtn onClick={()=>props.click()} className="float-none" gradient="blue">{props.bntValue}</MDBBtn>
            </Fragment>

        </div>

    );
}

export default ButtonPage;  