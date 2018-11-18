/**
 * GET /api/fabric/device/status
 * Device status
 */
const DEVICE_INFO = require('./widget').DEVICE_INFO;

exports.getStatus = (req, res/*, next*/) => {
    return res.json(Object.assign({}, DEVICE_INFO, {
        management_ip: req.connection.localAddress,
        device_type: req.user && req.user.type
    }));
};
