# getirstudycase
 Getir Study Case

> Eyupcan Kayadarcin todolist app built with React, Redux & MongoDB.

I have hosted it by heroku: [getircasestudy](https://getircasestudy.herokuapp.com/)

#API
| Method   | URL                 | Operation                   |
| :------- | :------------------ | :-------------------------- |
| `GET`    | /api/todos          | Fetch all todos             |
| `POST`   | /api/todos          | Create a new todo           |
| `GET`    | /api/todos/:id      | Fetch a todo with given id  |
| `PUT`    | /api/todos/:id      | Toggle a todo with given id |
| `PUT`    | /api/todos/:id/edit | Update a todo with given id |
| `DELETE` | /api/todos/:id      | Delete a todo with given id |

#Run
```bash

npm i && npm i --prefix client
npm run dev

```