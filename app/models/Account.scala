package models

//case class structure for logging in
//used in Application for index view
case class LoginInfo(email: String, password: String)

//Account class for researcher, supervisor, and admin
class Account(firstName: String, lastName: String, email: String, password: String, val role: Role) {

  //getters
  def getFirstName(): String = firstName

  def getLastName(): String = lastName

  def getEmail(): String = email

  def getPassword(): String = password

  def getFullName(): String = firstName + " " + lastName





}
