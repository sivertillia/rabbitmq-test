const amqp = require('amqplib/callback_api')
const { connectRabbit, createChannel } = require('./channel');


(async () => {
  const connection = await connectRabbit()
  const queue = 'microservice_3'
  const channel = await createChannel(connection, queue)
  channel.consume(queue, (msg) => {
    const obj = JSON.parse(msg.content)
    console.log(' [x] Received %s', JSON.stringify(obj))
  }, {
    noAck: false,
  })
})()