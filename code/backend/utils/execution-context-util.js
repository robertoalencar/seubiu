const continuationlocalStorage = require('continuation-local-storage');

const NAMESPACE = 'executionContext';
const EXECUTION_CONTEXT_KEY = 'executionContextKey';

const init = (req, res, next, data) => {
  const executionContext = continuationlocalStorage.createNamespace(NAMESPACE);
  executionContext.bindEmitter(req);
  executionContext.bindEmitter(res);
  executionContext.run(() => {
        executionContext.set(EXECUTION_CONTEXT_KEY, data);
        next();
  });
};

const get = (key) => {
    const executionContext = continuationlocalStorage.getNamespace(NAMESPACE);
    const data = executionContext.get(EXECUTION_CONTEXT_KEY);
    return data[key];
};

module.exports = {
    get: get,
    init: init
};