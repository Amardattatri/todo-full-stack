package com.kandmules.to_do.service;

import com.kandmules.to_do.entity.Todo;
import com.kandmules.to_do.entity.User;
import com.kandmules.to_do.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    public Page<Todo> getToDos(User user, Boolean completed, Pageable pageable) {
        try {
            if (completed != null) {
                return todoRepository.findByUserAndCompleted(user, completed, pageable);
            }
            return todoRepository.findByUser(user, pageable);
        } catch (Exception e) {
            throw new RuntimeException("Database or SQL error: " + e.getMessage());
        }
    }

    public Todo createOrUpdateToDo(Todo todo) {
        try {
            return todoRepository.save(todo);
        } catch (Exception e) {
            throw new RuntimeException("Database or SQL error: " + e.getMessage());
        }
    }

    public void deleteTodoById(Long id) {
        try {
            todoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Database or SQL error: " + e.getMessage());
        }
    }
}
