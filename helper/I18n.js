import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
    en: {
        on_going: '正在发生',
        mine: '我的',
        need_help: ' 需要你的帮助!',
        distance: '距离当前位置 {{distance}} 米'
    },
    'en-GB': {
        on_going: 'On going',
        mine: 'Mine',
        need_help: ' need your help!',
        distance: '{{distance}} meters away from you.'
    }
};

export default I18n;
