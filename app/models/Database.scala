package models

trait Database {

  def writeUser(user: User): Unit
  def deleteUser(): Unit
  def updateUser(account: Account): Unit
  def checkCredentials(email: String, pw: String): Boolean
  def lockUser(): Unit
  def getInstance(): Database


}
