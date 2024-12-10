package com.kandmules.to_do.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class AuthRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    private String username;
    private String password;
    private String email;
}
