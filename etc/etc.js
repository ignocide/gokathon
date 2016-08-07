/**
 * Created by Administrator on 2016-08-06.
 */

var wrapSuccess = function(message){
    var sendMessage = {};
    sendMessage.success = 1;
    sendMessage.result = message;
    return sendMessage;
}
exports.wrapSuccess = wrapSuccess;