
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { CheckSquare, Square, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  id: string;
  text: string;
  isCompleted?: boolean;
  onChange?: (id: string, text: string, isCompleted: boolean) => void;
  onDelete?: (id: string) => void;
  readOnly?: boolean;
}

export function TodoItem({ 
  id, 
  text, 
  isCompleted = false, 
  onChange,
  onDelete,
  readOnly = false
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(text);
  
  const handleCheckboxChange = () => {
    if (onChange && !readOnly) {
      onChange(id, todoText, !isCompleted);
    }
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };
  
  const handleTextBlur = () => {
    if (todoText.trim() && onChange && !readOnly) {
      onChange(id, todoText, isCompleted);
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && todoText.trim() && onChange && !readOnly) {
      onChange(id, todoText, isCompleted);
      setIsEditing(false);
    }
  };
  
  const handleDelete = () => {
    if (onDelete && !readOnly) {
      onDelete(id);
    }
  };

  return (
    <div className="flex items-center gap-2 py-1">
      {readOnly ? (
        <div className="flex items-center gap-2">
          {isCompleted ? <CheckSquare size={18} /> : <Square size={18} />}
          <span className={cn("text-sm", isCompleted && "line-through text-gray-500")}>{text}</span>
        </div>
      ) : (
        <>
          <Checkbox 
            id={`todo-${id}`}
            checked={isCompleted}
            onCheckedChange={handleCheckboxChange}
          />
          
          {isEditing ? (
            <Input
              value={todoText}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="flex-1 h-8 py-1 text-sm"
            />
          ) : (
            <div 
              onClick={() => !readOnly && setIsEditing(true)}
              className={cn(
                "flex-1 cursor-pointer text-sm py-1 px-2 rounded hover:bg-gray-100",
                isCompleted && "line-through text-gray-500"
              )}
            >
              {todoText}
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 size={14} />
          </Button>
        </>
      )}
    </div>
  );
}
