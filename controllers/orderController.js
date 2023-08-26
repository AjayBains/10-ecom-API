const createOrder = async (req, res) => {
  res.send("create order");
};
const getAllOrders = async (req, res) => {
  res.send("get all orders");
};
const getSingleOrder = async (req, res) => {
  res.send("getSingleOrder");
};
const getCurrentUserOrders = async (req, res) => {
  res.send("get Current User Orders");
};
const updateOrder = async (req, res) => {
  res.send("updateOrder");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
