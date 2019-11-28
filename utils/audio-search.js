const crypto = require('crypto');

function buildStringToSign(
    method,
    uri,
    accessKey,
    dataType,
    signatureVersion,
    timestamp,
) {
    return [
        method,
        uri,
        accessKey,
        dataType,
        signatureVersion,
        timestamp,
    ].join('\n');
}

function sign(signString, accessSecret) {
    return crypto.createHmac('sha1', accessSecret)
        .update(Buffer.from(signString, 'utf-8'))
        .digest().toString('base64');
}

module.exports = {
    buildStringToSign,
    sign,
};
