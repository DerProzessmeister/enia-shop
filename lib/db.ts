import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_PATH = path.join(process.cwd(), 'data', 'shop.db')

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

let db: Database.Database

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    initSchema()
  }
  return db
}

function initSchema() {
  const database = db
  
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      password_hash TEXT,
      phone TEXT,
      loyalty_points INTEGER DEFAULT 0,
      tier TEXT DEFAULT 'basis',
      email_verified INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS addresses (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      street TEXT NOT NULL,
      city TEXT NOT NULL,
      zip TEXT NOT NULL,
      country TEXT DEFAULT 'DE',
      is_default INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      user_id TEXT,
      guest_email TEXT,
      status TEXT DEFAULT 'pending',
      payment_status TEXT DEFAULT 'unpaid',
      payment_method TEXT,
      stripe_payment_id TEXT,
      stripe_session_id TEXT,
      subtotal REAL NOT NULL,
      shipping REAL DEFAULT 0,
      tax REAL NOT NULL,
      total REAL NOT NULL,
      shipping_name TEXT NOT NULL,
      shipping_street TEXT NOT NULL,
      shipping_city TEXT NOT NULL,
      shipping_zip TEXT NOT NULL,
      tracking_number TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      product_sku TEXT,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      image TEXT,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS wishlist (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(user_id, product_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      product_id INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      title TEXT,
      body TEXT NOT NULL,
      verified INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sample_requests (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      products TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS tickets (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      name TEXT NOT NULL,
      subject TEXT NOT NULL,
      category TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'open',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS ticket_replies (
      id TEXT PRIMARY KEY,
      ticket_id TEXT NOT NULL,
      message TEXT NOT NULL,
      is_staff INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
    );
  `)
}

// ── USER FUNCTIONS ─────────────────────────────
export function createUser(email: string, name: string, passwordHash: string) {
  const db = getDb()
  const id = crypto.randomUUID()
  db.prepare(`INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)`)
    .run(id, email, name, passwordHash)
  return id
}

export function getUserByEmail(email: string) {
  const db = getDb()
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any
}

export function getUserById(id: string) {
  const db = getDb()
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as any
}

// ── SESSION FUNCTIONS ──────────────────────────
export function createSession(userId: string) {
  const db = getDb()
  const id = crypto.randomUUID()
  const token = crypto.randomUUID() + crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  db.prepare(`INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)`)
    .run(id, userId, token, expiresAt)
  return { id, token, expiresAt }
}

export function getSessionByToken(token: string) {
  const db = getDb()
  return db.prepare(`
    SELECT s.*, u.id as userId, u.email, u.name, u.loyalty_points, u.tier
    FROM sessions s JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > datetime('now')
  `).get(token) as any
}

export function deleteSession(token: string) {
  const db = getDb()
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token)
}

// ── ORDER FUNCTIONS ────────────────────────────
export function createOrder(data: {
  userId?: string
  guestEmail?: string
  items: Array<{ productId: number; productName: string; productSku: string; price: number; quantity: number; image?: string }>
  subtotal: number
  shipping: number
  tax: number
  total: number
  paymentMethod: string
  shippingName: string
  shippingStreet: string
  shippingCity: string
  shippingZip: string
}) {
  const db = getDb()
  const id = crypto.randomUUID()
  const orderNumber = `BFH-${Date.now().toString().slice(-6)}`
  
  db.prepare(`
    INSERT INTO orders (id, order_number, user_id, guest_email, subtotal, shipping, tax, total, payment_method, shipping_name, shipping_street, shipping_city, shipping_zip)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, orderNumber, data.userId || null, data.guestEmail || null, data.subtotal, data.shipping, data.tax, data.total, data.paymentMethod, data.shippingName, data.shippingStreet, data.shippingCity, data.shippingZip)

  for (const item of data.items) {
    db.prepare(`
      INSERT INTO order_items (id, order_id, product_id, product_name, product_sku, price, quantity, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(crypto.randomUUID(), id, item.productId, item.productName, item.productSku, item.price, item.quantity, item.image || null)
  }

  return { id, orderNumber }
}

export function getOrdersByUserId(userId: string) {
  const db = getDb()
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(userId) as any[]
  return orders.map(o => ({
    ...o,
    items: db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id)
  }))
}

export function getOrderById(id: string) {
  const db = getDb()
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as any
  if (!order) return null
  return { ...order, items: db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(id) }
}

export function updateOrderPayment(orderId: string, stripeSessionId: string, paymentStatus = 'paid', status = 'processing') {
  const db = getDb()
  db.prepare(`
    UPDATE orders SET stripe_session_id = ?, payment_status = ?, status = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(stripeSessionId, paymentStatus, status, orderId)
}

export function updateOrderTracking(orderId: string, trackingNumber: string) {
  const db = getDb()
  db.prepare(`UPDATE orders SET tracking_number = ?, status = 'shipped', updated_at = datetime('now') WHERE id = ?`).run(trackingNumber, orderId)
}

// ── WISHLIST FUNCTIONS ─────────────────────────
export function addToWishlist(userId: string, productId: number) {
  const db = getDb()
  try {
    db.prepare('INSERT INTO wishlist (id, user_id, product_id) VALUES (?, ?, ?)').run(crypto.randomUUID(), userId, productId)
    return true
  } catch { return false }
}

export function removeFromWishlist(userId: string, productId: number) {
  const db = getDb()
  db.prepare('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?').run(userId, productId)
}

export function getWishlistByUserId(userId: string) {
  const db = getDb()
  return db.prepare('SELECT * FROM wishlist WHERE user_id = ? ORDER BY created_at DESC').all(userId) as any[]
}

// ── REVIEW FUNCTIONS ───────────────────────────
export function getReviewsByProductId(productId: number) {
  const db = getDb()
  return db.prepare(`
    SELECT r.*, u.name as user_name FROM reviews r
    LEFT JOIN users u ON r.user_id = u.id
    WHERE r.product_id = ? ORDER BY r.created_at DESC
  `).all(productId) as any[]
}

export function createReview(data: { userId?: string; productId: number; rating: number; title?: string; body: string }) {
  const db = getDb()
  db.prepare('INSERT INTO reviews (id, user_id, product_id, rating, title, body) VALUES (?, ?, ?, ?, ?, ?)')
    .run(crypto.randomUUID(), data.userId || null, data.productId, data.rating, data.title || null, data.body)
}

// ── TICKET FUNCTIONS ───────────────────────────
export function createTicket(data: { email: string; name: string; subject: string; category: string; message: string }) {
  const db = getDb()
  const id = crypto.randomUUID()
  db.prepare('INSERT INTO tickets (id, email, name, subject, category, message) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, data.email, data.name, data.subject, data.category, data.message)
  return id
}

export default getDb
