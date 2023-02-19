import { createTodoApp } from './view.js';
import { getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem } from './api.js';
import { getTodoListLS, createTodoItemLS, switchTodoItemDoneLS, deleteTodoItemLS, } from './localStorTodo.js'

export async function initPage(owner, title, api) {
  const btnTransition = document.getElementById('storage');

  btnTransition.textContent = api === 'server'
    ? 'Перейти на локальное хранилище'
    : 'Перейти на серверное хранилище';

  const todoItemList = api === 'server' ? await getTodoList(owner) : await getTodoListLS(owner);
  const onCreateFormSubmit = api === 'server' ? createTodoItem : createTodoItemLS;
  const onDoneClick = api === 'server' ? switchTodoItemDone : switchTodoItemDoneLS;
  const onDeleteClick = api === 'server' ? deleteTodoItem : deleteTodoItemLS;

  const options = {
    title: title,
    owner: owner,
    todoItemList: todoItemList,
    onCreateFormSubmit: onCreateFormSubmit,
    onDoneClick: onDoneClick,
    onDeleteClick: onDeleteClick,
  };

  const container = document.getElementById('todo-app');

  createTodoApp(container, options);

  const clickFunc = () => {
    btnTransition.removeEventListener('click', clickFunc);
    container.innerHTML = '';
    if (api === 'local') {
      initPage(owner, title, 'server');
    } else {
      initPage(owner, title, 'local');
    }
  };

  btnTransition.addEventListener('click', clickFunc);
}

