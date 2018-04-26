package com.achen.SpringBootAngular;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    private List<User> users = new ArrayList<>();

    public UserController() {
        this.users = this.buildUsers();
    }

    //Get all users
    @RequestMapping(method = RequestMethod.GET)
    public List<User> getUsers(){
        return this.users;
    }

    //Get Users by ID
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUserbyId(@PathVariable("id") int id){
        /*for(User user : this.users){
            if(id == user.getId()){
                return user;
            }
        }*/
        return this.users.stream().filter(
                user -> user.getId() == id
        ).findFirst().orElse(null);
    }

    //save a new user
    @RequestMapping(method = RequestMethod.POST)
    public void saveUser(@RequestBody User user){
        //this passed in user does not contain id;
        if(this.users.size() == 0){
            user.setId(0);
        }else{
            //find max id of exisitng users
            Comparator<User> comparator = Comparator.comparing(User::getId);
            int maxId = this.users.stream().max(comparator).get().getId();
            user.setId(maxId+1);
        }
        this.users.add(user);
    }

    //update an existing user
    @RequestMapping(method = RequestMethod.PUT)
    public void updateUser(@RequestBody User user){
        //user hidden field id to find user and then update it
        //filter return reference
        User targetUser = this.users.stream().filter(target -> target.getId() == user.getId()).findFirst().orElse(null);
        if(targetUser != null){
            targetUser.setFirstName(user.getFirstName());
            targetUser.setLastName(user.getLastName());
            targetUser.setEmail(user.getEmail());
        }
        return;
    }

    //delete an existing user by id
    @RequestMapping(value = "/{id}/delete", method = RequestMethod.DELETE)
    public boolean deleteUserbyId(@PathVariable int id){
        User targetUser = this.users.stream().filter(user -> user.getId() == id).findFirst().orElse(null);
        if(targetUser != null){
            this.users.remove(targetUser);
            return true;
        }else{
            return false;
        }
    }


    //Init user lists
    private List<User> buildUsers(){
        List<User> users = new ArrayList<>();

        int numUser = 5;
        for(int i=1; i<numUser+1; i++){
            users.add(new User(i, "firstname"+i, "lastname"+i, "user"+i+"@email.org"));
        }

        return users;
    }
}
