const amqp = require('amqplib/callback_api')
amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1
    }
    let queue = 'database'

    let msg = {text: 'Hello, World1!', sender: 12345, type: 'message'}
    let msg1 = {text: 'Hello!', sender: 12345, type: 'message'}
    let msg2 = {text: 'World1!', sender: 12345, type: 'message'}

    channel.assertQueue(queue, {
      durable: true,
    })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), { persistent: true })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg1)), { persistent: true })
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg2)), { persistent: true })
    console.log(' [x] Sent %s', JSON.stringify(msg))
  })
})
