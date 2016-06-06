export default {
    user: {},
    lines: [],
    positions: [],
    app: {
        countdown: false,
        action: 'ACTION_LOGIN',
        onsuccess_message: '',
        onfailed_message: ''
    },
    credits: {chipcard_num: '', mac_address: ''},
    authorization: {authorizationRequired: false, chipcard_num: '', status: '', option: {}},
    ajaxCallsInProgress: 0
};
