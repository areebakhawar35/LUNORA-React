import { useEffect, useState } from "react";
import "./App.css";

const products = [
  {
    id: "aurelia",
    name: "Aurelia",
    fullName: "The Aurelia Bed",
    price: 185000,
    badge: "BESTSELLER",
    type: "UPHOLSTERED COLLECTION",
    color: "Soft beige · King / Queen",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "oakwood",
    name: "Oakwood",
    fullName: "The Oakwood Bed",
    price: 159000,
    badge: "TIMELESS CLASSIC",
    type: "WOODEN COLLECTION",
    color: "Natural walnut · King / Queen",
    image:
      "https://furnitureworldpk.com/cdn/shop/files/king-size-luxury-bed-full-interior.png?v=1790650878&width=3840",
  },
  {
    id: "solace",
    name: "Solace",
    fullName: "The Solace Bed",
    price: 142000,
    badge: "CUSTOMER FAVOURITE",
    type: "MINIMAL COLLECTION",
    color: "Warm ivory · Queen / King",
    image:
      "https://furnitureworldpk.com/cdn/shop/files/modern-boucle-luxury-bed-furniture-world.jpg?v=1788792925&width=3840",
  },
  {
    id: "haven",
    name: "Haven",
    fullName: "The Haven Bed",
    price: 198000,
    badge: "SMART LIVING",
    type: "STORAGE COLLECTION",
    color: "Sand beige · King / Queen",
    image: "https://pinewood.pk/wp-content/uploads/2026/01/864k5qyk-1.webp",
  },
  {
    id: "celeste",
    name: "Celeste",
    fullName: "The Celeste Bed",
    price: 172000,
    badge: "NEW ARRIVAL",
    type: "SIGNATURE COLLECTION",
    color: "Classic white · King / Queen",
    image:
      "https://images.unsplash.com/photo-1740446565643-fe07baa1317e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "willow",
    name: "Willow",
    fullName: "The Willow Bed",
    price: 164000,
    badge: "NATURAL LIVING",
    type: "WOODEN COLLECTION",
    color: "Warm wood · King / Queen",
    image:
      "https://images.unsplash.com/photo-1723111568816-48c31eca8132?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "ivory",
    name: "Ivory",
    fullName: "The Ivory Bed",
    price: 176000,
    badge: "SOFT & SERENE",
    type: "UPHOLSTERED COLLECTION",
    color: "Ivory cream · King / Queen",
    image:
      "https://renome.pk/wp-content/uploads/2026/07/Calrune-Fabric-Bed-1024x872.jpg",
  },
  {
    id: "monroe",
    name: "Monroe",
    fullName: "The Monroe Bed",
    price: 189000,
    badge: "MODERN CLASSIC",
    type: "CONTEMPORARY COLLECTION",
    color: "Neutral taupe · King / Queen",
    image:
      "https://renome.pk/wp-content/uploads/2025/11/Zenvoro-Double-Bed-1-scaled-1200x900.jpg",
  },
  {
    id: "elara",
    name: "Elara",
    fullName: "The Elara Bed",
    price: 151000,
    badge: "ELEGANT DESIGN",
    type: "MINIMAL COLLECTION",
    color: "Soft white · King / Queen",
    image:
      "https://bestbed.co.uk/cdn/shop/files/Bournemouth_Luxury_cloud_bed_frame_With_Ottoman_Storage_3FT_to_6FT_2.png?v=1764157889",
  },
  {
    id: "serene",
    name: "Serene",
    fullName: "The Serene Bed",
    price: 168000,
    badge: "RELAXED LUXURY",
    type: "COMFORT COLLECTION",
    color: "Natural linen · King / Queen",
    image:
      "https://images.unsplash.com/photo-1721742607571-c32867de0921?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "freya",
    name: "Freya",
    fullName: "The Freya Bed",
    price: 193000,
    badge: "TIMELESS COMFORT",
    type: "LUXURY COLLECTION",
    color: "Warm beige · King / Queen",
    image:
      "https://uberdecor.in/cdn/shop/files/870f475b-425e-4412-bb40-5a9220125c2a.jpg?crop=center&height=645&v=1787480649&width=645",
  },
  {
    id: "everly",
    name: "Everly",
    fullName: "The Everly Bed",
    price: 205000,
    badge: "LUNORA EXCLUSIVE",
    type: "SIGNATURE COLLECTION",
    color: "Soft neutral · King / Queen",
    image:
      "https://thehome.ae/wp-content/uploads/2026/08/Upholstered-Bed-1.webp",
  },
];

