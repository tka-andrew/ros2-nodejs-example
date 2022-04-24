# Simple ROS2 NodeJS Example
This is a minimal example of nodeJS that uses rclnodejs to create a publisher to publish messages to turtlesim.

## Problems faced during project setup
1. If you have problem installing rclnodejs, make sure that your entire path does not have whitespace in between. For example, your folder name should be "MyProjects" instead of "My Projects".

2. If you have error saying  "Error: could not find the `cargo` executable.", you need to:
    - curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    - REFERENCE: https://www.rust-lang.org/tools/install
    - npm install


## TO RUN THIS EXAMPLE
```
npm start
```
