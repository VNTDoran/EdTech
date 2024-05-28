package pi.tn.esprit.services;

import org.springframework.web.multipart.MultipartFile;
import pi.tn.esprit.models.Post;
import pi.tn.esprit.models.User;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface PostService {
    public Post createPost(Post post, String username);

    List<Post> getAllPosts();

    public User getPostOwner(Long postId);

    public boolean isPostOwner(Long postId, User currentUser);

    public Post editPost(Long postId, Post updatedPost);

    public void deletePost(Long postId);
    public Post likePost(Long postId, String username);
    public Post unlikePost(Long postId, String username);
    




}
