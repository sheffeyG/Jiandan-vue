const formatTime =(timeStr)=>{
    let date = new Date(timeStr);
    let postTimeStamp = date.getTime();
    let currentTime = new Date().getTime();
    let diff = currentTime - postTimeStamp;
    let result = "";

    if (diff < 1000 * 60 * 10) {
        //10分钟之内为刚刚
        result = "刚刚"
    } else if (diff < 1000 * 60 * 60) {
        //1小时之内展示x分钟前
        result = Math.floor(diff / 1000 / 60) + "分钟前"
    } else if (diff < 1000 * 60 * 60 * 24) {
        //24小时之内展示x小时前
        result = Math.floor(diff / 1000 / 60 / 60) + "小时前"
    } else if (diff < 1000 * 60 * 60 * 24 / 7) {
        //3天之内展示x天前
        result = Math.floor(diff / 1000 / 60 / 60 / 24) + "天前"
    } else {
        //展示x月x号
        result = date.getMonth() + "月" + date.getDay() + "日"
    }
    return result
}
export default {formatTime}