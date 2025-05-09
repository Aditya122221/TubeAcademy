import mongoose from "mongoose";

const email_from_clientSchema = new mongoose.Schema({
  query_ID: {
      type: Number
  },
  Registration_ID: {
    type: Number
  },
  fullname: {
    type: String
  },
  email: {
    type: String
  },
  message: {
    type: String
  },
  queryDate: {
    type: String
  },
  replyMessage: {
    type: String
  },
  resolveDate: {
    type: String
  },
  status: {
    type: String
  }
});

const email_from_client = mongoose.model(
  "email_from_client",
  email_from_clientSchema
);

export default email_from_client;
