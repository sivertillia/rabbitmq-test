const amqp = require('amqplib/callback_api')

function sleep(milliseconds) {
  const date = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1
    }
    let queue = 'hello'

    channel.assertQueue(queue, {
      durable: true,
    })

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue)
    channel.consume(queue, (msg) => {
      const obj = JSON.parse(msg.content)
      console.log(' [x] Received %s', obj.message_my)
      sleep(2000)
    }, {
      noAck: true,
    })
  })
})
