const amqp = require('amqplib/callback_api')
amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1
    }
    let queue = 'task_queue'
    let msg = 'Hello World!'

    channel.assertQueue(queue, {
      durable: false,
    })
    channel.sendToQueue(queue, Buffer.from(msg))
    console.log(' [x] Sent %s', msg)
    // connection.close()
  })
})
