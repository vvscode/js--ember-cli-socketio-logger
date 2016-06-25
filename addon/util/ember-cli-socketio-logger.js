const log = [];
let isEnabled = false;
const addItem = (item)=> Boolean(isEnabled) && log.push(item);
let getItemForSerializer = ()=> 'item';
let filterFunction = ()=> true;

const listOfPatchedMethods = ['emit', 'packet', 'send', 'disconnect'];

const LoggerObject = {
  clear: ()=> {
    log.length = 0;

    return LoggerObject;
  },

  getSerialized: ()=> JSON.stringify(log.filter(filterFunction).map(getItemForSerializer)),

  setFilterFunction(func) {
    if (typeof func === 'function') {
      filterFunction = func;
    }

    return LoggerObject;
  },

  setGetItemForSerializer(func) {
    if (typeof func === 'function') {
      getItemForSerializer = func;
    }

    return LoggerObject;
  },

  register(name) {
    window[name] = LoggerObject;

    return LoggerObject;
  },

  subscribe() {
    const {
      io: {
        SocketNamespace,
        Socket
      }
    } = window;

    const { prototype: soketPrototype } = (SocketNamespace || Socket);

    listOfPatchedMethods.forEach((name)=> {
      if (!soketPrototype[`_${name}`]) {
        const origFunction = soketPrototype[name];

        soketPrototype[`_${name}`] = origFunction;
        /* eslint space-before-function-paren: ["error", { "anonymous": "never", "named": "never" }] */
        soketPrototype[name] = function(...args) {
          addItem({
            name,
            message: JSON.stringify(args),
            socketConnection: this
          });

          return origFunction.apply(this, args);
        };
      }
    });

    return LoggerObject;
  },

  enableLogging() {
    isEnabled = true;

    return LoggerObject;
  },

  disableLogging() {
    isEnabled = false;

    return LoggerObject;
  }
};

export function initLogger(options) {
  LoggerObject
    .setGetItemForSerializer(options.getItemForSerializer)
    .setFilterFunction(options.filter)
    .register(options.globalName)
    .subscribe()
    .enableLogging();
}
