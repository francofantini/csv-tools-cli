const ProgressBar = require('progress');

const fakeProgressBar = {
    tick: () => {}
};

const progressBar = (length, enabled) => {
    if (enabled)
        return new ProgressBar(':bar :rate :elapsed :eta', {
            total: length
        });
    else return fakeProgressBar;
};

module.exports = progressBar;
