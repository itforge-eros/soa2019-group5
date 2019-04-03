const mongoose = require('mongoose');
const uuid = require('uuid4');
const Memo = mongoose.model('Memo');

const NOT_FOUND = { message: 'Not found', error_code: 404 };

exports.all = async function(req, res) {
  const memos = await Memo.find({ user_id: req.user.user_id });
  res.send(memos);
};

exports.create = async function(req, res) {
  const memo = new Memo({
    uuid: uuid(),
    user_id: req.user.user_id,
    created_time: Date.now()
  });
  memo.save();
  res.status(201);
  res.set({ Location: `/api/memos/${memo.uuid}` });
  res.end();
};

exports.get = async function(req, res) {
  const memo = await Memo.findOne({
    uuid: req.params.uuid,
    user_id: req.user.user_id
  });
  if (!memo) {
    res.status(404);
    res.json(NOT_FOUND);
    res.end();
  }
  res.send(memo);
};

exports.update = async function(req, res) {
  const unwrap = ({ title, content, tags, summary }) => ({
    title,
    content,
    tags,
    summary
  });
  const memo = await Memo.findOneAndUpdate(
    { uuid: req.params.uuid, user_id: req.user.user_id },
    { ...unwrap(req.body), updated_time: Date.now() },
    { new: true }
  );
  if (!memo) {
    res.status(404);
    res.json(NOT_FOUND);
    res.end();
  }
  res.send(memo);
};

exports.delete = async function(req, res) {
  const memo = await Memo.findOneAndDelete({
    uuid: req.params.uuid,
    user_id: req.user.user_id
  });
  if (!memo) {
    res.status(404);
    res.json(NOT_FOUND);
    res.end();
  }
  res.send();
};
