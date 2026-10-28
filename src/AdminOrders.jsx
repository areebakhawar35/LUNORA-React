
import { useCallback, useEffect, useMemo, useState } from "react";
import "./AdminOrders.css";

const API_URL = "http://localhost:5000/api/orders";

function money(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;
}

function dateLabel(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleString("en-PK", {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

export default function AdminOrders({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load orders.");
      }

      if (!Array.isArray(data)) {
        throw new Error("The server returned an unexpected response.");
      }

      setOrders(data);
      setSelected((current) =>
        current
          ? data.find(
              (order) =>
                order.orderId === current.orderId ||
                order._id === current._id
            ) || null
          : null
      );
    } catch (err) {
      setError(
        `${err.message} Make sure your backend and MongoDB are running.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return orders;

    return orders.filter((order) => {
      const customer = order.customer || {};
      return [
        order.orderId,
        customer.name,
        customer.email,
        customer.phone,
        customer.city,
        order.status,
      ].some((value) =>
        String(value || "").toLowerCase().includes(term)
      );
    });
  }, [orders, search]);

  const totalSales = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const totalItems = orders.reduce(
    (sum, order) =>
      sum +
      (Array.isArray(order.items)
        ? order.items.reduce(
            (itemSum, item) =>
              itemSum + Number(item.quantity || 1),
            0
          )
        : 0),
    0
  );

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div className="admin-brand">
          <span>LUNORA.</span>
          <small>ORDER MANAGEMENT</small>
        </div>

        <div className="admin-header-actions">
          <button
            className="admin-secondary-button"
            onClick={loadOrders}
            disabled={loading}
            type="button"
          >
            {loading ? "Loading..." : "↻ Refresh orders"}
          </button>

          {onBack && (
            <button
              className="admin-secondary-button"
              onClick={onBack}
              type="button"
            >
              ← Back to store
            </button>
          )}
        </div>
      </header>

      <section className="admin-intro">
        <p className="admin-eyebrow">YOUR STORE AT A GLANCE</p>
        <h1>Orders <em>dashboard.</em></h1>
        <p>Review customer orders saved in your LUNORA database.</p>
      </section>

      {error && (
        <div className="admin-error" role="alert">
          <strong>Could not load orders</strong>
          <p>{error}</p>
          <button onClick={loadOrders} type="button">
            Try again
          </button>
        </div>
      )}

      <section className="admin-stats">
        <article className="admin-stat">
          <span>Total orders</span>
          <strong>{orders.length}</strong>
          <small>Orders stored in MongoDB</small>
        </article>

        <article className="admin-stat">
          <span>Total order value</span>
          <strong>{money(totalSales)}</strong>
          <small>Combined value, not verified payments</small>
        </article>

        <article className="admin-stat">
          <span>Items ordered</span>
          <strong>{totalItems}</strong>
          <small>Based on saved item quantities</small>
        </article>
      </section>

      <section className="admin-orders-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="admin-eyebrow">CUSTOMER ACTIVITY</p>
            <h2>Recent orders</h2>
          </div>
          <span className="admin-order-count">
            {filteredOrders.length} shown
          </span>
        </div>

        <label className="admin-search">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search order number, customer, email or city..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        {loading && orders.length === 0 ? (
          <div className="admin-empty">Loading orders from MongoDB…</div>
        ) : filteredOrders.length === 0 ? (
          <div className="admin-empty">
            <span>◇</span>
            <h3>{orders.length ? "No matching orders" : "No orders yet"}</h3>
            <p>
              {orders.length
                ? "Try another search term."
                : "Orders placed through the connected checkout will appear here."}
            </p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id || order.orderId}>
                    <td>
                      <strong>{order.orderId || order._id}</strong>
                    </td>
                    <td>
                      <strong>{order.customer?.name || "—"}</strong>
                      <small>{order.customer?.email || ""}</small>
                    </td>
                    <td>{dateLabel(order.placedAt || order.createdAt)}</td>
                    <td>
                      {Array.isArray(order.items)
                        ? order.items.reduce(
                            (sum, item) =>
                              sum + Number(item.quantity || 1),
                            0
                          )
                        : 0}
                    </td>
                    <td>{money(order.total)}</td>
                    <td>
                      <span className="admin-status">
                        {order.status || "Order placed"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="admin-view-button"
                        type="button"
                        onClick={() => setSelected(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selected && (
        <div
          className="admin-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <section
            className="admin-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-detail-title"
          >
            <div className="admin-detail-heading">
              <div>
                <p className="admin-eyebrow">ORDER INFORMATION</p>
                <h2 id="admin-detail-title">
                  {selected.orderId || selected._id}
                </h2>
              </div>
              <button
                className="admin-close-button"
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close order details"
              >
                ×
              </button>
            </div>

            <div className="admin-customer-details">
              <h3>Customer</h3>
              <p><strong>Name:</strong> {selected.customer?.name || "—"}</p>
              <p><strong>Phone:</strong> {selected.customer?.phone || "—"}</p>
              <p><strong>Email:</strong> {selected.customer?.email || "—"}</p>
              <p><strong>Address:</strong> {selected.customer?.address || "—"}</p>
              <p><strong>City:</strong> {selected.customer?.city || "—"}</p>
              <p><strong>Postal code:</strong> {selected.customer?.postalCode || "—"}</p>
              <p><strong>Payment method:</strong> {selected.customer?.payment || "—"}</p>
              <p><strong>Placed:</strong> {dateLabel(selected.placedAt || selected.createdAt)}</p>
              <p><strong>Status:</strong> {selected.status || "Order placed"}</p>
            </div>

            <h3 className="admin-items-title">Items</h3>
            <div className="admin-detail-items">
              {(selected.items || []).map((item, index) => (
                <article
                  className="admin-detail-item"
                  key={item.id || item._id || `${item.name}-${index}`}
                >
                  {item.image && (
                    <img src={item.image} alt={item.name || "Ordered bed"} />
                  )}
                  <div>
                    <strong>{item.name || item.fullName || "Product"}</strong>
                    <small>Quantity: {Number(item.quantity || 1)}</small>
                  </div>
                  <strong>
                    {money(Number(item.price || 0) * Number(item.quantity || 1))}
                  </strong>
                </article>
              ))}
            </div>

            <div className="admin-detail-total">
              <span>Order total</span>
              <strong>{money(selected.total)}</strong>
            </div>

            <p className="admin-private-note">
              Customer information is private. Keep this dashboard restricted
              to authorized store staff.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
