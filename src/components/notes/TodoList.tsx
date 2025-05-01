
import React from 'react';
import { TodoItem } from './TodoItem';
import { Button } from '@/components/ui/button';
import { ListTodo } from 'lucide-react';

export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onChange?: (todos: Todo[]) => void;
  readOnly?: boolean;
}

export function TodoList({ todos, onChange, readOnly = false }: TodoListProps) {
  const handleItemChange = (id: string, text: string, isCompleted: boolean) => {
    if (!onChange) return;
    
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text, isCompleted };
      }
      return todo;
    });
    
    onChange(updatedTodos);
  };
  
  const handleItemDelete = (id: string) => {
    if (!onChange) return;
    onChange(todos.filter(todo => todo.id !== id));
  };
  
  const handleAddTodo = () => {
    if (!onChange) return;
    const newTodo = {
      id: `todo_${Date.now()}`,
      text: '',
      isCompleted: false
    };
    onChange([...todos, newTodo]);
  };

  return (
    <div className="space-y-1">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          isCompleted={todo.isCompleted}
          onChange={readOnly ? undefined : handleItemChange}
          onDelete={readOnly ? undefined : handleItemDelete}
          readOnly={readOnly}
        />
      ))}
      
      {!readOnly && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleAddTodo}
          className="text-flipboard-purple hover:bg-flipboard-soft-purple hover:text-flipboard-purple w-full justify-start text-sm py-1 h-auto"
        >
          <ListTodo size={16} className="mr-1" />
          Add a new task
        </Button>
      )}
    </div>
  );
}
