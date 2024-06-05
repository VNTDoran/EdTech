package pi.tn.esprit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.Post;
import pi.tn.esprit.models.User;
import pi.tn.esprit.repository.PostRepository;
import pi.tn.esprit.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Post createPost(Post post, String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        post.setUser(user);
        post.setLikes(new ArrayList<>());
        post.setComments(new ArrayList<>());
        return postRepository.save(post);
    }



    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAllPostsOrderedByCreationDate();
    }

    @Override
    public Post editPost(Long postId, Post updatedPost, String username) {
        Post existingPost = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        if (existingPost.getUser().getUsername().equals(username)) {
            existingPost.setContent(updatedPost.getContent());
            return postRepository.save(existingPost);
        } else {
            throw new RuntimeException("You are not authorized to edit this post");
        }
    }

    @Override
    public void deletePost(Long postId, String username) {
        Post existingPost = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        if (existingPost.getUser().getUsername().equals(username)) {
            postRepository.delete(existingPost);
        } else {
            throw new RuntimeException("You are not authorized to delete this post");
        }
    }

    public Post likePost(Long postId, String username) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));

        // Check if the user has already liked the post
        if (post.getLikes().stream().anyMatch(user -> user.getUsername().equals(username))) {
            throw new IllegalArgumentException("You have already liked this post");
        }

        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        post.getLikes().add(user);
        return postRepository.save(post);
    }

    public Post unlikePost(Long postId, String username) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));

        // Check if the user has liked the post
        if (!post.getLikes().stream().anyMatch(user -> user.getUsername().equals(username))) {
            throw new IllegalArgumentException("You have not liked this post");
        }

        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalArgumentException("User not found"));
        post.getLikes().remove(user);
        return postRepository.save(post);
    }

    public User getUserById (Long UserId)  {
        return userRepository.getUserById(UserId);
    }

}