import data from './data/sagas'
import settings from './settings/sagas'
import wallet from './wallet/sagas'
import walletOptions from './walletOptions/sagas'
import kvStore from './kvStore/sagas'
import payment from './payment/sagas'

export default ({ api, networks, options, rootDocument }) => ({
  data: data({ api, options, networks }),
  settings: settings({ api }),
  wallet: wallet({ api, networks, rootDocument }),
  walletOptions: walletOptions({ api }),
  kvStore: kvStore({ api, networks, rootDocument }),
  payment: payment({ api, options })
})
