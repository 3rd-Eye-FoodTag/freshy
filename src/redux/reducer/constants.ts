//reducer name

export const REDUCER_NAME = {
    userSettingReducer: 'userSettingReducer',
    storageReducer: 'storageReducer'
}

export const ACTION_NAME = {
    addInventoryList: 'addInventoryList',
    addInventoryListSuccess: 'addInventoryListSuccess',
    updateSelectedFoodID: 'updateSelectedFoodID',
    updateProfileInfo: 'updateProfileInfo', 
    setAuthenticating: 'setAuthenticating', 
    loginStatus: 'loginStatus', 
    logoutStatus: 'logoutStatus', 
    setAuthenticationStatus: 'setAuthenticationStatus', 
    register: 'register', 
    pluseOne: 'pluseOne', 
    addItems: 'addItems', 
    removeItems: 'removeItems',
    fetchUserInfo: 'fetchUserInfo',
    fetchUserInfoSuccess: 'fetchUserInfoSuccess',
    fetchUserInfoFailure: 'fetchUserInfoFailure',
    fetchInventoryList: 'fetchInventoryList',
    fetchInventoryListSuccess: 'fetchInventoryListSuccess',
    fetchInventoryListFailure: 'fetchInventoryListFailure',
    //register email: 
    registerEmail: 'registerEmail', 
    registerPassword: 'registerPassword',
    setCurrentUser: 'setCurrentUser'
}

export const actionType = (reducerName: string, actions: string) => {
    return `${reducerName}/${actions}`
}