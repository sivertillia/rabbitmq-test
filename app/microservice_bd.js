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
    let queue = 'database'


    channel.assertQueue(queue, {
      durable: true,
    })

    //TODO create global channel

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue)
    channel.consume(queue, (msg) => {
      const obj = JSON.parse(msg.content)
      console.log(' [x] Received %s', obj.text)
      if (logger(obj.type)) {
        sendMQ(connection, obj)
      }
    }, {
      noAck: true,
    })
  })
  connection.createChannel(function (error2, channel) {
    if (error2) {
      throw error2
    }
    let queue = 'database'


    channel.assertQueue(queue, {
      durable: true,
    })

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue)
    channel.consume(queue, (msg) => {
      const obj = JSON.parse(msg.content)
      console.log(' [x] Received %s', obj.text)
      if (logger(obj.type)) {
        sendMQ(channel, obj)
      }
    }, {
      noAck: true,
    })
  })
})

function logger(type) {
  console.log(`Object type: ${type}`)
  if (type === 'message') return true
  return false
}

function sendMQ(connection, data) {
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1
    }
    let queue2 = 'microservice'
    data.id = 'Super ID'

    channel.assertQueue(queue2, {
      durable: true,
    })
    channel.sendToQueue(queue2, Buffer.from(JSON.stringify(data)), { persistent: true })
    console.log(' [x] Sent %s: %s ', JSON.stringify(data), queue2)
  })
}