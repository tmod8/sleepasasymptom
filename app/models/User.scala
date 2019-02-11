package models

import scala.collection.mutable.Set
//case class structure for logging in
//used in Application for index view
case class LoginInfo(email: String, password: String)

//structure for registration form created in Application controller
case class RegistrationInfo(firstName: String, lastName: String, email: String, password: String, confirmPassword: String)

//Account class for researcher, supervisor, and admin
class User(private var firstName: String, private var lastName: String,
           private var email: String, private var role: Role) {

  private var studies: Set[Study] = _

  //getters
  def getFirstName: String = firstName

  def getLastName: String = lastName

  def getFullName: String = firstName + " " + lastName

  def getEmail: String = email

  def getRole: Role = role

  def getStudies: Set[Study] = studies

  //setters
  def updateFirstName(fn: String): Unit = {
    firstName = fn
  }

  def updateLastName(ln: String): Unit = {
    lastName = ln
  }

  def updateEmail(em: String): Unit = {
    email = em
  }

  def updateRole(rl: Role): Unit = {
    role = rl
  }

  def addStudy(study: Study): Set[Study] = {
    studies += study
  }



}
