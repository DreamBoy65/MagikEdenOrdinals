module.exports = {
    sleep: async s => {
        return new Promise((res, rej) => {
            setTimeout(function () {
              res(true)
            }, s * 1000);
        });
    }
};
