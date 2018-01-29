import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { startLoading,stopLoading } from 'components/App/actions';
import Store from '../../store';
import { protocolTransfer } from 'lib/utils';
import { error } from 'components/Notifications';
export class FormSubmit extends React.Component{
    render(){
         const { action,method,data } = this.props;
         const keys = Object.keys(data);
        return (
            <div>
                <form action={action} method={method} ref="form" id="functional-submit-form">
                    {
                        keys.map( (key,idx) => {
                           return <input type="hidden"  name={key} value={data[key]} key={idx} />
                        })
                    }
                </form>
            </div>
        )
    }
}

FormSubmit.props = {
    action:PropTypes.string.require,
    method:PropTypes.string.require,
    data:PropTypes.object.require
};
FormSubmit.defaultProps = {
    method:"GET"
};

let node = document.getElementById('form-container');
if (!node) {
    node = document.createElement("div");
    node.setAttribute("id", "form-container");
    document.body.appendChild(node);
}

export const formSubmit = (param) => {
        Store.dispatch(startLoading());
        ReactDOM.render(<FormSubmit { ...param } />, node);
        document.getElementById("functional-submit-form").submit();
};