package com.example.demo.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;
import com.example.demo.api.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Users")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User implements UserDetails {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if(this.role != null) authorities.add(new SimpleGrantedAuthority(this.role.toString()));
        return authorities;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userId")
    long id;

    @Column(name = "username", unique = true, nullable = false, length = 50)
    String username;

    @Column(name = "password", nullable = false, length = 255)
    String password;

    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})", message = "Phone invalid")
    @Column(name ="PhoneNumber", nullable = true, length = 10)
    String phoneNumber;

    @Column(name="DateOfBirth", nullable = true)
    String dateOfBirth;

    @Column(name = "StaffSpecialty",nullable = true ,length = 100)
    String staffSpecialty;

    @Email(message = "Email not valid!")
    @Column(name = "Email", nullable = false, length = 255)
    String email;

    @ManyToOne
    @JoinColumn(name = "ManagedBy", nullable = true)
    @JsonIgnore
    User user;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    Role role;

    @ManyToOne
    @JoinColumn(name = "baseSalaryId")
    @JsonIgnore
    BaseSalary baseSalary;

    @ManyToOne
    @JoinColumn(name = "branchId")
    @JsonIgnore
    Branch branch;

    boolean isDeleted = false;

    boolean isBooked = false;

}
