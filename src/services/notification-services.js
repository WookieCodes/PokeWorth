export const NOTIF_CHECKLIST_CHANGED = "notif_checklist_changed";

var observers = {};
let instance = null;

export default class NotificationService {
    constructor(props) {
        if (!instance) {
            instance = this;
        } 

        return instance;
    }

    postNotification = (notifName, data) => {
        let obs = observers[notifName];

        for (var x = 0; x < obs.length; x++) {
            var obj = obs[x];
            obj.callBack(data);
        }
    }

    addObserver = (notifName, observer, callBack) => {
        let obs = observers[notifName];

        if (!obs) {
            observers[notifName] = [];
        }

        let obj = {observer: observer, callBack: callBack};
        observers[notifName].push(obj);
    }

    removeObserver = (notifName, observer) => {
        var obs = observers[notifName];

        if (obs) {
            for (var x = 0; x < obs.length; x++) {
                if (observer === obs[x].observer) {
                    obs.splice(x, 1);
                    observers[notifName] = obs;
                    break;
                }
            }
        }
    }
}