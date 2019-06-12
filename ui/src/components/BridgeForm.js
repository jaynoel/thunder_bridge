import React from 'react'

export const BridgeForm = ({ reverse, currency, onTransfer, onInputChange, displayArrow }) => (
  <div className="form-container">
    {displayArrow &&
      <div className={`transfer-line ${displayArrow ? 'transfer-right' : ''}`}>
        <div className="arrow" />
      </div>
    }
    <form className="bridge-form" onSubmit={onTransfer} autoComplete="off">
      <div className="bridge-form-controls">
        <div className="bridge-form-inputs">
          <div className="bridge-form-input-container">
            <input
              onChange={onInputChange}
              name="amount"
              pattern="[0-9]+([.][0-9]{1,18})?"
              type="text"
              className="bridge-form-input"
              id="amount"
              placeholder="0"
            />
            <label htmlFor="amount" className="bridge-form-label">
              {currency}
            </label>
          </div>
          <div className="bridge-form-input-container">
            <input
              name="amount"
              type="text"
              className="bridge-form-input"
              id="amount"
              placeholder="0x00"
            />
          </div>
        </div>
        <div>
          <button type="submit" className="bridge-form-button">
            Transfer
          </button>
        </div>
      </div>
    </form>
  </div>
)
