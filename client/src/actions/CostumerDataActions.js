import CostumerDataConstants from '../constants/CostumerDataConstants'
import CostumerDataDispatcher from '../dispatchers/CostumerDataDispatcher'

class CostumerDataActions {

    setCostumerData(costumerData) {
        CostumerDataDispatcher.handleViewAction({
            actionType : CostumerDataConstants.SET_COSTUMER_DATA,
            payload : costumerData
        });
    }

    unsetCostumerData() {
        CostumerDataDispatcher.handleViewAction({
            actionType : CostumerDataConstants.UNSET_COSTUMER_DATA
        });
    }

    refreshCostumerOwnOrders(){
        CostumerDataDispatcher.handleViewAction({
            actionType : CostumerDataConstants.REFRESH_COSTUMER_OWN_ORDERS
        });
    }
}

export default new CostumerDataActions();