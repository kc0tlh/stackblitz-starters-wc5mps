import { Injectable } from '@angular/core';
import { OrderDetails } from '../models/api/responses/order-details';
import { DateFormatter } from '../utils/helpers/date-formatter.service';

// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake.js';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { CONST } from '../utils/constant';
import { TransactionDetails } from '../models/api/responses/transaction-details';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class DocumentGenerateService {
  private kotQRData: string = '';
  public readonly defaultTimeFormat = CONST.DEFAULTS.TIME_FORMAT;

  constructor(private dateFormatter: DateFormatter) { }

  /**
   * create the PDF of the Orders Token - method was replicated from restaurant-portal
   * @param orderDetail
   * @param _orderId
   */

  public makeOrderToken(orderDetail: OrderDetails, _orderId: number) {
    let textIsDelivery = '';
    let subOption = {};
    let subOptions = [];
    let _subOptions = [];
    let note = {};
    let orderId = {};
    let orderItemNameAndQty = {};

    const someArray = [];
    const rows = [];

    const singleSpaceBreak = {
      table: {
        headerRows: 1,
        widths: [208],
        body: [
          [''],
          ['']
        ]
      },
      layout: 'noBorders'
    };

    const singleSpaceBreakLineHeaderLine = {
      table: {
        headerRows: 1,
        widths: [208],
        body: [
          [''],
          ['']
        ]
      },
      layout: 'headerLineOnly',

    };
    this.kotQRData = _orderId.toString();
    if (orderDetail.is_order_delivery) {
      textIsDelivery = '(Delivery)';
    } else {
      textIsDelivery = '(Self Pickup)';
    }

    orderId = {
      // text: this.pendingOrderID, style: 'subheader', alignment: 'left'
      text: _orderId, style: 'subheader', alignment: 'left'
    };

    someArray.push(orderDetail.job_data.order_items);

    for (const entry of someArray) {

      for (const item of entry) {
        orderItemNameAndQty = {
          text: item.name + '   x   ' + item.qty + '\n', fontSize: 11, bold: true
        };

        if (item.sp_ins != '') {
          note = {text: 'Note - ' + item.sp_ins, fontSize: 10};
        }

        if (item.order_options.length != 0) {
          for (const options of item.order_options) {


            for (const order_options_values of options.values) {

              subOption = {
                text: options.name + ' - ' + order_options_values.value, fontSize: 10
              };
              _subOptions.push(subOption);
            }

            subOptions.push(_subOptions);
            _subOptions = [];
          }


          rows.push([
            {
              type: 'none',
              ol: [
                orderItemNameAndQty,
                singleSpaceBreak,
                [
                  {text: 'Options', fontSize: 10},
                  {
                    lineHeight: 1,
                    type: 'none',
                    ol: subOptions
                  }
                ],
                {
                  table: {
                    headerRows: 1,
                    widths: [208],
                    body: [
                      ['']
                    ]
                  },
                  layout: 'noBorders'
                },
                note
              ]
            },

            {
              table: {
                headerRows: 1,
                widths: [208],
                body: [
                  [''],
                  [''],
                  ['']
                ]
              },
              layout: 'noBorders'
            }
          ]);

          subOptions = [];

        } else {
          rows.push([
            {
              type: 'none',
              ol: [
                orderItemNameAndQty,
                singleSpaceBreak,
                note
              ]
            },
            {
              table: {
                headerRows: 1,
                widths: [208],
                body: [
                  [''],
                  [''],
                  ['']
                ]
              },
              layout: 'noBorders'
            }
          ]);
        }
      }
    }

    const docDefinition = {
      pageOrientation: 'portrait',
      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageSize: {
        width: 250,
        height: 'auto'
      },
      pageMargins: [20, 20, 20, 20],
      content: [
        {
          style: 'tableExample',
          table: {
            widths: [200],
            body: [
              [
                { //PickMe Logo

                  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAAbCAYAAAB2gwGKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUqSURBVHgB7VpNbhs3FP4UaNFdtajXYndpu4gLGN2WPkF0g5mcwOkJPD6B7RNofILEJ9B0X9TqpuhuJusWsLot0qrzwiFEcR7/NGO1AfIBDwL/yffxPT5yBIwD2cqpmXHy/Lvsi6/PHk++OtuefHN2jU8YDROMg7KVeSvnlJg9PxXTZ9OHyRYzXWE7wdUfv/5U4BMGY9rKMqH+u1Y2raxbqawyCWVt6ymmwiSMMPlnMsc4WLTy0sq7aqVBGm5a+dxRdt/KW8TBp7879PU0GERajsPQQCmrhCIxa4Xc4Pn7z96vp39NN/vE/f0jxgFtjNzKu0M6aUS8cJRRfgxp3FxMjLXmPTzD4RBQu+wSijiCbCXbrNebCSbn2w9kbpvtFle///ZziY8HEsrdh7DAf4TtCPIayt2Y6adCwYwvkY4a/jUVEX08BPrI8QSYOvJJ6X8a6VknL8DvLrK2b7FzOdedVFBuK+WM+L/g+0C5gBUxHxPcDpl76tNEH8HvKlcZCe1sgeEocBxLC+nhdUT7HE+AKdJBQcctlHWZIMJKqKDggmknoBSVd3U0ZNf2RZem6JSi1KobawgEk7fpJAav4HaTLzEM5LnIa4ku7YrKWaTuMHSD2W2WXVnu6PPR+CWSZCsr+HfqA/pWVCDO0i7ht/baM0ctK/AQTFtuLbmjrW/dNfoG0cPYpElPWQFeOSExF1EgTNol/IQBPGk3kbrImXoFwqRlCWtfAft3XY1DQ37ONbzz1NdlBZT5z5CGAvHh9QX6Lq2Beq1pAm25YOkVk5dZ6Sqi7xzq+Ihdu4QK5likWpp0tJGe8qIrE+B3WmEsRoDftXVXXnjGzhC2MI2aqQtmfrXVToC3qBxuSxPMeDX2PQTVeYOwF/kAjgByE4UlS7h9sbkwCTdpN54yG6VjAYUjP0M8YYCbtAJ+xeVMuYCftGXCvFbou8ketiNIbvQn4SbmAfDuYlj91JYswCv1GmmEAW7SJPwbawVeqTncerHHWsINrp+5WeGQkN+Gfn8MgdyffRn9xVO/auVLJp+70HIvMIe8R+px19Y4GXYuXDLj+ED9CCY/d9Tnzjw6j0udGEJaBUVYFVmfU/bQe5gPFJCUOIw4esEx5yugyBJM3dBLD0dCjrSLtzATLtLo8sxdQPXFtMJhyrDR4OlAyiI3dI50lOjflSR2DwAaRG7ooi4wHFHukc4IXwh/CLjFCYwHstqZ1afE7jE7BQ3UxpRGHvfKUyKuLxsV0jbsvZkY40yLRcPkzQNt7AP73lGPCCOLIpdmR1tkMW+RbtU0ljTStpvbIO4RvGHy6BwsMQBcNBhSpg8S7ujLjrzoTjRL6EciHJJz14oV038NPnrUmMEfMdsbKoc7erTvfm/gxwK7cy8Ho6NjklaAD9dt0CRtpdaePqTVlrvA2xFmiDTCCm7SpFU3h5u0gilzfda5QH/de6QN+XJ9CMgKGiuPlLmEUgJJDqUsYdULhdYa5LaumPxLpJ+hLnfcIO2/H7Ru+0ynNdKGldhFp0v0z987pu1RLY3g++bmEnO3FQjvegJnJaabrBG2NJfVLpm6OdyW5iqPWbeAcpeLbj6LY1saQQcNTWT9qqsfCq1t/MDkSaT9FUJ/47IRa/UmSqg5xa6jwU5P+qpFxJ1OMf5dacP0aU9UE0eTIB8umH4q8FEW1z8HGoPcZGblZ0i7dN9a89P3VETMy143uT6KOAuoLyUzRz+32HepjVG2HuvPqkNhPnHpxada1scI/cRF69dW3YQa/Qt0QxpWIfP7/AAAAABJRU5ErkJggg==',
                  fit: [100, 75],
                  alignment: 'center'
                },

              ],
              [
                {
                  stack: [
                    {
                      text: 'Food', style: 'header'
                    },
                    {
                      text: textIsDelivery, style: 'subheader'
                    },
                    {
                      text: '\n\n'
                    },
                    {
                      table: {
                        widths: [100, 100],
                        body: [
                          [
                            {text: 'Order Id', fontSize: 10},
                            {
                              text: this.dateFormatter.dateAsString(orderDetail.created_at),
                              fontSize: 10,
                              alignment: 'right'
                            }
                          ],
                          [
                            orderId,
                            {
                              text: this.dateFormatter.dateAsString(orderDetail.created_at, this.defaultTimeFormat),
                              alignment: 'right'
                            }
                          ]
                        ]
                      }, layout: 'noBorders'
                    },
                    singleSpaceBreakLineHeaderLine,
                    singleSpaceBreak,
                    {
                      table: {
                        widths: [200],
                        body: [
                          [rows]
                        ]
                      }, layout: 'noBorders'
                    },
                    singleSpaceBreakLineHeaderLine,
                    {
                      text: 'Thank you for using PickMe Foods', style: 'small', alignment: 'center'
                    },
                    {
                      text: '\n\n', style: 'small', alignment: 'center'
                    },
                    {
                      qr: this.kotQRData, alignment: 'center', fit: '80', mode: 'alphanumeric',
                    },
                    {
                      text: '\n\n', style: 'small', alignment: 'center'
                    }
                  ],
                }

              ]
            ]
          }, layout: 'noBorders'
        }
      ],


      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 11,
          bold: true,
          alignment: 'center'
        },
        quote: {
          fontSize: 8,
          italics: true
        },
        small: {
          fontSize: 8
        }
      },


    };
    pdfMake.createPdf(docDefinition).print();
  }

  /**
   * generating the pdf report from a table
   */
  public downloadFinanceReport(documentName: string, isTableEmpty: boolean) {
    const doc = new jsPDF();
    if (isTableEmpty) {
      const img = new Image();
      img.src = 'assets/img/finance_img.png';
      doc.addImage(img, 'png', 50, 50, 100, 100);
    } else {
      autoTable(doc, {
        html: '#table-report'
      });
    }
    doc.save(documentName);
  }

}
