import React from 'react'
import arrowsIcon from '../assets/images/transfer-modal/icon-arrows@2x.png'
import numeral from 'numeral'
import { ArrowRight } from './icons/ArrowRight'
import { RenameToken } from './utils/renameToken'
import { updateForeignLogo } from '../stores/utils/utils'

export const TransferAlert = ({
  onConfirmation,
  onCancel,
  from,
  to,
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  fee,
  reverse,
  recipient,
  minPerTx,
  feeCurrency
}) => {
  const formattedFromAmount = numeral(fromAmount).format('0,0[.][000000000000000000]', Math.floor)
  const formattedToAmount = numeral(toAmount).format('0,0[.][000000000000000000]', Math.floor)

  return (
    <div className="transfer-alert">
      <div className="alert-container">
        <div className="transfer-title">
          <div className="alert-logo-box">
            <div className={reverse ? 'foreign-logo' : 'home-logo'} style={reverse ? updateForeignLogo() : {}} />
          </div>
          <div>
            <strong>{formattedFromAmount}</strong> {RenameToken(fromCurrency)}
          </div>
          <ArrowRight />
          <div>
            <strong>{formattedToAmount}</strong> {RenameToken(toCurrency)}
          </div>
          <div className="alert-logo-box">
            <div className={reverse ? 'home-logo' : 'foreign-logo'} style={!reverse ? updateForeignLogo() : {}} />
          </div>
        </div>
        <p className="transfer-description" data-testid="transfer-description">
          <strong>{recipient && `Recipient: ${recipient}`}</strong><br />
          <strong>{`Transaction fee: ${fee} ${RenameToken(feeCurrency)}`}</strong>
        </p>
        <p className="transfer-description" data-testid="transfer-description">
          Please confirm that you would like to send <strong>{formattedFromAmount}</strong>{' '}
          {RenameToken(fromCurrency)} from {from} to receive <strong>{formattedToAmount}</strong> {RenameToken(toCurrency)} on{' '}
          {to}.
        </p>
        <div className="transfer-buttons">
          <button className="transfer-confirm" onClick={onConfirmation}>
            Continue
          </button>
          <button className="transfer-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
