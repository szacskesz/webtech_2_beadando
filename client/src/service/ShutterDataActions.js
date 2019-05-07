import ShutterDataConstants from './ShutterDataConstants'
import ShutterDataDispatcher from './ShutterDataDispatcher'

class ShutterDataActions{

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