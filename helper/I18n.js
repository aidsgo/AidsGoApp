import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
    en: {
        incidents_nearby: '事件',
        help_tips: '救援小提示',
        on_going: '正在发生',
        mine: '我参与的',
        need_help: ' 需要你的帮助!',
        distance: '距离当前位置 {{distance}} 米',
        take_incident: '正在参与救援!',
        person: '{{count}} 个人',
        emergency_call: '紧急联系人电话:',
        property_management_company_phone: '物业公司电话:',
        volunteer: '参与救援',
        resolve: '完成救援',
        done: '完成'
    },
    'en-GB': {
        incidents_nearby: 'Incidents nearby',
        help_tips: 'Help tips',
        on_going: 'On going',
        mine: 'Mine',
        need_help: ' need your help!',
        distance: '{{distance}} meters away from you.',
        take_incident: 'have taken this incident!',
        person: '{{count}} person',
        emergency_call: 'Emergency Call:',
        property_management_company_phone: 'Property Management Company:',
        volunteer: 'Volunteer',
        resolve: 'Resolve',
        done: 'Done'
    }
};

export default I18n;
