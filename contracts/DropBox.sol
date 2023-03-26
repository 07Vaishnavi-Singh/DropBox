// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7; 

contract DropBox{

// if a user wants to give access to a address it will be done using struct 
 struct Access{
     address user ; // address to be given access
     bool access ;// set true 
 }


mapping(address => string[]) allURLs;
mapping(address => mapping(address=>bool)) sharedAccesses;
mapping(address => Access[]) accessList;
mapping(address=>mapping(address=>bool)) history ;

function addURL( address _user ,string memory _url) external {
allURLs[_user].push(_url);
}

function allow(address _toBeAllowed) external {
sharedAccesses[msg.sender][_toBeAllowed] = true ;
if(history[msg.sender][_toBeAllowed]){
for(uint  i = 0 ;i< accessList[msg.sender].length; i++){
    accessList[_toBeAllowed][i].access = true ;
}
}
else{
accessList[msg.sender].push(Access(_toBeAllowed,true));
history[msg.sender][_toBeAllowed]= true;
}}



 function disallow(address _toBeDisAllowed) public {
 sharedAccesses[msg.sender][_toBeDisAllowed] = false ;
 for(uint  i = 0 ; i< accessList[msg.sender].length ; i++){
if(accessList[msg.sender][i].user == _toBeDisAllowed ){
    accessList[msg.sender][i].access = false ;
}

}
}


function display(address _user) external view returns(string[] memory ){
require(msg.sender == _user || sharedAccesses[_user][msg.sender],"Access Refused");
 return allURLs[_user];
}


function DisplayAccessList(address _user) public view returns(Access[] memory ){
return accessList[_user];
}


}
//  0x5FbDB2315678afecb367f032d93F642f64180aa3