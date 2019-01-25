package models

class Supervisor(acct: Account) extends User {

  private val account = new Account(acct.getFirstName(), acct.getLastName(), acct.getEmail(), acct.getPassword(), Role.Supervisor)

  def getAccount(): Account = account

}
