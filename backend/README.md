# EXPRESS + SEQUELIZE + MYSQL

## Installation

Requires [Node.js](https://nodejs.org/) v14+ to run.
Install the dependencies and devDependencies and start the server.
```sh
run: yarn install &&
run: yarn global add nodemon
!! Create new Database in MySQL
!! Add information of Database to file .env 
run: yarn dev
```

SOUCE FRONTEND đổi localhost thành 127.0.0.1 example: 127.0.0.1:8000

example http://localhost:8080/api/students:

{
    "status": true,
    "message": "Tạo sinh viên thành công!",
    "payload": {
        "student_id": 10,
        "user_id": "b0204010-746e-4ccf-93b6-2dc81028ff87",
        "student_name": "Tran Van Cuong",
        "grade": "K45",
        "major_id": "1",
        "topic_id": "1"
    }
}
