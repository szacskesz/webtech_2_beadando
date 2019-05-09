import { Dispatcher } from 'flux'
import axios from "axios";
import ShutterDataConstants from '../constants/ShutterDataConstants'
import ShutterDataStore from '../stores/ShutterDataStore'

class ShutterDataDispatcher extends Dispatcher {

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    }
}

const dispatcher = new ShutterDataDispatcher();

dispatcher.register((data) => {
    if(data.action.actionType !== ShutterDataConstants.REFRESH_SHUTTER_COLORS){
        return;
    }

    axios.get("/shutter-data/getAllShutterColors")
    .then((response) => {
        ShutterDataStore._shutterColors = response.data.colors;
        ShutterDataStore.emitShutterColorsChange()
    })
});

dispatcher.register((data) => {
    if(data.action.actionType !== ShutterDataConstants.REFRESH_SHUTTER_TYPES){
        return;
    }

    axios.get("/shutter-data/getAllShutterTypes")
    .then((response) => {
        ShutterDataStore._shutterTypes = response.data.types;
        ShutterDataStore.emitShutterTypesChange()
    })
});

dispatcher.register((data) => {
    if(data.action.actionType !== ShutterDataConstants.REFRESH_SHUTTER_MATERIALS){
        return;
    }

    axios.get("/shutter-data/getAllShutterMaterials")
    .then((response) => {
        ShutterDataStore._shutterMaterials = response.data.materials;
        ShutterDataStore.emitShutterMaterialsChange()
    })
});

export default dispatcher;