const categories = [
  { name: "Upholstered Beds", image: products[0].image },
  { name: "Wooden Beds", image: products[1].image },
  { name: "Minimal Beds", image: products[2].image },
  { name: "Storage Beds", image: products[3].image },
];

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function formatPrice(price) {
  return `Rs. ${Number(price).toLocaleString("en-PK")}`;
}

function Storefront() {
  const [displayProducts, setDisplayProducts] = useState(products);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error(`Products API returned status ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setDisplayProducts(
            data.map((product) => ({
              ...product,
              id: String(product.id ?? product._id),
              fullName:
                product.fullName ?? product.name ?? "LUNORA Bed",
              name: product.name ?? product.fullName ?? "LUNORA Bed",
              image: product.image ?? products[0].image,
              price: Number(product.price ?? 0),
            })),
          );
        }
      } catch (error) {
        console.error(
          "Could not load LUNORA products from MongoDB. Showing the original products instead.",
          error,
        );
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const [cart, setCart] = useState(() => readStorage("lunoraCart", []));
  const [wishlist, setWishlist] = useState(() =>
    readStorage("lunoraWishlist", []),
  );
  const [orders, setOrders] = useState(() => readStorage("lunoraOrders", []));
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);
  const [returnRequests, setReturnRequests] = useState(() =>
    readStorage("lunoraReturnRequests", []),
  );
  const [returnMessage, setReturnMessage] = useState("");
  const [returnReference, setReturnReference] = useState("");

  useEffect(() => {
    localStorage.setItem("lunoraCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("lunoraWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("lunoraOrders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(
      "lunoraReturnRequests",
      JSON.stringify(returnRequests),
    );
  }, [returnRequests]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || checkoutOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, checkoutOpen]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setCartOpen(false);
        setCheckoutOpen(false);
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  function addToCart(product) {
    const productId = String(product.id ?? product._id);
    const productName =
      product.fullName ?? product.name ?? "LUNORA Bed";

    setCart((current) => {
      const existing = current.find(
        (item) => String(item.id) === productId,
      );

      if (existing) {
        return current.map((item) =>
          String(item.id) === productId
            ? { ...item, quantity: Number(item.quantity || 0) + 1 }
            : item,
        );
      }

      return [
        ...current,
        {
          id: productId,
          name: productName,
          price: Number(product.price || 0),
          image: product.image,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
    setToast(`${productName} added to your bag!`);
  }

  function updateQuantity(id, change) {
    setCart((current) =>
      current
        .map((item) =>
          String(item.id) === String(id)
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + change,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(id) {
    setCart((current) =>
      current.filter((item) => String(item.id) !== String(id)),
    );
    setToast("Product removed from your bag.");
  }

  function toggleWishlist(product) {
    const productId = String(product.id ?? product._id);
    const isSaved = wishlist.some((id) => String(id) === productId);
    const productName = product.name ?? product.fullName ?? "This bed";

    setWishlist((current) =>
      isSaved
        ? current.filter((id) => String(id) !== productId)
        : [...current, productId],
    );

    setToast(
      isSaved
        ? `${productName} removed from your wishlist.`
        : `${productName} added to your wishlist!`,
    );
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleNewsletter(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    if (!email) {
      setEmailMessage("Please enter your email address.");
      return;
    }

    setEmailMessage("Thank you for joining the LUNORA community!");
    form.reset();
  }

  function handleReturnRequest(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const orderNumber = String(formData.get("orderNumber") || "").trim();
    const email = String(formData.get("returnEmail") || "").trim();

    if (!orderNumber || !email) {
      setReturnMessage("Please enter your order number and email address.");
      return;
    }

    const reference = `LUN-${Date.now().toString().slice(-8)}`;

    const request = {
      reference,
      orderNumber,
      email,
      reason: String(formData.get("returnReason") || "Other"),
      details: String(formData.get("returnDetails") || "").trim(),
      submittedAt: new Date().toISOString(),
    };

    setReturnRequests((current) => [request, ...current]);
    setReturnReference(reference);
    setReturnMessage(
      "Your return request has been saved in this browser.",
    );
    form.reset();
  }

  async function handlePlaceOrder(event) {
    event.preventDefault();
    setOrderMessage("");

    if (cart.length === 0) {
      setOrderMessage("Your bag is empty. Add a bed before checking out.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const customer = {
      name: String(formData.get("customerName") || "").trim(),
      phone: String(formData.get("customerPhone") || "").trim(),
      email: String(formData.get("customerEmail") || "").trim(),
      address: String(formData.get("customerAddress") || "").trim(),
      city: String(formData.get("customerCity") || "").trim(),
      postalCode: String(formData.get("postalCode") || "").trim(),
      paymentMethod: String(
        formData.get("paymentMethod") || "Cash on Delivery",
      ),
    };

    if (
      !customer.name ||
      !customer.phone ||
      !customer.email ||
      !customer.address ||
      !customer.city
    ) {
      setOrderMessage("Please complete all required delivery details.");
      return;
    }

    const orderPayload = {
      customer,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image,
      })),
      total: cartTotal,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "The order could not be saved.",
        );
      }

      const savedOrder = result.order ?? result;
      const confirmedOrder = {
        id:
          savedOrder.orderId ??
          savedOrder.id ??
          `LUN-${Date.now().toString().slice(-8)}`,
        customer,
        items: orderPayload.items,
        total: cartTotal,
        placedAt:
          savedOrder.placedAt ??
          savedOrder.createdAt ??
          new Date().toISOString(),
      };

      setOrders((current) => [confirmedOrder, ...current]);
      setPlacedOrder(confirmedOrder);
      setCart([]);
      setOrderMessage("");
    } catch (error) {
      setOrderMessage(
        `${error.message || "Could not place order."} Make sure your backend is running on port 5000.`,
      );
    }
  }
    return (
    <>
      <div className="announcement-bar">
        A BETTER NIGHT BEGINS HERE · DISCOVER THE LUNORA COLLECTION
      </div>

      <header className="navbar" id="home">
        <a className="logo" href="#home" onClick={closeMenu}>
          <span>LUNORA.</span>
          <small>THE ART OF BETTER SLEEP</small>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#collection" onClick={closeMenu}>Shop Beds</a>
          <a href="#story" onClick={closeMenu}>Our Story</a>
          <a href="#categories" onClick={closeMenu}>Inspiration</a>
          <a href="#returns" onClick={closeMenu}>Returns</a>
          <a href="#newsletter" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="nav-actions">
          <a className="search-icon" href="#collection" aria-label="Explore collection">
            ⌕
          </a>
          <button
            className="cart-link"
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open shopping bag, ${cartCount} items`}
          >
            Bag <span id="cartCount">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2200&q=90"
              alt="Elegant luxury bedroom with a beautifully styled bed"
            />
            <div className="hero-overlay" />
          </div>

          <div className="hero-content">
            <p className="eyebrow">THE NEW STANDARD OF COMFORT</p>
            <h1>
              Sleep in luxury.
              <br />
              Wake in wonder.
            </h1>
            <p className="hero-description">
              Thoughtfully designed beds for slower mornings, peaceful nights,
              and spaces that feel entirely yours.
            </p>
            <a className="button button-light" href="#collection">
              EXPLORE THE COLLECTION <span>↗</span>
            </a>
            <p className="hero-note">MADE FOR YOUR MOMENTS OF REST</p>
          </div>

          <div className="hero-pagination">
            <span>01</span>
            <span className="pagination-line" />
            <span>03</span>
          </div>

          <div className="hero-caption">THE LUNORA COLLECTION — 2026</div>
        </section>

        <section className="trust-strip">
          <div><span>✳</span><p>Thoughtful Design</p></div>
          <div><span>◇</span><p>Quality Materials</p></div>
          <div><span>✧</span><p>Comfort That Lasts</p></div>
          <div><span>⌂</span><p>Made for Your Home</p></div>
        </section>

        <section className="categories section-padding" id="categories">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR KIND OF COMFORT</p>
              <h2>Made for the way <em>you rest.</em></h2>
            </div>
            <a className="text-link" href="#collection">
              EXPLORE ALL BEDS ↗
            </a>
          </div>

          <div className="category-grid">
            {categories.map((category, index) => (
              <a
                className="category-card"
                href="#collection"
                key={category.name}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} loading="lazy" />
                </div>
                <div className="category-label">
                  <span>0{index + 1}</span>
                  <h3>{category.name}</h3>
                  <span>↗</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="collection section-padding" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED FOR YOUR SANCTUARY</p>
              <h2>The art of <em>restful living.</em></h2>
              <p className="section-description">
                Discover considered designs, beautiful materials and comfort
                that feels like coming home.
              </p>
            </div>
            <span className="product-count">
              {displayProducts.length} DESIGNS · MADE TO LAST
            </span>
          </div>

          <div className="product-grid">
            {displayProducts.map((product, index) => {
              const productId = String(product.id ?? product._id);
              const isSaved = wishlist.some(
                (id) => String(id) === productId,
              );

              return (
                <article className="product-card" key={productId}>
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={`${product.name} luxury bed`}
                      loading={index > 3 ? "lazy" : "eager"}
                    />

                    <span className="product-badge">
                      {product.badge || "LUNORA COLLECTION"}
                    </span>

                    <button
                      className={
                        isSaved ? "wishlist-button active" : "wishlist-button"
                      }
                      type="button"
                      aria-label={
                        isSaved
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      aria-pressed={isSaved}
                      onClick={() => toggleWishlist(product)}
                    >
                      {isSaved ? "♥" : "♡"}
                    </button>

                    <a className="quick-view" href="#story">
                      DISCOVER DESIGN ↗
                    </a>
                  </div>

                  <div className="product-meta">
                    <p className="product-type">
                      {product.type || "LUNORA COLLECTION"}
                    </p>

                    <div className="product-title-row">
                      <h3>{product.name}</h3>
                      <span className="product-price">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <p className="product-color">
                      {product.color || "King / Queen"}
                    </p>

                    <button
                      className="add-to-cart"
                      type="button"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO BAG <span>+</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="story section-padding" id="story">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=90"
              alt="Warm, peaceful interior designed for restful living"
              loading="lazy"
            />
          </div>

          <div className="story-content">
            <p className="eyebrow">A LITTLE ABOUT LUNORA</p>
            <h2>
              Your space.
              <br />
              Your <em>sanctuary.</em>
            </h2>
            <p>
              At LUNORA, we believe the bedroom should be your favourite place
              to return to. Every design begins with a simple idea: everyday
              comfort deserves extraordinary attention.
            </p>
            <a className="button button-dark" href="#newsletter">
              GET TO KNOW US <span>↗</span>
            </a>
          </div>
        </section>

        <section className="returns-section section-padding" id="returns">
          <div className="returns-intro">
            <p className="eyebrow">HERE TO HELP</p>
            <h2>Returns &amp; <em>replacements.</em></h2>
            <p>
              Need help with an order? Send us a request and keep your reference
              number for your records.
            </p>

            <div className="returns-note">
              <span>◇</span>
              <div>
                <strong>A little note</strong>
                <p>
                  This is a frontend demo. Requests are saved locally and are
                  not sent to a LUNORA team.
                </p>
              </div>
            </div>

            {returnRequests.length > 0 && (
              <div className="saved-requests">
                <p className="eyebrow">SAVED ON THIS DEVICE</p>
                <p>
                  {returnRequests.length} request
                  {returnRequests.length === 1 ? "" : "s"} saved in this browser.
                </p>

                {returnRequests.slice(0, 3).map((request) => (
                  <div className="saved-request" key={request.reference}>
                    <span>{request.reference}</span>
                    <span>
                      {request.requestType === "return" ? "Return" : "Replacement"}
                      {" · "}
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <form className="returns-form" onSubmit={handleReturnRequest}>
            <div className="returns-form-heading">
              <p className="eyebrow">LUNORA CUSTOMER CARE</p>
              <h3>Start a request</h3>
              <p>Fields marked with * are required.</p>
            </div>

            <label htmlFor="return-order-number">Order number *</label>
            <input
              id="return-order-number"
              name="orderNumber"
              type="text"
              placeholder="e.g. LUN-10248"
              required
              maxLength={60}
            />

            <label htmlFor="return-email">Email address *</label>
            <input
              id="return-email"
              name="returnEmail"
              type="email"
              placeholder="you@example.com"
              required
              maxLength={120}
            />

            <label htmlFor="return-request-type">
              What would you like to do? *
            </label>
            <select
              id="return-request-type"
              name="requestType"
              defaultValue="return"
              required
            >
              <option value="return">Return an order</option>
              <option value="replace">Replace an item</option>
            </select>

            <label htmlFor="return-reason">Reason for your request *</label>
            <select id="return-reason" name="reason" defaultValue="" required>
              <option value="" disabled>Select a reason</option>
              <option value="damaged">Item arrived damaged</option>
              <option value="wrong-item">Received the wrong item</option>
              <option value="quality">Quality concern</option>
              <option value="size">Size or fit issue</option>
              <option value="changed-mind">Changed my mind</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="return-notes">
              Additional details <span>(optional)</span>
            </label>
            <textarea
              id="return-notes"
              name="notes"
              rows={4}
              maxLength={1000}
              placeholder="Tell us a little more about your request..."
            />

            <button className="returns-submit" type="submit">
              SUBMIT REQUEST <span>↗</span>
            </button>

            <p className="returns-feedback" aria-live="polite">
              {returnMessage}
              {returnReference && <strong> Reference: {returnReference}</strong>}
            </p>
          </form>
        </section>

        <section className="newsletter section-padding" id="newsletter">
          <div>
            <p className="eyebrow">A NOTE FROM LUNORA</p>
            <h2>Make room for <em>better rest.</em></h2>
            <p>
              Join our community for new collections, thoughtful inspiration and
              little reminders to slow down.
            </p>
          </div>

          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <label className="visually-hidden" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Your email address"
              required
            />
            <button type="submit">JOIN US ↗</button>
            <p className="newsletter-message" aria-live="polite">
              {emailMessage}
            </p>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <a className="logo footer-logo" href="#home">
            <span>LUNORA.</span>
            <small>THE ART OF BETTER SLEEP</small>
          </a>

          <p>
            Thoughtfully designed beds for the moments that matter most.
          </p>

          <div className="footer-links">
            <div>
              <h4>EXPLORE</h4>
              <a href="#collection">Shop All Beds</a>
              <a href="#categories">Our Collections</a>
              <a href="#story">Our Story</a>
              <a href="#returns">Returns &amp; Replacements</a>
            </div>

            <div>
              <h4>NEED HELP?</h4>
              <a href="#newsletter">Contact Us</a>
              <a href="#newsletter">Join Our Community</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 LUNORA. ALL RIGHTS RESERVED.</span>
          <span>MADE FOR BETTER LIVING.</span>
        </div>
      </footer>
            {cartOpen && (
        <div
          className="cart-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCartOpen(false);
          }}
        >
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Your shopping bag"
          >
            <div className="cart-header">
              <div>
                <p className="eyebrow">YOUR LUNORA SELECTION</p>
                <h2>
                  Your Bag <span>({cartCount})</span>
                </h2>
              </div>

              <button
                className="cart-close"
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping bag"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <span className="empty-bag-icon">◇</span>
                <h3>Your bag is taking a little rest.</h3>
                <p>
                  Discover a beautiful bed and make your space feel like home.
                </p>
                <button
                  className="button button-dark"
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    document
                      .getElementById("collection")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  EXPLORE THE COLLECTION ↗
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <img
                        src={
                          item.image ||
                          displayProducts.find(
                            (product) => String(product.id) === String(item.id),
                          )?.image
                        }
                        alt={item.name}
                      />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{formatPrice(item.price)}</p>

                        <div className="quantity-controls">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="remove-item"
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                        >
                          REMOVE
                        </button>
                      </div>

                      <strong className="cart-item-total">
                        {formatPrice(item.price * item.quantity)}
                      </strong>
                    </article>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>

                  <p>
                    Delivery charges, if applicable, are calculated separately.
                  </p>

                  <button
                    className="cart-checkout"
                    type="button"
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutOpen(true);
                      setOrderMessage("");
                      setPlacedOrder(null);
                    }}
                  >
                    CONTINUE TO CHECKOUT ↗
                  </button>

                  <button
                    className="continue-shopping"
                    type="button"
                    onClick={() => setCartOpen(false)}
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div
          className="checkout-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setCheckoutOpen(false);
            }
          }}
        >
          <section
            className="checkout-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Checkout"
          >
            <div className="checkout-header">
              <div>
                <p className="eyebrow">LUNORA · SECURE CHECKOUT DEMO</p>
                <h2>
                  {placedOrder ? "Thank you." : "Complete your order."}
                </h2>
              </div>

              <button
                className="cart-close"
                type="button"
                onClick={() => setCheckoutOpen(false)}
                aria-label="Close checkout"
              >
                ✕
              </button>
            </div>

            {placedOrder ? (
              <div className="order-success">
                <div className="order-success-icon">✓</div>
                <p className="eyebrow">ORDER CONFIRMATION</p>
                <h3>Your order has been placed!</h3>

                <p className="order-reference">
                  Order number: <strong>{placedOrder.id}</strong>
                </p>

                <p>
                  Thank you, {placedOrder.customer.name}. Your order has been
                  saved.
                </p>

                <div className="order-success-total">
                  <span>Order total</span>
                  <strong>{formatPrice(placedOrder.total)}</strong>
                </div>

                <p className="checkout-demo-note">
                  This is a demonstration checkout. Cash on Delivery and bank
                  transfer are display options only; no online payment is
                  processed.
                </p>

                <button
                  className="cart-checkout"
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                >
                  CONTINUE SHOPPING ↗
                </button>
              </div>
            ) : (
              <div className="checkout-layout">
                <form className="checkout-form" onSubmit={handlePlaceOrder}>
                  <div className="checkout-form-heading">
                    <span>01</span>
                    <div>
                      <h3>Delivery information</h3>
                      <p>Where should we deliver your order?</p>
                    </div>
                  </div>

                  <label htmlFor="customer-name">Full name *</label>
                  <input
                    id="customer-name"
                    name="customerName"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                    maxLength={100}
                  />

                  <div className="checkout-two-columns">
                    <div>
                      <label htmlFor="customer-phone">Phone number *</label>
                      <input
                        id="customer-phone"
                        name="customerPhone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="03XX XXXXXXX"
                        required
                        maxLength={25}
                      />
                    </div>

                    <div>
                      <label htmlFor="customer-email">Email address *</label>
                      <input
                        id="customer-email"
                        name="customerEmail"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        maxLength={120}
                      />
                    </div>
                  </div>

                  <label htmlFor="customer-address">
                    Full delivery address *
                  </label>
                  <textarea
                    id="customer-address"
                    name="customerAddress"
                    autoComplete="street-address"
                    rows={3}
                    placeholder="House, street, area..."
                    required
                    maxLength={500}
                  />

                  <div className="checkout-two-columns">
                    <div>
                      <label htmlFor="customer-city">City *</label>
                      <input
                        id="customer-city"
                        name="customerCity"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="Your city"
                        required
                        maxLength={80}
                      />
                    </div>

                    <div>
                      <label htmlFor="postal-code">Postal code</label>
                      <input
                        id="postal-code"
                        name="postalCode"
                        type="text"
                        autoComplete="postal-code"
                        placeholder="Optional"
                        maxLength={20}
                      />
                    </div>
                  </div>

                  <div className="checkout-form-heading payment-heading">
                    <span>02</span>
                    <div>
                      <h3>Payment method</h3>
                      <p>Select a demo payment option.</p>
                    </div>
                  </div>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      defaultChecked
                    />
                    <span>
                      <strong>Cash on Delivery</strong>
                      <small>Pay when your order arrives</small>
                    </span>
                  </label>

                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Bank Transfer (Demo)"
                    />
                    <span>
                      <strong>Bank Transfer</strong>
                      <small>Demo option only — no payment is taken</small>
                    </span>
                  </label>

                  <p className="checkout-error" aria-live="polite">
                    {orderMessage}
                  </p>

                  <button
                    className="cart-checkout place-order-button"
                    type="submit"
                  >
                    PLACE ORDER · {formatPrice(cartTotal)} ↗
                  </button>

                  <p className="checkout-terms">
                    By placing this demo order, you confirm that the details
                    entered are correct.
                  </p>
                </form>

                <aside className="checkout-summary">
                  <p className="eyebrow">YOUR SELECTION</p>
                  <h3>Order summary</h3>

                  <div className="checkout-summary-items">
                    {cart.map((item) => (
                      <div className="checkout-summary-item" key={item.id}>
                        <img src={item.image} alt={item.name} />

                        <div>
                          <strong>{item.name}</strong>
                          <span>Qty: {item.quantity}</span>
                        </div>

                        <b>{formatPrice(item.price * item.quantity)}</b>
                      </div>
                    ))}
                  </div>

                  <div className="summary-total-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>

                  <div className="summary-total-row">
                    <span>Delivery</span>
                    <span>Calculated later</span>
                  </div>

                  <div className="summary-grand-total">
                    <span>Total</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>

                  <p className="checkout-demo-note">
                    Demo checkout only. Payments are not processed by this
                    website.
                  </p>
                </aside>
              </div>
            )}
          </section>
        </div>
      )}

      <div
        className={toast ? "toast show" : "toast"}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </>
  );
}

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function loadOrders() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/orders");

      if (!response.ok) {
        throw new Error("Orders load nahi ho sake. Backend check karo.");
      }

      const data = await response.json();
      const orderList = Array.isArray(data) ? data : data.orders;

      setOrders(Array.isArray(orderList) ? orderList : []);
    } catch (err) {
      setError(
        err.message || "Orders load nahi ho sake. Backend check karo."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const customer = order.customer || {};
    const searchableText = [
      order.orderId,
      order.id,
      customer.name,
      customer.email,
      customer.phone,
      order.status,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search.toLowerCase());
  });

  const totalSales = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f6f3ed",
      color: "#302b25",
      padding: "32px",
      fontFamily: "Arial, sans-serif",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
      marginBottom: "32px",
    },
    button: {
      border: "none",
      background: "#302b25",
      color: "#fff",
      padding: "12px 20px",
      cursor: "pointer",
      borderRadius: "4px",
    },
    input: {
      width: "100%",
      maxWidth: "420px",
      padding: "14px",
      border: "1px solid #ded8ce",
      borderRadius: "4px",
      background: "#fff",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    cards: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
      marginBottom: "28px",
    },
    card: {
      background: "#fff",
      border: "1px solid #e8e1d7",
      borderRadius: "6px",
      padding: "24px",
    },
    tableWrap: {
      overflowX: "auto",
      background: "#fff",
      border: "1px solid #e8e1d7",
      borderRadius: "6px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "750px",
    },
    cell: {
      padding: "15px",
      textAlign: "left",
      borderBottom: "1px solid #eee8df",
      fontSize: "14px",
    },
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <p style={{ letterSpacing: "4px", fontSize: "12px" }}>
              L U N O R A
            </p>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", margin: "8px 0" }}>
              Admin Dashboard
            </h1>
            <p style={{ color: "#81786d", margin: 0 }}>
              Store overview and customer orders
            </p>
          </div>

          <button
            style={styles.button}
            type="button"
            onClick={loadOrders}
            disabled={loading}
          >
            {loading ? "Loading..." : "↻ Refresh Orders"}
          </button>
        </header>

        <div style={styles.cards}>
          <section style={styles.card}>
            <p style={{ color: "#81786d" }}>Total Orders</p>
            <h2>{orders.length}</h2>
          </section>

          <section style={styles.card}>
            <p style={{ color: "#81786d" }}>Total Order Value</p>
            <h2>{formatPrice(totalSales)}</h2>
            <small style={{ color: "#81786d" }}>
              This is order value, not verified revenue.
            </small>
          </section>

          <section style={styles.card}>
            <p style={{ color: "#81786d" }}>Pending Orders</p>
            <h2>
              {
                orders.filter(
                  (order) =>
                    String(order.status || "pending").toLowerCase() ===
                    "pending"
                ).length
              }
            </h2>
          </section>
        </div>

        <section style={{ marginBottom: "22px" }}>
          <h2>Customer Orders</h2>
          <input
            style={styles.input}
            type="search"
            placeholder="Search by order ID, customer, email or status..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </section>

        {error && (
          <div
            role="alert"
            style={{
              background: "#fff0ed",
              color: "#9d3427",
              padding: "16px",
              marginBottom: "18px",
              borderRadius: "4px",
            }}
          >
            {error}
            <p style={{ marginBottom: 0 }}>
              Make sure your backend is running on port 5000.
            </p>
          </div>
        )}

        {loading ? (
          <p>Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <section style={styles.card}>
            <h3>No orders found</h3>
            <p style={{ color: "#81786d" }}>
              {orders.length === 0
                ? "Orders placed through checkout will appear here if your backend saves them."
                : "Try a different search term."}
            </p>
          </section>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr style={{ background: "#eee9df" }}>
                  {[
                    "Order ID",
                    "Customer",
                    "Contact",
                    "Items",
                    "Total",
                    "Status",
                  ].map((heading) => (
                    <th key={heading} style={styles.cell}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order, index) => {
                  const customer = order.customer || {};
                  const items = Array.isArray(order.items)
                    ? order.items
                    : Array.isArray(order.cart)
                      ? order.cart
                      : [];

                  return (
                    <tr key={order._id || order.id || order.orderId || index}>
                      <td style={styles.cell}>
                        {order.orderId || order.id || order._id || "—"}
                      </td>
                      <td style={styles.cell}>
                        <strong>{customer.name || "—"}</strong>
                        <br />
                        <small>{customer.city || ""}</small>
                      </td>
                      <td style={styles.cell}>
                        {customer.email || "—"}
                        <br />
                        <small>{customer.phone || ""}</small>
                      </td>
                      <td style={styles.cell}>
                        {items.reduce(
                          (sum, item) => sum + Number(item.quantity || 1),
                          0
                        )}
                      </td>
                      <td style={styles.cell}>
                        {formatPrice(order.total || 0)}
                      </td>
                      <td style={styles.cell}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "6px 10px",
                            borderRadius: "20px",
                            background:
                              String(order.status).toLowerCase() ===
                              "completed"
                                ? "#e2efe3"
                                : "#f4ead5",
                            color: "#514736",
                            fontSize: "12px",
                          }}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p style={{ color: "#81786d", fontSize: "12px", marginTop: "24px" }}>
          LUNORA Admin · Local development dashboard
        </p>
      </div>
    </main>
  );
}

function App() {
  const isAdminPage = window.location.pathname.replace(/\/+$/, "") === "/admin";

  return isAdminPage ? <AdminDashboard /> : <Storefront />;
}

export default App;
