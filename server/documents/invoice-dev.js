import moment from 'moment'

export default function(
  { name,
    address,
    phone,
    email,
    dueDate,
    date,
    id,
    notes,
    subTotal,
    type,
    vat,
    total,
    items,
    status,
    totalAmountReceived,
    balanceDue,
    company,
  }) {
  const today = new Date();
  return `<!DOCTYPE html>
<html>

<head>
  <style>
    .invoice-container {
      display: 'flex';
      flex-direction: 'column';
      margin: 0;
      padding: 40px;
      font-family: 'Roboto', sans-serif;
    }

    table {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }

    table td,
    table th {
      border: 1px solid rgb(247, 247, 247);
      padding: 10px;
    }

    table tr:hover {
      background-color: rgb(243, 243, 243);
    }

    table th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #f8f8f8;
      color: rgb(78, 78, 78);
    }

    h4 {
      padding: 0;
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 10px 5px;
      background-color: #f2f2f2;
    }

    .details {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 0px 15px 0px;
      font-size: 12px;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .address {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      font-size: 12px;
    }

    .status {
      text-align: right;
    }

    .receipt-id {
      text-align: right;
    }

    .title {
      font-weight: 100px;
      text-transform: uppercase;
      color: gray;
      letter-spacing: 2px;
      font-size: 8px;
    }

    .summary {
      margin-top: 2px;
      margin-right: 0px;
      margin-left: 50%;
      margin-bottom: 15px;
    }

    img {
      width: 100px;

    }
  </style>
</head>

<body>
  <div class="invoice-container">
    <section class="header">
      <div>
        <img src=https://res.cloudinary.com/almpo/image/upload/v1653714763/invoice/lgedcfjlriklqnd7yfsq.png />
      </div>
      <div class="receipt-id">
        <h1 style="font-size: 12px">Invoice</h1>
        <p style="font-size: 8px">001</p>
      </div>
    </section>
    <section class="details">
      <div class="address">
        <div>
          <p class="title">From:</p>
          <h4 style="font-size: 9px;">CAFEBABE AB</h4>
          <p style="font-size: 9px;">contact@cafebabe.se</p>
          <p style="font-size: 9px;">+46 702 89 62 82</p>
          <p style="font-size: 9px;">Siguldagatan 4, 521 40 Falköping</p>
        </div>

        <div>
          <p class="title">Bill to:</p>
          <h4 style="font-size: 9px;">Hyllie Idrotts skadeklinik AB</h4>
          <p style="font-size: 9px;">contact@cafebabe.se</p>
          <p style="font-size: 9px;"></p>
          <p style="font-size: 9px;">Bollspelsvägen 3, 216 25 Malmö</p>
        </div>
      </div>

      <div class="status">
        <p class="title" style="font-size: 8px">Status</p>
        <h3 style="font-size: 12px">Unpaid</h3>
        <p class="title" style="font-size: 8px">Date</p>
        <p style="font-size: 9px">May 27, 2022</p>
        <p class="title" style="font-size: 8px">Due Date</p>
        <p style="font-size: 9px">Jun 3, 2022</p>
        <p class="title" style="font-size: 8px">Amount</p>
        <h3 style="font-size: 12px">SEK 1,250</h3>
      </div>
    </section>

    <table>
      <tr>
        <th style="font-size: 9px">Item</th>
        <th style="font-size: 9px">Quantity</th>
        <th style="font-size: 9px">Price</th>
        <th style="font-size: 9px">Discount(%)</th>
        <th style="text-align: right; font-size: 9px">Amount</th>
      </tr>

      <tr>
        <td style="font-size: 9px">Konsulttimmar</td>
        <td style="font-size: 9px">2</td>
        <td style="font-size: 9px">500</td>
        <td style="font-size: 9px"></td>
        <td style="text-align: right; font-size: 9px">1000</td>
      </tr>


    </table>

    <section class="summary">
      <table>
        <tr>
          <th style="font-size: 9px">Invoice Summary</th>
          <th></th>
        </tr>
        <tr>
          <td style="font-size: 9px">Sub Total</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">1,000</td>
        </tr>

        <tr>
          <td style="font-size: 10px">VAT</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">250</td>
        </tr>

        <tr>
          <td style="font-size: 10px">Total</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">1,250</td>
        </tr>

        <tr>
          <td style="font-size: 10px">Paid</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">0</td>
        </tr>

        <tr>
          <td style="font-size: 9px">Balance Due</td>
          <td style="text-align: right; font-size: 9px; font-weight: 700">1,250</td>
        </tr>

      </table>
    </section>
    <div>
      <hr>
      <h4 style="font-size: 9px">Note</h4>
      <p style="font-size: 9px">undefined</p>
    </div>
  </div>
</body>

</html>`
    ;
};
