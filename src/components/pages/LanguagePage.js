import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import * as userActions from '../../actions/userActions';
import { Link } from 'react-router';
import TerminalHeader from '../common/TerminalHeader';
import OptionsSelector from '../common/OptionsSelector';
import toastr from 'toastr';
import translate from 'counterpart';


class LanguagePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.selectLanguage = this.selectLanguage.bind(this);
    }

    selectLanguage(lang, event){
        event.preventDefault();
        translate.registerTranslations('cs', require('../../languages/cs.json'));     //singleton
        translate.registerTranslations('en', require('../../languages/en.json'));

        this.props.actions.selectLanguageAction(lang);
        //counterpart.setLocale('cs');
        this.context.router.push('home');
    }

    render() {
        let class_name = 'btn btn-info btn-huge';
        return (

            <div className="table text-center">
                <div className="text-center">
                    <h2>Jazyk / Language</h2>
                </div>

                <div className="button_wrapper">
                    <button className={class_name} onClick={this.selectLanguage.bind(this, 'cs')}>
                         <img src="/terminal/static/images/cs.png" />
                    </button>
                </div>
                <div className="button_wrapper">
                    <button className={class_name} onClick={this.selectLanguage.bind(this, 'en')}>
                         <img src="/terminal/static/images/en.png" />
                    </button>
                </div>
            </div>

        );
    }
}

LanguagePage.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

LanguagePage.contextTypes = {
    router: PropTypes.object
};

//export default HomePage;
function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {

        actions: bindActionCreators(Object.assign({}, loginActions, userActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePage);