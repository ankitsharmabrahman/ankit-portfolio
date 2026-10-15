
import express from 'express';

import bcrypt from 'bcryptjs';

import 'dotenv/config';

import jwt from 'jsonwebtoken';

import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  const token =
    authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

  if (!token) {
    return res.status(401).json({
      message: 'Authentication required'
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== 'admin') {
      return res.status(403).json({
        message: 'Forbidden'
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
}





const dbName = 'portfolioAnkit';
const url = process.env.MONGODB_URI;

const client = new MongoClient(url);

client.connect()
  .then((connection) => {
    console.log('MongoDB connected successfully');

    const db = connection.db(dbName);

    // API 1: Fetch all contact messages
    app.get('/api/contacts',verifyAdmin, async (req, resp) => {
      try {
        const collection = db.collection('contacts');

        const result = await collection.find().toArray();
        resp.send(result);
      } catch (error) {
        resp.status(500).send({
          message: 'Error fetching contacts',
          success: false
        });
      }
    });


    app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminEmail || !passwordHash || !jwtSecret) {
      return res.status(500).json({
        message: 'Admin authentication is not configured'
      });
    }

    const isEmailCorrect =
      email.trim().toLowerCase() === adminEmail.trim().toLowerCase();

    const isPasswordCorrect = await bcrypt.compare(
      password,
      passwordHash
    );

    if (!isEmailCorrect || !isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      jwtSecret,
      { expiresIn: '1h' }
    );

    return res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error('Admin login error:', error);

    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
});

    
app.delete('/api/contacts/:id', verifyAdmin, async (req, resp) => {
  try {
    const { ObjectId } = await import('mongodb');

    const collection = db.collection('contacts');

    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return resp.status(404).send({
        message: 'Message not found',
        success: false
      });
    }

    resp.send({
      message: 'Message deleted successfully',
      success: true
    });
  } catch (error) {
    resp.status(400).send({
      message: 'Error deleting message',
      success: false
    });
  }
});





    // API 2: Save contact form data
    app.post('/api/contacts', async (req, resp) => {
      try {
        console.log(req.body);

        const collection = db.collection('contacts');

        const result = await collection.insertOne({
          name: req.body.name,
          email: req.body.email,
          message: req.body.message
        });

        resp.send({
          message: 'Contact saved successfully',
          success: true,
          insertedId: result.insertedId
        });
      } catch (error) {
        resp.status(500).send({
          message: 'Error saving contact',
          success: false
        });
      }
    });


    

    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });
