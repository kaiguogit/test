const fs = require('fs');
const XSS_STR = '<script>alert(\'XSS Vulnerablility. Here is your cookie.\', document.cookie)</script>';

const WIDGET_LIST = {
    data: [
        {
            id: 'system-info',
            lang_key: 'System Info',
            supported_visualization_types: ['key-value-pair']
        },
        {
            id: 'threat',
            lang_key: 'Threat',
            supported_visualization_types: ['pie-chart', 'bar-chart']
        },
        {
            id: 'trusthosts',
            lang_key: 'Trusted Hosts',
            supported_visualization_types: ['table']
        },
        {
            id: 'sessions',
            lang_key: 'Sessions',
            supported_visualization_types: ['time-line-chart']
        },
        {
            id: 'bandwidth',
            lang_key: 'Bandwidth',
            supported_visualization_types: ['time-line-chart']
        },
        {
            id: 'XSS Test',
            lang_key: 'XSS_str',
            supported_visualization_types: ['key-value-pair', 'table', 'time-line-chart',
                'pie-chart', 'bar-chart']
        }
    ],
    meta: {
        language: {}
    }
};

const DEVICE_INFO = exports.DEVICE_INFO = {
    serial: 'FWLCXXXXX',
    model: 'FWLCXXX',
    version: {
        major: 1,
        minor: 0,
        patch: 3
    },
    hostname: 'test-fabric-device-server',
    build: {
        number: 120,
        release_life_cycle: 'Interim'
    },
    suppported_api_versions: [1]
};

const WIDGET_DATA = {
    'system-info': {
        'key-value-pair': {
            data: [{
                lang_key: 'serial',
                value: DEVICE_INFO.serial
            }, {
                lang_key: 'model',
                value: DEVICE_INFO.model
            }, {
                lang_key: 'version',
                value: ['major', 'minor', 'patch'].map(key => {
                    return DEVICE_INFO.version[key];
                }).join('.'),
            }, {
                lang_key: 'hostname',
                value: DEVICE_INFO.hostname
            }, {
                lang_key: 'build',
                value: DEVICE_INFO.build.release_life_cycle + ' build' + DEVICE_INFO.build.number,
            }, {
                lang_key: 'Management IP',
                value: '172.27.4.28'
            }],
            meta: {
                language: {}
            }
        }
    },
    threat: {
        'pie-chart': {
            data: [{
                lang_key: 'Malicious',
                value: 10
            },
            {
                lang_key: 'Zero-Day Malware Variants',
                value: 10
            },
            {
                lang_key: 'Suspicious',
                value: 20
            },
            {
                lang_key: 'Clean',
                value: 60
            }],
            meta: {
                visualization_type: 'pie-chart',
                language: {}
            }
        },
        'bar-chart': {
            data: [{
                lang_key: 'Malicious',
                value: 10
            },
            {
                lang_key: 'Zero-Day Malware Variants',
                value: 10
            },
            {
                lang_key: 'Suspicious',
                value: 20
            },
            {
                lang_key: 'Clean',
                value: 60
            }],
            meta: {
                visualization_type: 'bar-chart',
                language: {},
                unit: '%'
            }
        }
    },
    trusthosts: {
        table: {
            data: {
                entries: [
                    {
                        mac: '00:11:22:33:44:55',
                        traffic_bytes: 1024,
                        ip: '10.10.1.254',
                        expire: 1532386379
                    },
                    {
                        mac: 'aa:bb:cc:dd:ee:ff',
                        traffic_bytes: 256,
                        ip: '10.10.1.10',
                        expire: 1532686379
                    },
                    {
                        mac: '34:58:aa:ff:ea:88',
                        traffic_bytes: 389,
                        ip: '10.10.1.1',
                        expire: 1533386379
                    }
                ],
                columns: [
                    {
                        lang_key: 'MAC address',
                        key: 'mac',
                        type: 'string'
                    },
                    {
                        lang_key: 'Traffic',
                        key: 'traffic_bytes',
                        type: 'number'
                    },
                    {
                        lang_key: 'IP address',
                        key: 'ip',
                        type: 'string'
                    },
                    {
                        lang_key: 'Expiration',
                        key: 'expire',
                        type: 'date'
                    }
                ],
                default_columns: ['mac', 'ip']
            },
            meta: {
                visualization_type: 'table',
                language: {}
            }
        }
    },
    sessions: {
        'time-line-chart': {
            data: [{
                lang_key: 'IPv4',
                time_frames: {}
            }, {
                lang_key: 'IPv6',
                time_frames: {}
            }],
            meta: {
                visualization_type: 'time-line-chart',
                language: {},
                polling: true,
            }
        }
    },
    bandwidth: {
        'time-line-chart': {
            data: [{
                lang_key: 'port1',
                time_frames: {}
            }, {
                lang_key: 'port2',
                time_frames: {}
            }],
            meta: {
                visualization_type: 'time-line-chart',
                language: {},
                polling: true,
                polling_interval_min: 2,
                formatter: 'BITS_PER_SECOND'
            }
        }
    },
    'XSS Test': {
        'key-value-pair': {
            data: [{
                lang_key: 'hostname',
                value: XSS_STR
            }],
            meta: {
                language: {}
            }
        },
        table: {
            data: {
                entries: [
                    {
                        mac: XSS_STR,
                        traffic_bytes: 1024,
                    }
                ],
                columns: [
                    {
                        lang_key: 'XSS_str',
                        key: 'mac',
                        type: 'string'
                    },
                    {
                        lang_key: 'Traffic',
                        key: 'traffic_bytes',
                        type: 'number'
                    }
                ],
                default_columns: ['mac']
            },
            meta: {
                visualization_type: 'table',
                language: {}
            }
        },
        'time-line-chart': {
            data: [{
                lang_key: 'XSS_str',
                time_frames: {}
            }],
            meta: {
                visualization_type: 'time-line-chart',
                language: {},
                polling: false
            }
        },
        'pie-chart': {
            data: [{
                lang_key: 'XSS_str',
                value: 10
            }],
            meta: {
                visualization_type: 'pie-chart',
                language: {}
            }
        },
        'bar-chart': {
            data: [{
                lang_key: 'XSS_str',
                value: 10
            }],
            meta: {
                visualization_type: 'bar-chart',
                language: {}
            }
        }
    }
};

