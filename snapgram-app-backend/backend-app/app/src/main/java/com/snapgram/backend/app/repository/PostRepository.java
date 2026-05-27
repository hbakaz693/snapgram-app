package com.snapgram.backend.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.snapgram.backend.app.model.Post;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long>{

    //Compte le nombre des posts dans la base pour chaque utilisateur
    long countByUserId(Long userId);
    

   //Recuperer tous les Pots d'un utilisateur
    List<Post> findByUserIdOrderByCreatedAtDesc(long userId);

    List<Post> findByUserId(Long userId);

    //Recuperer les dernier post ajoutee 
    List<Post> findTop10ByOrderByCreatedAtDesc();

    //Supprimer tous les post d'un utilisateur
    void deleteByUserId(Long userId);

    //Rechercher par la description 
    List<Post> findByDescriptionContainingIgnoreCase(String Keyword);

    //Recuperer tous les liste des utilisateur 
    @Query("SELECT p FROM Post p WHERE p.userId IN :userIds ORDER BY p.createdAt DESC")
    List<Post> findPostsByUserIds(@Param("userIds") List<Long> userIds);    
}
