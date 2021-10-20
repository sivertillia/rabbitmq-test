import amqp from 'amqplib/callback_api'

export const connectRabbit = () => {
  return new Promise((resolve, reject) => {
    amqp.connect('amqp://localhost', (error, connection) => {
      if (error) reject(error)
      resolve(connection)
    })
  })
}

export const createChannel = (connection, queue) => {
  return new Promise(resolve => {
    connection.createChannel((error, channel) => {
      if (error) throw error
      channel.assertQueue(queue, {
        durable: true,
      })
      resolve(channel)
    })
  })
}