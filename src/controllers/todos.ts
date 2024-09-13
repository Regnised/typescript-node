import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTODO = new Todo(Math.random().toString(), text);
  TODOS.push(newTODO);

  res.json({ message: 'Created the todo', createdTodo: newTODO });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  const updateText = req.body.text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    throw new Error('No TODO with id');
  }

  TODOS[todoIndex].text = updateText;

  res.json({ todo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    throw new Error(`Todo with ${id} id doesn't exists`);
  }
  TODOS.splice(todoIndex, 1);

  res.json({ message: 'deleted', todos: TODOS });
};
