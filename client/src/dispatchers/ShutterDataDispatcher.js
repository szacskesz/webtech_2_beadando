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

    ShutterDataStore._isShutterColorsFetching = true;
    ShutterDataStore.emitShutterColorsChange()

    axios.get("/shutter-data/getAllShutterColors")
    .then((response) => {
        ShutterDataStore._shutterColors = response.data.colors;
    })
    .finally(() => {
        ShutterDataStore._isShutterColorsFetching = false;
        ShutterDataStore.emitShutterColorsChange()
    })
});

dispatcher.register((data) => {
    if(data.action.actionType !== ShutterDataConstants.REFRESH_SHUTTER_TYPES){
        return;
    }

    ShutterDataStore._isShutterTypesFetching = true;
    ShutterDataStore.emitShutterTypesChange();

    axios.get("/shutter-data/getAllShutterTypes")
    .then((response) => {
        ShutterDataStore._shutterTypes = response.data.types;  
    })
    .finally(() => {
        ShutterDataStore._isShutterTypesFetching = false;
        ShutterDataStore.emitShutterTypesChange()
    })
});

dispatcher.register((data) => {
    if(data.action.actionType !== ShutterDataConstants.REFRESH_SHUTTER_MATERIALS){
        return;
    }

    ShutterDataStore._isShutterMaterialsFetching = true;
    ShutterDataStore.emitShutterMaterialsChange();

    axios.get("/shutter-data/getAllShutterMaterials")
    .then((response) => {
        ShutterDataStore._shutterMaterials = response.data.materials;
    })
    .finally(() => {
        ShutterDataStore._isShutterMaterialsFetching = false;
        ShutterDataStore.emitShutterMaterialsChange();
    })
});

export default dispatcher;
