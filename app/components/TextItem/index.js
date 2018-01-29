import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from 'components/Icon';
import PaddedContent from 'components/PaddedContent';
import { autobind } from 'core-decorators';
import "./style.less";

@autobind
export default class TextItem extends Component {
    static props = {
        label: PropTypes.string,
        content: PropTypes.string,
    };


    render() {
        const { label,content } = this.props;
        return (
            <div className="text_item">
                <div className="text_label">{label}</div>
                <div className="text_content">{content}</div>
            </div>
        )
    }
}