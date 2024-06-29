class Logger {
    static log(message) {
        console.log(`[LOG] ${message}`);
    }

    static info(message) {
        console.log(`[INFO] ${message}`.green);
    }

    static warn(message) {
        console.log(`[WARN] ${message}`.yellow);
    }

    static error(message) {
        console.log(`[ERROR] ${message}`.red);
    }

    static debug(message) {
        console.log(`[DEBUG] ${message}`.blue);
    }
}

module.exports = {Logger};