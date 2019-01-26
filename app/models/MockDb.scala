package models


import scala.collection.mutable


class MockDb extends Database {

  val users = mutable.Set[User]()

  var loggedIn = mutable.Set[User]()

  def getInstance(): Database = new MockDb


  def writeUser(user: User): Unit = {
    users += user
    loggedIn += user
  }

  def deleteUser(): Unit = ???

  def updateUser(account: Account): Unit = ???

  def checkCredentials(email: String, pw: String): Boolean = {
    var correct = false
    for (user <- users) {
      val acct = user.getAccount()
      if (acct.getEmail() == email && acct.getPassword() == pw) {
        loggedIn += user
        correct = true
      }
    }
    correct
  }

  def getCurrentUser(): User = {
    loggedIn.head
  }

  def logoutUser(user: User): Unit = {
    loggedIn -= user
  }

  def lockUser(): Unit = ???
}
