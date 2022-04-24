const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');

const rclnodejs = require('rclnodejs');

rclnodejs.init().then(() => {
  const node = new rclnodejs.Node('publisher_example_node');
  const publisher = node.createPublisher('std_msgs/msg/String', 'topic');
  publisher.publish(`Hello ROS 2 from rclnodejs`);

  // let counter = 0;
  // setInterval(() => {
  //   console.log(`Publishing message: Hello ROS ${counter}`);
  //   publisher.publish(`Hello ROS ${counter++}`);
  // }, 1000);

  node.spin();
});

app.use(bodyParser.json())
  
app.get('/', (req, res) => {
  res.send({ data: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

