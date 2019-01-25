package models

class Admin(fName: String, lName: String, email: String, pw: String) extends User {

  private val account = new Account(fName, lName, email, pw, Role.Admin)

  def getAccount(): Account = account
}