const LANG_FILES = ['en', 'big5', 'euc-kr', 'fr', 'GB2312', 'pg', 'sp', 'x-sjis'];

const getLangKeysFromArray = function(data) {
    return data.map(item => item.lang_key);
};

const getLangKeysFromTableData = function(data) {
    return getLangKeysFromArray(data.columns);
};

const getLangKeysFromLineChartData = function(data) {
    const result = getLangKeysFromArray(data);
    data.forEach(function(item) {
        Object.keys(item.time_frames).forEach(timeOption => {
            if (!result.includes(timeOption)) {
                result.push(timeOption);
            }
        });
    });
    return result;
};

const getLangMapFromKeys = (keys) => {
    return LANG_FILES.reduce((result, fileName) => {
        const filePath = 'lang/' + fileName + '.json';
        let langMap;
        try {
            langMap = JSON.parse(fs.readFileSync(filePath).toString());
        } catch(e) {
            langMap = {};
        }
        keys.forEach(key => {
            if (langMap && langMap[key]) {
                result[fileName] = result[fileName] || {};
                result[fileName][key] = langMap[key];
            }
        });
        return result;
    }, {});
};

const VISUALIZATION_LANG_KEY_FUNCTIONS = {
    'pie-chart': getLangKeysFromArray,
    'key-value-pair': getLangKeysFromArray,
    'time-line-chart': getLangKeysFromLineChartData,
    'bar-chart': getLangKeysFromArray,
    'table': getLangKeysFromTableData,
};

// Generate lang map for widget list
WIDGET_LIST.meta.lang = getLangMapFromKeys(getLangKeysFromArray(WIDGET_LIST.data));


// Generate line chart data.
const MS_IN_S = 1000;
const TIME_PERIOD_IN_MS = {
    '1_min': 60 * MS_IN_S,
    '10_min': 10 * 60 * MS_IN_S,
    '30_min':  30 * 60 * MS_IN_S,
    '1_hour': 60e2 * MS_IN_S,
    '12_hour': 12 * 60e2 * MS_IN_S,
    '24_hour': 24 * 60e2 * MS_IN_S
};
const TICKS_COUNT = 20;
const generateTimeInterval = function(length) {
    const end = Math.floor(new Date().getTime() / 1000) * 1000;
    const results = [];
    for (let i = 1; i <= TICKS_COUNT; i++) {
        results.push(end - (i * length / TICKS_COUNT));
    }
    return results;
};

const generateRandomValue = () => {
    return Math.floor(Math.random() * 100);
};

const generateTimeLineChartData = () => {
    const generate = data => {
        const timeFrames = data.time_frames;
        const current = data.current = generateRandomValue();
        Object.keys(TIME_PERIOD_IN_MS).forEach(key => {
            const oldData = timeFrames[key];
            const length = TIME_PERIOD_IN_MS[key];
            const interval = length / TICKS_COUNT;
            let timeInterval = generateTimeInterval(length);
            timeInterval = timeInterval.map((timeMark, index) => {
                if (oldData) {
                    const existing = oldData.find(item => {
                        return item[0] - timeMark < interval && item[0] >= timeMark;
                    });
                    if (existing) {
                        return [timeMark, existing[1]];
                    }
                }
                return [timeMark, index === 0 ? current : generateRandomValue()];
            });
            timeFrames[key] = timeInterval;
        });
    };
    Object.keys(WIDGET_DATA).forEach(widgetId => {
        Object.keys(WIDGET_DATA[widgetId]).forEach(type => {
            if (type === 'time-line-chart') {
                WIDGET_DATA[widgetId][type].data.forEach(generate);
            }
        });
    });
};

const generateWidgetData = () => {
    generateTimeLineChartData();
    // Generate language map for widget data.
    Object.keys(WIDGET_DATA).forEach(widgetName => {
        const widget = WIDGET_DATA[widgetName];
        Object.keys(widget).forEach(visualizationType => {
            const data = widget[visualizationType];
            const keys = VISUALIZATION_LANG_KEY_FUNCTIONS[visualizationType](data.data);
            data.meta.language = getLangMapFromKeys(keys);
        });
    });
};

exports.getWidgetList = (req, res) => {
    res.json(WIDGET_LIST);
};

exports.getWidget = (req, res) => {
    const widgetId = req.params.id;
    const visualizationType = req.query.visualization_type;
    generateWidgetData();
    if (!widgetId || !WIDGET_DATA[widgetId]) {
        return res.status(404).end();
    }
    if (!visualizationType || !WIDGET_DATA[widgetId][visualizationType]) {
        return res.status(400).end();
    }
    res.json(WIDGET_DATA[widgetId][visualizationType]);
};