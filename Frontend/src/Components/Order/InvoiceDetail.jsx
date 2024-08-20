import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const InvoiceDetail = () => {
  const [order, setOrder] = useState([]);
  const InvoiceDetailById = useSelector((state) => state.val.data);
  useEffect(() => {
    if (InvoiceDetailById) {
      setOrder([InvoiceDetailById]); // Convert object to array and set as state
    }
  }, [InvoiceDetailById]);
  const downloadInvoice = () => {
    const input = document.getElementById("invoiceDetail");
  
    // Adjusting width of the captured canvas to match the width of the content
    html2canvas(input, { scrollY: -window.scrollY, width: input.scrollWidth }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      
      // Calculate aspect ratio to maintain proportions
      const aspectRatio = canvas.height / canvas.width;
      const width = pdf.internal.pageSize.getWidth(); // Get PDF page width
      const height = width * aspectRatio; // Calculate corresponding height
  
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`Invoice_Order.pdf`);
    });
  };

  let totalPrice = 0;
  order.map(orderItem => {
    totalPrice += orderItem.totalPrice;
  });
  const tax = totalPrice * 0.18;
  const total = totalPrice + tax;

  if (!order.length) {
    return <div>Loading...</div>; // You can replace this with a loading indicator
  }

  return (
    <div id="invoiceDetail">
      <div className="col-lg-8 col-md-12">
        <div className="card p-xl-5 p-lg-4 p-0">
          <div className="card-body">
            {order?.map((item, index) => {
              return (
                <>
                  <div key={index}>
                    <div className="mb-3 pb-3 border-bottom">
                      Invoice
                      <span className="float-end">
                        {" "}
                        <strong>Transaction id:</strong> {item.orderId}
                      </span>
                    </div>

                    <div className="row mb-4">
                      <div className="col-sm-6">
                        <h6 className="mb-3">From:</h6>
                        <div>
                          <strong>The Ebazar</strong>
                        </div>
                        <div>NO 5, Brimingham Street,London</div>
                        <div>Email: ebazar@gmail.com</div>
                        <div>Phone: +1 4506-7068</div>
                      </div>

                      <div className="col-sm-6">
                        <h6 className="mb-3">To:</h6>
                        <div>
                          <strong>{item.customerName}</strong>
                        </div>
                        <div>{item.customerAddress}</div>
                        <div>Email: {item.customerEmail}</div>
                      </div>
                    </div>

                    <div className="table-responsive-sm">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th className="text-center">#</th>
                            <th>Item</th>
                            <th>Description</th>
                            <th className="text-end">Item Cost</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-end">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>{item.productName}</td>
                            <td>{item.productId}</td>
                            <td className="text-end">Rs{item.totalPrice}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="row">
                      <div className="col-lg-4 col-sm-5"></div>

                      <div className="col-lg-4 col-sm-5 ms-auto">
                        <table className="table table-clear">
                          <tbody>
                            <tr>
                              <td>
                                <strong>Subtotal</strong>
                              </td>
                              <td className="text-end">Rs{item.totalPrice}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Tax(18%)</strong>
                              </td>
                              <td className="text-end">Rs{tax}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Total</strong>
                              </td>
                              <td className="text-end">
                                <strong>Rs{total}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
            <div className="row">
              <div className="col-lg-12">
                <h6>Terms & Conditions</h6>
                <p className="text-muted">
                  This Details for only Checking Purposes Modifying it and use
                  for any Other Purposes will lead to act against the law{" "}
                </p>
              </div>
              <div className="col-lg-12 text-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg my-1"
                  onClick={downloadInvoice}
                >
                  <i className="fa fa-download"></i> Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
