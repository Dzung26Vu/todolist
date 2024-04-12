import axios from 'axios';    

const baseUrl = 'http://localhost:1337';

const getAllToDo = (setToDo) => {
    axios
    .get(`${baseUrl}/api/data`)
    .then(({data}) => {
        console.log('data...........', data);
        setToDo(data);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

const addToDo = (todo, setToDo) => {
    axios
    .post(`${baseUrl}/api/data/createData`, { text: todo })
    .then(({data}) => {
        console.log('data:', data);
        setToDo(prevTodos => [...prevTodos, data]); // Thêm todo mới vào danh sách hiện tại
    })
    .catch((error) => {
        console.error('Error adding todo:', error);
    });
}


// const deleteTodoFromApi = (id, setToDo) => {
//     axios
//     .delete(`${baseUrl}/delete/${id}`) // Truyền id qua URL
//     .then(({data}) => {
//         console.log('Todo deleted successfully');
//         getAllToDo(setToDo);
//     })
//     .catch((error) => {
//         console.error('Error deleting todo:', error);
//     });
// }

const deleteTodoFromApi = (id, setToDo) => {
    axios
    .delete(`${baseUrl}/api/data/deleteData`, { data: { id } }) // Truyền id qua dữ liệu JSON
    .then(({data}) => {
        console.log('Todo deleted successfully');
        getAllToDo(setToDo);
    })
    .catch((error) => {
        console.error('Error deleting todo:', error);
    });
}

const updateTodoFromApi = (id, updatedData, setToDo) => {
    axios.put(`${baseUrl}/api/data/updateData`, { id: id, text: updatedData.task })
      .then((response) => {
        console.log('Todo updated successfully');
        getAllToDo(setToDo); // Update the list of todos after successful update
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
      });
  };

export { getAllToDo, addToDo, deleteTodoFromApi, updateTodoFromApi };

