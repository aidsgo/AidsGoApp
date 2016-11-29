export const generateTimeString = (time) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const timeRegex = new RegExp('(\\d+:\\d+:\\d+ (A|a|P|p)(M|m))');
    const timeInterval = new Date().getTime() - new Date(time).getTime();
    const sameDay = generateYMD(new Date()) === generateYMD(new Date(time));

    if(!sameDay) {
        if(timeInterval > oneDay) {
            const dayCounter = Math.floor(timeInterval / oneDay);
            return `${dayCounter} 天前`
        } else return '1 天前';

    } else {
        return timeRegex.exec(new Date(time).toLocaleTimeString('en-US'))[0];
    }
};

const generateYMD = (time) => {
    return `${time.getFullYear()}${time.getMonth()}${time.getDate()}`;
};