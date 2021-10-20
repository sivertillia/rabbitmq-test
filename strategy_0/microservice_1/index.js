import { connectRabbit, createChannel } from './channel';


(async ()=> {
  const connectionGlobal = await connectRabbit()
  const queue = 'database'
  const queue2 = 'microservice_3'
  const channel_1 = await createChannel(connectionGlobal, queue)
  const channel_2 = await createChannel(connectionGlobal, queue2)
  channel_1.sendToQueue(queue, Buffer.from(JSON.stringify({text: 'lol'})), { persistent: true })
  channel_2.sendToQueue(queue2, Buffer.from(JSON.stringify({text: 'microservice_3'})), { persistent: true })
})()