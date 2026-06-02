package com.roadready.model;

import com.roadready.enums.Role;

public interface User {
    Integer getId();

    String getName();

    String getEmail();

    String getPasswordHash();

    Role getRole();
}