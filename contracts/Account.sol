// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Account {


    struct UserAccount {
        address userID;
        string email;
        string first_name;
        string last_name;
        string username;
        uint balance;
        bool userAuthenicated;
    }
    error Unathorized(string _erroMsg);
    

    mapping(address => UserAccount) accounts;
    address [] private allUserAddress;
    
    modifier _onlyAuthenticatedUser(address _addr){
        UserAccount storage acct = accounts[_addr];
        if (acct.userAuthenicated == true){
            _;
        } 
        revert Unathorized("User not authorized");
    }

    event UserRegister(string _msg, address userId, string UserEmail);
    event sucessfulLogin(string _msg);
    error unsucessfulLogin(string _msg);
    
    function getUserAccount(address userID) view public returns (string memory username, string memory email ){
        UserAccount storage currentUser = accounts[userID];
        return (
            currentUser.username,
            currentUser.email
        );

    }


    function addUserAccount(string memory email , string memory lastname, string memory firstname) public returns (bool){
        bytes memory _email = bytes(email);
        bytes memory _firstname = bytes(firstname);
        bytes memory _lastname = bytes(lastname);
        if (_email.length == 0 || _lastname.length == 0 || _firstname.length == 0){
            revert unsucessfulLogin("All Arguments are Required");
            
        } else {

            accounts[msg.sender] = UserAccount(msg.sender, email, firstname, lastname, lastname, 0, false);
            emit UserRegister("User has been successfully Register", msg.sender, email);
            return true;
        }
       

    }
    function loginUser() public returns (bool){
        UserAccount storage _currentUser = accounts[msg.sender];
        if (_currentUser.userID != address(0)){
            _currentUser.userAuthenicated =true;
            emit sucessfulLogin("Login successful");
            return true;
        } else

         {
            revert unsucessfulLogin("Login Not Sucessful, User not Found");
            // return false;
        }
    }

   function logOut() public _onlyAuthenticatedUser(msg.sender) returns (string memory _msg){
        UserAccount storage _currentUser = accounts[msg.sender];
        _currentUser.userAuthenicated =false;
        return ("You have successfully logged out, see you later");
       
    }

    
    // / @notice this is a protected function, any address to call this function must be login first
    function protectEndpoint() public view _onlyAuthenticatedUser(msg.sender) returns (string memory _msg){
        return ("You are logged in as an authenicated User");
    }

    
}
