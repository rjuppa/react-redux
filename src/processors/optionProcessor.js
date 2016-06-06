import * as UserOptions from '../constants/UserOptions';
import * as PositionStates from '../constants/PositionStates';
import * as BackendActions from '../constants/BackendActions';
import toastr from 'toastr';


class OptionProcessor {
    constructor(state, router){
        this.state = state;
        this.router = router;
        this.process_option = this.process_option.bind(this);
        this.redirectToLines = this.redirectToLines.bind(this);
        this.redirectToLine = this.redirectToLine.bind(this);
        this.gotoToLinesOrPositions = this.gotoToLinesOrPositions.bind(this);
    }

    redirectToLines() {
        this.router.push('lines');
    }

    redirectToLine(line_id) {
        this.router.push('line/' + line_id);
    }

    redirectToOnSuccess() {
        this.router.push('onsuccess');
    }

    redirectToOnFailed() {
        this.router.push('onfailed');
    }

    static createOption(option_name, action_name, others){
        return Object.assign({}, others, {option_name: option_name, action_name: action_name});
    }

    endOperator(actions, option){
        // Foreman ends work of operator
        let action_data = {
            action_type: this.state.app.action,
            parameter: {
                position_id: option.line_position_id,
                related_person_id: this.state.user.user_id,
                user_id: option.occupied
            }
        };
        actions.writeAction(action_data)
            .then(() => this.redirectToOnSuccess())
            .catch(error =>{
                console.error(error);
                this.redirectToOnFailed();
            });
    }

    gotoToLinesOrPositions(actions){
        if(this.state.lines.length == 1){
            // load positions for the line
            // redirect to positions
            const line = this.state.lines[0];
            actions.loadPositions(line.line_id)
                .then(() => this.redirectToLine(line.line_id))
                .catch(error =>{
                    console.error(error);
                    toastr.error(error);
                });
        }
        if(this.state.lines.length > 1){
            // show lines
            this.redirectToLines();
        }
        if(this.state.lines.length == 0){
            toastr.error('Terminal has no lines defined.');
        }
    }

