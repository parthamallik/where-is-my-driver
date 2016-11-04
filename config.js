exports.development = {
    'webserver': {
        'port': 9001,
        'protocol': 'http'
    },
    'database': {
        'pool': {
            'max': 20,
            'min': 1
        },
        'debug': true,
        'client': 'pg',
        'connection': {
            'host': '127.0.0.1',
            'port': '5432',
            'user': 'postgres',
            'database': 'mytaxi',
            'password': 'postgres123'
        }
    },
    'logger': {
        'file': {
            'level': 'debug',
            'colorize': true,
            'timestamp': true,
            'filename': 'logs/app.log',
            'maxsize': 10485760,
            'maxfiles': 5,
            'json': false,
            'prettyPrint': true
        },
        'console': {
            'level': 'debug',
            'colorize': true,
            'timestamp': true,
            'prettyPrint': true
        }
    }
};

exports.production = {
    'webserver': {
        'port': 9001,
        'protocol': 'http'
    },
    'database': {
        'pool': {
            'max': 20,
            'min': 1
        },
        'debug': false,
        'client': 'pg',
        'connection': {
            'host': '127.0.0.1',
            'port': '5432',
            'user': 'postgres',
            'database': 'mytaxi',
            'password': 'postgres123'
        }
    },
    'logger': {
        'file': {
            'level': 'error',
            'colorize': true,
            'timestamp': true,
            'filename': 'logs/app.log',
            'maxsize': 10485760,
            'maxfiles': 5,
            'json': false,
            'prettyPrint': true
        },
        'console': {
            'level': 'info',
            'colorize': true,
            'timestamp': true,
            'prettyPrint': true
        }
    }
};
