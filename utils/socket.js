module.exports = (io) => {
  // 服务端监听连接状态：io的connection事件表示客户端与服务端成功建立连接，它接收一个回调函数，回调函数会接收一个socket参数。
  var messageData = [];
  io.on("connection", (socket) => {
    // 与客户端对应的接收指定的消息
    // socket.broadcast.emit()表示向除了自己以外的客户端发送消息
    // socket.broadcast.emit("message", { msg: messageData });
    socket.on("submit", (data) => {
      console.log(data);
      messageData.push(data);
      io.emit("message", { msg: data });
    });
    // 监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
    socket.on("disconnect", () => {
      io.emit("message", { msg: messageData });
      console.log("connect disconnect");
    });
    // socket.disconnect();
  });
};
