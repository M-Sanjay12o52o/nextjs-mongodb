import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;
const options = {};

if (!URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let client = new MongoClient(URI, options);
let clientPromise;

if (process.env.NODE_ENV !== 'production') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

// Log database connection status
clientPromise.then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1); // Exit the process if unable to connect
});

export default clientPromise;
