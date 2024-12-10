package com.kandmules.to_do.repository;

import com.kandmules.to_do.entity.Todo;
import com.kandmules.to_do.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    Page<Todo> findByUser(User user, Pageable pageable);

    Page<Todo> findByUserAndCompleted(User user, Boolean completed, Pageable pageable);
}
