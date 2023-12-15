import mongoose from 'mongoose';
import { gql } from 'apollo-server';

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Task = mongoose.model('Task', TaskSchema);

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String!
  }

  type Query {
    getTask(id: ID!): Task
    getAllTasks: [Task]
  }

  type Mutation {
    createTask(title: String!, description: String): Task
    updateTask(id: ID!, title: String, description: String): Task
    deleteTask(id: ID!): Task
  }
`;

const resolvers = {
  Query: {
    getTask: async (_, { id }) => {
      return await Task.findById(id);
    },
    getAllTasks: async () => {
      return await Task.find();
    },
  },
  Mutation: {
    createTask: async (_, { title, description }) => {
      const task = new Task({ title, description });
      await task.save();
      return task;
    },
    updateTask: async (_, { id, title, description }) => {
      return await Task.findByIdAndUpdate(id, { title, description }, { new: true });
    },
    deleteTask: async (_, { id }) => {
      return await Task.findByIdAndDelete(id);
    },
  },
};

export { Task, typeDefs, resolvers };
