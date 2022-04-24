const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
var cors = require('cors')

// REFERENCE: https://expressjs.com/en/resources/middleware/cors.html
// to allow cross origin requests from localt
var corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
}
app.use(bodyParser.json())
app.use(cors(corsOptions))
var turtlesimVelocityPub

const rclnodejs = require('rclnodejs');
rclnodejs.init().then(() => {
  const node = new rclnodejs.Node('publisher_example_node');
  var stringPublisher = node.createPublisher('std_msgs/msg/String', 'talker');
  stringPublisher.publish(`Hello ROS 2 from rclnodejs`);
  
  turtlesimVelocityPub = node.createPublisher('geometry_msgs/msg/Twist', 'turtle1/cmd_vel');
  node.spin();
});
  
app.get('/', (req, res) => {
  res.send({ data: 'Hello World!' })
})

app.get('/turtlesim/up', (req, res) => {
  let twistMsg = rclnodejs.createMessageObject('geometry_msgs/msg/Twist');
  twistMsg.linear = {
    x: 2.0,
    y: 0.0,
    z: 0.0
  }
  twistMsg.angular = {
    x: 0.0,
    y: 0.0,
    z: 0.0
  }
  turtlesimVelocityPub.publish(twistMsg)
  res.send({ data: twistMsg})
})

app.get('/turtlesim/down', (req, res) => {
  let twistMsg = rclnodejs.createMessageObject('geometry_msgs/msg/Twist');
  twistMsg.linear = {
    x: -2.0,
    y: 0.0,
    z: 0.0
  }
  twistMsg.angular = {
    x: 0.0,
    y: 0.0,
    z: 0.0
  }
  turtlesimVelocityPub.publish(twistMsg)
  res.send({ data: twistMsg})
})

app.get('/turtlesim/left', (req, res) => {
  let twistMsg = rclnodejs.createMessageObject('geometry_msgs/msg/Twist');
  twistMsg.linear = {
    x: 0.0,
    y: 0.0,
    z: 0.0
  }
  twistMsg.angular = {
    x: 0.0,
    y: 0.0,
    z: 2.0
  }
  turtlesimVelocityPub.publish(twistMsg)
  res.send({ data: twistMsg})
})

app.get('/turtlesim/right', (req, res) => {
  let twistMsg = rclnodejs.createMessageObject('geometry_msgs/msg/Twist');
  twistMsg.linear = {
    x: 0.0,
    y: 0.0,
    z: 0.0
  }
  twistMsg.angular = {
    x: 0.0,
    y: 0.0,
    z: -2.0
  }
  turtlesimVelocityPub.publish(twistMsg)
  res.send({ data: twistMsg})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

