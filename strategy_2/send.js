const amqp = require('amqplib/callback_api')
amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1
    }
    let queue = 'hello'
    let msg = 'Hello World!'

    channel.assertQueue(queue, {
      durable: true,
    })
    let i = 1
    const timer = setInterval(() => {
      const new_msg = `${msg}: №${i}`
      channel.sendToQueue(queue, Buffer.from(JSON.stringify({ message_my: new_msg })), { persistent: true })
      console.log(' [x] Sent %s', new_msg)
      if (i === 1000) {
        clearInterval(timer)
        connection.close()
      }
      i++
    }, 1)
  })
})
