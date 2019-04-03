/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid4');

/**
 * User schema
 */

const MemoSchema = new Schema({
  uuid: { type: String, default: uuid() },
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  summary: { type: String, default: '' },
  tags: { type: [String], default: '' },
  user_id: { type: String },
  created_time: { type: Date },
  updated_time: { type: Date }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

MemoSchema.method({});

/**
 * Statics
 */

MemoSchema.static({});

/**
 * Register
 */

mongoose.model('Memo', MemoSchema);
