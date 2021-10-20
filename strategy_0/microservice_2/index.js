const amqp = require('amqplib/callback_api')
const { connectRabbit, createChannel } = require('./channel');


(async () => {
  const connection = await connectRabbit()
  const queue = 'database'
  const queue2 = 'microservice_3'
  const channel = await createChannel(connection, queue)
  const channel2 = await createChannel(connection, queue2)
  channel.consume(queue, (msg) => {
    const obj = JSON.parse(msg.content)
    console.log(' [x] Received %s', JSON.stringify(obj))
    obj['id'] = Math.floor(Math.random() * 1000000)
    obj['date'] = Date.now()
    console.log(' [x] Date: %s ', obj.date)
    channel2.sendToQueue(queue2, Buffer.from(JSON.stringify(obj)))
    console.log(' [x] Sent %s', JSON.stringify(obj))
  })
})()