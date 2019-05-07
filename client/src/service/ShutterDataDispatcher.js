import { Dispatcher } from 'flux'
import axios from "axios";
import ShutterDataConstants from './ShutterDataConstants'
import ShutterDataStore from './ShutterDataStore'

class ShutterDataDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    }
}

const dispatcher = new ShutterDataDispatcher();

dispatcher.register((data)=> {
    if(data.action.actionType !== ShutterDataConstants.REFRESH_SHUTTER_COLORS){
        return;
    }

    axios.get("/shutter-data/getAllShutterColors")
    .then((response) => {
        ShutterDataStore._shutterData.colors = response.data.colors;
        ShutterDataStore.emitChange()
    })
});

dispatcher.register((data)=> {
    if(data.action.actionType !== ShutterDataConstants.REFRESH_SHUTTER_TYPES){
        return;
    }

    axios.get("/shutter-data/getAllShutterTypes")
    .then((response) => {
        ShutterDataStore._shutterData.types = response.data.types;
        ShutterDataStore.emitChange()
    })
});

dispatcher.register((data)=> {
    if(data.action.actionType !== ShutterDataConstants.REFRESH_SHUTTER_MATERIALS){
        return;
    }

    axios.get("/shutter-data/getAllShutterMaterials")
    .then((response) => {
        ShutterDataStore._shutterData.materials = response.data.materials;
        ShutterDataStore.emitChange()
    })
});

export default dispatcher;
