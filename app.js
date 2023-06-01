const express = require('express');
const config = require('config');
const { MongoClient } = require('mongodb');
const path = require('path');
const corsMiddleware = require('./middleware/cors.middleware');

const app = express();

const dbName = 'food-app-db';
const menuCollectionName = 'restaurant-menu';
const restaurantsCollectionName = 'restaurants';
const ordersCollectionName = 'orders-history';

app.use(corsMiddleware);
app.use(express.json({ extended: true }));
const client = new MongoClient(config.get('mongoUri'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/restaurants', async (req, res) => {
  try {
    const collection = client.db(dbName).collection(restaurantsCollectionName);

    const restaurants = await collection.find().toArray();

    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/menu/:restaurantName', async (req, res) => {
  try {
    const collection = client.db(dbName).collection(menuCollectionName);

    const { restaurantName } = req.params;

    const menu = await collection.findOne({ name: restaurantName });

    if (menu) {
      res.json(menu);
    } else {
      res.status(404).json({ error: 'Menu not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/orders-history/:searchBy', async (req, res) => {
  try {
    const { searchBy } = req.params;

    const searchField = searchBy.includes('@')
      ? 'client.email'
      : 'client.phone';

    const collection = client.db(dbName).collection(ordersCollectionName);

    const clientOrder = await collection.findOne({ [searchField]: searchBy });

    if (clientOrder) {
      res.json(clientOrder);
    } else {
      res.json({ message: 'Client not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/orders', async (req, res) => {
  try {
    const { client: customer, orders, totalPrice } = req.body;

    const collection = client.db(dbName).collection(ordersCollectionName);

    const existingOrder = await collection.findOne({
      'client.email': customer.email,
    });

    if (existingOrder) {
      existingOrder.orders.push({
        dishesList: orders,
        totalOrderPrice: totalPrice,
      });
      existingOrder.totalPrice += req.body.totalPrice;

      await collection.replaceOne(
        { 'client.email': customer.email },
        existingOrder
      );
    } else {
      const newCustomerOrders = {
        client: { ...customer },
        orders: [{ dishesList: orders, totalOrderPrice: totalPrice }],
        totalPrice,
      };
      await collection.insertOne(newCustomerOrders);
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = config.get('port') ?? 5000;

async function start() {
  try {
    await client.connect();

    app.listen(PORT, () =>
      console.log(`app has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
