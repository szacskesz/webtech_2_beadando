import ShutterDataConstants from '../constants/ShutterDataConstants'
import ShutterDataDispatcher from '../dispatchers/ShutterDataDispatcher'

class ShutterDataActions {

    refreshShutterColors() {
        ShutterDataDispatcher.handleViewAction({
            actionType : ShutterDataConstants.REFRESH_SHUTTER_COLORS
        });
    }

    refreshShutterTypes() {
        ShutterDataDispatcher.handleViewAction({
            actionType : ShutterDataConstants.REFRESH_SHUTTER_TYPES
        });
    }

    refreshShutterMaterials(){
        ShutterDataDispatcher.handleViewAction({
            actionType : ShutterDataConstants.REFRESH_SHUTTER_MATERIALS
        });
    }
}

export default new ShutterDataActions();