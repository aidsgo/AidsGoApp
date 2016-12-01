import moment from 'moment';

export const generateTimeString = (time) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const timeInterval = new Date().getTime() - new Date(time).getTime();
    const sameDay = generateYMD(new Date()) === generateYMD(new Date(time));

    if(!sameDay) {
        if(timeInterval > oneDay) {
            const dayCounter = Math.floor(timeInterval / oneDay);
            return `${dayCounter} 天前`
        } else return '1 天前';

    } else {
        return moment(time).format('h:mm:ss A');
    }
};

const generateYMD = (time) => {
    return `${time.getFullYear()}${time.getMonth()}${time.getDate()}`;
};

export const exactTime = time => {
    return moment(time).format('YYYY/MM/DD h:mm:ss');
};