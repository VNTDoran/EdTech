package pi.tn.esprit.controllers;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.tn.esprit.models.Post;
import pi.tn.esprit.models.User;
import pi.tn.esprit.repository.UserRepository;
import pi.tn.esprit.security.jwt.AuthTokenFilter;
import pi.tn.esprit.security.jwt.JwtUtils;
import pi.tn.esprit.services.PostService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthTokenFilter authtok;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add-post")
    public ResponseEntity<Post> addPost(@RequestBody Post post, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            String username = jwtUtils.getUserNameFromJwtToken(token);
            Post addedPost = postService.createPost(post, username);
            return ResponseEntity.ok().body(addedPost);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @Operation(description = "Retrieves all posts")
    @GetMapping("/retrieve-all-posts")
    public ResponseEntity<List<Post>> retrieveAllPosts(HttpServletRequest request) {
        try {
            String token = authtok.parseJwt(request);
            if (token != null && jwtUtils.validateToken(token)) {
                List<Post> posts = postService.getAllPosts();
                System.out.println(posts);  // Logging for debugging
                return ResponseEntity.ok().body(posts);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/edit-post/{postId}")
    public ResponseEntity<Post> editPost(@PathVariable Long postId, @RequestBody Post updatedPost, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            // Get username from the token
            String username = jwtUtils.getUserNameFromJwtToken(token);

            Optional<User> currentUser = userRepository.findByUsername(username);
            User user = new User();
            if (currentUser.isPresent()) {
                user = currentUser.get();
            }
            // Check if the current user is the owner of the post being edited
            if (postService.isPostOwner(postId, user)) {
                try {
                    Post editedPost = postService.editPost(postId, updatedPost);
                    return ResponseEntity.ok().body(editedPost);
                } catch (IllegalArgumentException e) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } else {
                // User is not authorized to edit this post
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    @DeleteMapping("/delete-post/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            try {
                postService.deletePost(postId);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Post> likePost(@PathVariable Long postId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            try {
                String username = jwtUtils.getUserNameFromJwtToken(token);
                Post likedPost = postService.likePost(postId, username);
                return ResponseEntity.ok().body(likedPost);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/{postId}/unlike")
    public ResponseEntity<Post> unlikePost(@PathVariable Long postId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            try {
                String username = jwtUtils.getUserNameFromJwtToken(token);
                Post unlikedPost = postService.unlikePost(postId, username);
                return ResponseEntity.ok().body(unlikedPost);
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
