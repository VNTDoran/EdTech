package pi.tn.esprit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.tn.esprit.models.PostComment;
import pi.tn.esprit.services.PostCommentService;
import pi.tn.esprit.security.jwt.AuthTokenFilter;
import pi.tn.esprit.security.jwt.JwtUtils;

import jakarta.servlet.http.HttpServletRequest;
import pi.tn.esprit.services.PostCommentService;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class PostCommentController {

    @Autowired
    private PostCommentService commentService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthTokenFilter authtok;

    @PostMapping("/{postId}")
    public ResponseEntity<PostComment> addComment(@PathVariable Long postId, @RequestBody PostComment comment, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            String username = jwtUtils.getUserNameFromJwtToken(token);
            PostComment savedComment = commentService.addComment(postId, comment, username);
            return ResponseEntity.ok().body(savedComment);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<PostComment>> getCommentsByPostId(@PathVariable Long postId) {
        List<PostComment> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok().body(comments);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<PostComment> editComment(@PathVariable Long commentId, @RequestBody PostComment updatedComment, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            String username = jwtUtils.getUserNameFromJwtToken(token);
            PostComment editedComment = commentService.editComment(commentId, updatedComment, username);
            return ResponseEntity.ok().body(editedComment);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId, HttpServletRequest request) {
        String token = authtok.parseJwt(request);
        if (token != null && jwtUtils.validateToken(token)) {
            String username = jwtUtils.getUserNameFromJwtToken(token);
            commentService.deleteComment(commentId, username);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(401).build();
        }
    }
}