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
var turtle1VelocityPub
var turtle1CurrentPose
const rclnodejs = require('rclnodejs');
rclnodejs.init().then(() => {
  const node = new rclnodejs.Node('publisher_example_node');
  var stringPublisher = node.createPublisher('std_msgs/msg/String', 'talker');
  stringPublisher.publish(`Hello ROS 2 from rclnodejs`);
  
  turtle1VelocityPub = node.createPublisher('geometry_msgs/msg/Twist', 'turtle1/cmd_vel');
  node.createSubscription('turtlesim/msg/Pose', 'turtle1/pose', (msg) => {
    turtle1CurrentPose = msg;
  });
  node.spin();
});

app.get('/turtlesim/pose', (req, res) => {
  res.send({ data: turtle1CurrentPose })
})

app.post('/turtlesim/cmd_vel', (req, res) => {
  const twistMsg = req.body;
  console.log("Publishing TwistMsg: \n", req.body)
  turtle1VelocityPub.publish(twistMsg)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