    process_option(option, actions){
        console.log('process_option --------------');
        console.log(option);
        if(option.action_name && option.action_name != 'ACTION_NONE'){
            // set action to store
            actions.preSelectAction(option.action_name);
        }
        let action_data = {};
        let error_msg = '';
        switch(option.option_name){

            case UserOptions.OPTION_START_WORK:              // ------------- START_WORK
                this.gotoToLinesOrPositions(actions);
                return;

            case UserOptions.OPTION_END_WORK:                // ------------- END_WORK
                // End of work
                action_data = {
                    action_type: option.action_name,
                    parameter: {
                        position_id: this.state.user.working_position,
                        user_id: this.state.user.user_id
                    }
                };
                actions.writeAction(action_data)
                    .then(() => this.redirectToOnSuccess())
                    .catch(error =>{
                        console.error(error);
                        this.redirectToOnFailed();
                    });
                return;


            case UserOptions.OPTION_REPORT_ERROR_ELECTRIC:        // ------------- REPORT_ERROR_ELECTRIC
                // load positions for terminal/user
                this.gotoToLinesOrPositions(actions);
                return;

            case UserOptions.OPTION_REPORT_ERROR_MECHANIC:        // ------------- REPORT_ERROR_MECHANIC
                // load positions for terminal/user
                this.gotoToLinesOrPositions(actions);
                return;



            // ------------------------------------------------------------------------------- REPAIRMAN
            case UserOptions.OPTION_START_REPAIR:
                // load lines or positions with error
                this.gotoToLinesOrPositions(actions);
                return;

            case UserOptions.OPTION_END_REPAIR:
                // Repairman
                // end work if only error == 1
                // and position is occupied
                action_data = {
                    action_type: option.action_name,
                    parameter: {
                        position_id: this.state.user.working_position,
                        user_id: this.state.user.user_id
                    }
                };
                actions.writeAction(action_data)
                    .then(() => this.redirectToOnSuccess())
                    .catch(error =>{
                        console.error(error);
                        this.redirectToOnFailed();
                    });

                return;
            // -------------------------------------------------------------------------------



            case UserOptions.OPTION_START_TEMPORARY:              // ------------- OPTION_START_TEMPORARY
                this.gotoToLinesOrPositions(actions);
                return;

            case UserOptions.OPTION_START_REWORK:                // ------------- START_REWORK
                // Start of rework
                this.redirectToLines();
                return;

            case UserOptions.OPTION_END_REWORK:                // ------------- END_REWORK
                // End of rework
                action_data = {
                    action_type: option.action_name,
                    parameter: {
                        line_id: this.state.user.working_line,
                        user_id: this.state.user.user_id
                    }
                };
                actions.writeAction(action_data)
                    .then(() => this.redirectToOnSuccess())
                    .catch(error =>{
                        console.error(error);
                        this.redirectToOnFailed();
                    });
                return;

            case UserOptions.OPTION_END_WORK_ON_POSITION:              // ------------- START_WORK
                this.gotoToLinesOrPositions(actions);
                return;

            case UserOptions.OPTION_SELECT_LINE:
                // load positions for line
                // and show positions
                if( this.state.app.action == 'ACTION_START_REWORK'){
                    action_data = {
                        action_type: this.state.app.action,
                        parameter: {
                            line_id: this.state.user.working_line,
                            user_id: this.state.user.user_id
                        }
                    };
                    actions.writeAction(action_data)
                        .then(() => this.redirectToOnSuccess())
                        .catch(error =>{
                            console.error(error);
                            this.redirectToOnFailed();
                        });
                }
                else{
                    // go to positions
                    actions.loadPositions(option.line_id)
                        .then(() => this.redirectToLine(option.line_id))
                        .catch(error => {
                            console.error(error);
                            toastr.error(error);
                        });
                }
                return;

            case UserOptions.OPTION_SELECT_POSITION:
                if( this.state.app.action.substring(0, 19) == 'ACTION_REPORT_ERROR' ){
                    // handle error reporting
                    // call backend API to log action => report error
                    // and go to OnSuccess page
                    action_data = {
                        action_type: this.state.app.action,
                        parameter: {
                            position_id: option.line_position_id,
                            user_id: this.state.user.user_id
                        }
                    };
                    actions.writeAction(action_data)
                        .then(() => this.redirectToOnSuccess())
                        .catch(error =>{
                            console.error(error);
                            this.redirectToOnFailed();
                        });
                    return;

                }
                else if( this.state.app.action == 'ACTION_END_OPERATOR' ){
                    // Foreman ends work of operator
                    this.endOperator(actions, option);
                    return;

                }
                else if( this.state.app.action == 'ACTION_START_REPAIR' ){
                    // Repairman
                    // start work if only error == 1
                    // and nobody is working there
                    if( option.error == 1 && option.occupied == 0 ){
                        action_data = {
                            action_type: this.state.app.action,
                            parameter: {
                                position_id: option.line_position_id,
                                user_id: this.state.user.user_id
                            }
                        };
                        actions.writeAction(action_data)
                            .then(() => this.redirectToOnSuccess())
                            .catch(error =>{
                                console.error(error);
                                this.redirectToOnFailed();
                            });
                    }
                    return;
                }
                else{
                    // handle starting work actions
                    switch(option.state){

                        case PositionStates.POSITION_AVAILABLE:
                            // Position available and access allowed
                            // call backend API to log action(saved in store)
                            // and go to OnSuccess page
                            action_data = {
                                    action_type: this.state.app.action,
                                    parameter: {
                                        position_id: option.line_position_id,
                                        user_id: this.state.user.user_id
                                    }
                                };

                            if( this.state.user.user_role_id == 2 ){
                                action_data['parameter']['related_person_id'] = this.state.user.user_id;
                            }

                            actions.writeAction(action_data)
                                .then(() => this.redirectToOnSuccess())
                                .catch(error =>{
                                    console.error(error);
                                    this.redirectToOnFailed();
                                });
                            return;


                        case PositionStates.POSITION_AVAILABLE_WITH_AUTHORIZATION:
                            // Position available and access denied
                            // need ask for authorization => show inputbox
                            actions.beginAuthorization(option);
                            return;


                        case PositionStates.POSITION_OCCUPIED:
                        case PositionStates.POSITION_ERROR_REPORTED:
                            return;

                        default :
                            const error_position = {message: 'Unknown PositionState'};
                            throw(error_position);
                    }
                }


            default:
                const error = {message: 'Not Implemented'};
                throw(error);
        }
    }
}

export default OptionProcessor;
