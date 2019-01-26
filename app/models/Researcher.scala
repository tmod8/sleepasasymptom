package models

//structure for registration form created in Application controller
case class RegistrationInfo(firstName: String, lastName: String, email: String, password: String, confirmPassword: String)

//Researcher
class Researcher(regInfo: RegistrationInfo) extends User{

  //researcher's account
  private val account = new Account(regInfo.firstName, regInfo.lastName, regInfo.email, regInfo.password, Role.Researcher)

  def getAccount(): Account = account



}
