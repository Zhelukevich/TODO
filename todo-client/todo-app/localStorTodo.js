export async function getTodoListLS(owner) {
  let items = JSON.parse(localStorage.getItem(owner));
  if (!items) items = [];
  return items;
}

export async function createTodoItemLS({ owner, name }) {
  let items = JSON.parse(localStorage.getItem(owner));
  let data = {
    id: new Date().getTime(),
    owner: owner,
    name: name,
    done: false,
  };
  if (!items) items = [];
  items.push(data);
  localStorage.setItem(owner, JSON.stringify(items));
  return data;
}


export function switchTodoItemDoneLS({ todoItem }) {
  todoItem.done = !todoItem.done;
  let owner = todoItem.owner;
  let items = JSON.parse(localStorage.getItem(owner));
  let data = items.filter((el) => el.id === todoItem.id);
  if (data && data.length > 0) {
    data[0].done = todoItem.done;
  }
  localStorage.setItem(owner, JSON.stringify(items));
}

export function deleteTodoItemLS({ todoItem, element }) {
  if (!confirm('Вы уверены?')) {
    return;
  }
  let owner = todoItem.owner;
  let items = JSON.parse(localStorage.getItem(owner));
  let data = items.filter((el) => el.id != todoItem.id);
  if (data) {
    element.remove();
  }
  localStorage.setItem(owner, JSON.stringify(data));
}

