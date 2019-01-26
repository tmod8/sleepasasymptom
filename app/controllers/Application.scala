package controllers

import javax.inject._
import play.api.data._
import play.api.data.Forms._
import play.api.mvc._
import play.api.i18n.I18nSupport
import models._

class Application @Inject()(cc: ControllerComponents) extends AbstractController(cc) with I18nSupport {
  //getting instance of Database
  val db = new MockDb

  //hardcoding admin
  //val user = new Researcher(RegistrationInfo.apply("Ricky", "Bobby", "rb@talladega.com", "12345", "12345"))

  val admin = new Admin("Dwayne", "Johnson", "dj@cooking.com", "password")

  db.writeUser(admin)

  val loginForm: Form[LoginInfo] = Form(
    mapping(
      "email" -> nonEmptyText,
      "password" -> nonEmptyText(minLength = 5)
    )(LoginInfo.apply)(LoginInfo.unapply)
  )


  def index = Action { implicit request =>

    Ok(views.html.index(loginForm))
  }

  def loginAttempt = Action { implicit request =>
    loginForm.bindFromRequest.fold(
      formError => BadRequest(views.html.index(formError)),
      loginData => {
        val exists = db checkCredentials (loginData.email, loginData.password)
        exists match {
          case true => {
            Redirect(routes.Application.dashboard).flashing("success" -> "successfully logged in!")
          }
          case false => {

            BadRequest(views.html.index(loginForm.fill(loginData).withGlobalError("failed login attempt")))
          }
        }

      }
    )
  }


  val registerForm: Form[RegistrationInfo] = Form(
    mapping(
      "firstName" -> nonEmptyText,
      "lastName" -> nonEmptyText,
      "email" -> nonEmptyText,
      "password" -> nonEmptyText(minLength = 5),
      "confirmPassword" -> nonEmptyText(minLength = 5)
    )(RegistrationInfo.apply)(RegistrationInfo.unapply)
  )

  def register =  Action  { implicit request =>
    Ok(views.html.register(registerForm))
  }

  def registerAttempt = Action { implicit request =>
    registerForm.bindFromRequest.fold(
      formError => BadRequest(views.html.register(formError)),
      registerData => {
        val researcher = new Researcher(registerData)
        db.writeUser(researcher)
        Redirect(routes.Application.dashboard)
      }
    )
  }

  def dashboard = Action  { implicit request =>
    val user = db.getCurrentUser()
    Ok(views.html.dashboard(user.getAccount()))

  }



  def logout = Action { implicit request =>
    val user = db.getCurrentUser()
    db.logoutUser(user)
    Redirect(routes.Application.index())
  }

}
