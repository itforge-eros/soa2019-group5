const mongoose = require('mongoose');
const uuid = require('uuid4');
const Memo = mongoose.model('Memo');

exports.all = async function(req, res) {
  const memos = await Memo.find({});
  res.send(memos);
};

exports.create = async function(req, res) {
  const memo = new Memo({ uuid: uuid(), created_time: Date.now() });
  memo.save();
  res.status(201);
  res.set({ Location: `/api/memos/${memo.uuid}` });
  res.end();
};

exports.get = async function(req, res) {
  const memo = await Memo.findOne({ uuid: req.params.uuid });
  res.send(memo);
};

exports.update = async function(req, res) {
  const memo = await Memo.findOneAndUpdate(
    { uuid: req.params.uuid },
    req.body,
    { new: true }
  );
  res.send(memo);
};

exports.delete = async function(req, res) {
  await Memo.remove({
    uuid: req.params.uuid
  });
  res.send();
};
