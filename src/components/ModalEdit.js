import React from 'react';
import ReactDOM from 'react-dom';

const ModalEdit = props => {

        return ReactDOM.createPortal(
            <div className={props.className} >
                <div className="ui small basic modal visible active" >
                    <div className="content">
                        {props.input}
                    </div>
                <div className="actions">
                {props.actions}
                </div>
                </div>
            </div>, document.querySelector('#modal')       
        );
};


export default ModalEdit;