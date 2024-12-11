package com.kandmules.to_do.controller;

import com.kandmules.to_do.dto.ToDoRequest;
import com.kandmules.to_do.entity.Todo;
import com.kandmules.to_do.entity.User;
import com.kandmules.to_do.service.TodoService;
import com.kandmules.to_do.service.UserService;
import com.kandmules.to_do.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = {"http://localhost:4200", "https://todo-frontend-1uu3.onrender.com"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class TodoController {

    @Autowired
    private TodoService todoService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<Page<Todo>> getToDos(@RequestHeader("Authorization") String token,
                                               @RequestParam(required = false) Boolean completed,
                                               Pageable pageable) {
        String username = jwtUtil.extractUsername(token);
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(todoService.getToDos(user, completed, pageable));
    }

    @PostMapping
    public ResponseEntity<Todo> createToDo(@RequestHeader("Authorization") String token,
                                           @RequestBody ToDoRequest toDoRequest) {
        String username = jwtUtil.extractUsername(token);
        User user = userService.getUserByUsername(username);
        Todo todo = new Todo(null,
                toDoRequest.getTitle(),
                toDoRequest.getDescription(),
                toDoRequest.isCompleted(), user);
        return ResponseEntity.ok(todoService.createOrUpdateToDo(todo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateToDo(@PathVariable Long id,
                                           @RequestHeader("Authorization") String token,
                                           @RequestBody ToDoRequest toDoRequest) {
        String username = jwtUtil.extractUsername(token);
        User user = userService.getUserByUsername(username);
        Todo todo = new Todo(id,
                toDoRequest.getTitle(),
                toDoRequest.getDescription(),
                toDoRequest.isCompleted(), user);
        return ResponseEntity.ok(todoService.createOrUpdateToDo(todo));
    }

    @DeleteMapping("{id}")
    public void updateToDo(@PathVariable Long id) {
        todoService.deleteTodoById(id);
    }
}
