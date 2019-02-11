package models

import scala.collection.mutable.Set;

class Study(private val id: String, private var title: String, private var description: String, val creator: User) {

  private var researchers: Set[User] = Set(creator)

  def getId: String = id

  def getTitle: String = title

  def getDescription: String = description

  def getCreator: User = creator

  def getResearchers: Set[User] = researchers

  def setTitle(tl: String): Unit = {
    title = tl
  }

  def setDescription(desc: String): Unit = {
    description = desc
  }

  def addResearcher(user: User): Set[User] = {
    researchers += user
  }

  def removeResearcher(user: User): Set[User] = {
    researchers -= user
  }



}
