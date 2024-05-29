package pi.tn.esprit.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pi.tn.esprit.models.ERole;
import pi.tn.esprit.models.Role;
import pi.tn.esprit.models.Student;
import pi.tn.esprit.models.User;
import pi.tn.esprit.repository.RoleRepository;
import pi.tn.esprit.repository.StudentRepository;
import pi.tn.esprit.repository.UserRepository;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service

public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    StudentRepository studentRepository;

    @Override
    public void confirmNewUser(int id) {
        Optional<Student> studentOptional = studentRepository.findById(id);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            System.out.println(student.getName());
            student.setConfirmed(1);
            studentRepository.save(student);
            Optional<User> usr = userRepository.findByUsername(student.getName());
            if (usr.isPresent()) {
                User user = usr.get();
                System.out.println(user.getId());
                Set<Role> roles = new HashSet<>();
                Role guestRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(guestRole);
                user.setRoles(roles);
                userRepository.save(user);

            }
        }
    }

    @Override
    public void joinUs(int id) {
        Optional<User> usr = userRepository.findById(id);
        if (usr.isPresent()) {
            User user = usr.get();
            Set<Role> roles = new HashSet<>();
            Role newStdRole = roleRepository.findByName(ERole.ROLE_UNCONFIRMEDSTUDENT)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(newStdRole);
            Student student = new Student(user.getUsername(),"",0);
            student.setUser(user);
            studentRepository.save(student);
            user.setRoles(roles);
            userRepository.save(user);
        }
    }

}
