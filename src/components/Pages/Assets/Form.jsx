import React from 'react';
import { today } from '../../../Lib/format.js';

export const ASSET_TYPES = [
  { value: 'land', label: 'Land (Jomi)' },
  { value: 'business', label: 'Business (Beboshay)' },
  { value: 'gold', label: 'Gold' },
];

// Asset Create ar Edit duto page-ei ei form use kore
function AssetForm({ initial = {}, submitLabel, onSubmit, message }) {

  const [values, setValues] = React.useState({
    asset_type: initial.asset_type ?? 'land',
    title: initial.title ?? '',
    details: initial.details ?? '',
    amount: initial.amount ?? '',
    invest_date: initial.invest_date ?? today(),
    note: initial.note ?? '',
  });

  const change = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger">{message}</div>}
      <div className="form-group">
        <label htmlFor="assetType">Invest In</label>
        <select name="asset_type" className="form-control" id="assetType" value={values.asset_type} onChange={change} required>
          {ASSET_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="assetTitle">Title</label>
        <input type="text" name="title" value={values.title} onChange={change} className="form-control" id="assetTitle" placeholder="Jemon: Mirpur-e 5 katha jomi / Gold 3 bhori" required />
      </div>
      <div className="form-group">
        <label htmlFor="assetDetails">Quantity / Details</label>
        <input type="text" name="details" value={values.details} onChange={change} className="form-control" id="assetDetails" placeholder="Jemon: 5 katha, 3 bhori, 50% share" />
      </div>
      <div className="form-group">
        <label htmlFor="assetAmount">Invested Amount (৳)</label>
        <input type="number" name="amount" min="0.01" step="0.01" value={values.amount} onChange={change} className="form-control" id="assetAmount" placeholder="Enter amount" required />
      </div>
      <div className="form-group">
        <label htmlFor="assetDate">Date</label>
        <input type="date" name="invest_date" value={values.invest_date} onChange={change} className="form-control" id="assetDate" required />
      </div>
      <div className="form-group">
        <label htmlFor="assetNote">Note</label>
        <input type="text" name="note" value={values.note} onChange={change} className="form-control" id="assetNote" placeholder="Enter note (optional)" />
      </div>
      <button type="submit" className="btn btn-primary mt-3">{submitLabel}</button>
    </form>
  );
}

export default AssetForm;
