package com.kandmules.to_do.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ToDoRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    private String title;
    private String description;
    private boolean completed;
}
