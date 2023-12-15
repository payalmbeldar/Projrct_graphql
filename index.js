import { MongoClient } from 'mongodb';
import express from 'express'; 
import mongoose from 'mongoose';
import { Task, typeDefs, resolvers } from './atlas.js'; // Import resolvers from atlas.js
import { ApolloServer } from 'apollo-server-express'; 


const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();
mongoose.connect("mongodb+srv://payalmbeldar2023:AHm3NTPRBQDA8ylr@testdb.y5qi1n7.mongodb.net/?retryWrites=true&w=majority")
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});







//-----------FOR LOCAL------------//
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);


// const database = 'LocalDtaabse'
// async function getData(){
//     let result = await client.connect()
//     let db = result.db(database)
//     let collection = db.collection('GraphQL')
//    let response= await collection.find({}).toArray()
//    console.log(response)
// };

// getData();
