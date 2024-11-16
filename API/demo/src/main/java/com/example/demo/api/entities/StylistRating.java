package com.example.demo.api.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import java.time.LocalDate;

@Entity
@Table(name = "Stylist_Rating")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StylistRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stylistRatingId")
    long id;

//    @ManyToOne
//    @JoinColumn(name = "customer_id")
//    Customer customer;
//
    @ManyToOne
    @JoinColumn(name = "userId")
    User user;

    @Column(name = "rating")
    int rating;

    @Column(name = "review", columnDefinition = "TEXT")
    String review;

    @Column(name = "ratingDate")
    LocalDate ratingDate;
}
