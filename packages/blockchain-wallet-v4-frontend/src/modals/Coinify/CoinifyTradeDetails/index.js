import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { actions, selectors } from 'data'
import modalEnhancer from 'providers/ModalEnhancer'
import { Modal } from 'blockchain-info-components'

import BankTransfer from './BankTransfer'
import Trade from './Trade'

class CoinifyTradeDetails extends React.PureComponent {
  render () {
    const { trade, status, subscriptions } = this.props

    const renderComponent = trade => {
      if (trade.medium === 'bank' && trade.state === 'awaiting_transfer_in')
        return <BankTransfer trade={trade} close={this.props.close} />

      return (
        <Trade
          status={status}
          trade={trade}
          close={this.props.close}
          subscriptions={subscriptions}
        />
      )
    }

    return (
      <Modal
        size='medium'
        position={this.props.position}
        total={this.props.total}
      >
        {renderComponent(trade)}
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  account: undefined,
  subscriptions: selectors.core.data.coinify
    .getSubscriptions(state)
    .getOrElse([])
})

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(actions.modals, dispatch)
})

const enhance = compose(
  modalEnhancer('CoinifyTradeDetails'),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(CoinifyTradeDetails)
