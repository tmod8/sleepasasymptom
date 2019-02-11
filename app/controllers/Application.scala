package controllers

import javax.inject._
import play.api.data._
import play.api.data.Forms._
import play.api.mvc._
import play.api.i18n.I18nSupport
import models._
import play.api.data.validation._

class Application @Inject()(cc: ControllerComponents) extends AbstractController(cc) with I18nSupport {
  //getting instance of Database
  val db = new MockDb

  //hardcoding admin account
  val admin = new User("Dwayne", "Johnson", "dj@cooking.com", Role.Admin)

  db.writeUser(admin)



  val loginForm: Form[LoginInfo] = Form(
    mapping(
      "email" -> email,
      "password" -> nonEmptyText
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

  // at least one digit, lowercase and uppercase
  val passwordRegex = """(?=.*\d)(?=.*[a-z])(?=.*[A-Z])""".r

  //validation code
  val passwordCheckConstraint: Constraint[String] = Constraint("constraints.password")({
    plainText =>
      val errors = plainText match {
        case passwordRegex() => false //email matched regex, a valid email
        case _ => true //invalid email
      }
      if (errors) {
        Valid
      } else {
        Invalid(Seq(ValidationError("Password must be at least 10 characters and must have at least one digit," +
          "lowercase letter, and uppercase letter.")))
      }
  })

  val registerForm: Form[RegistrationInfo] = Form(
    mapping(
      "firstName" -> nonEmptyText(minLength = 2),
      "lastName" -> nonEmptyText(minLength = 2),
      "email" -> email,
      "password" -> nonEmptyText(minLength = 10, maxLength = 128), //.verifying(passwordCheckConstraint),
      "confirmPassword" -> nonEmptyText(minLength = 5)
    )(RegistrationInfo.apply)(RegistrationInfo.unapply)
      //still working on this
      //verifying("Passwords do not match.", check => check.password == check.confirmPassword)
  )

  def register =  Action  { implicit request =>
    Ok(views.html.register(registerForm))
  }

  def registerAttempt = Action { implicit request =>
    registerForm.bindFromRequest.fold(
      formError => BadRequest(views.html.register(formError)),
      registerData => {
        val researcher = new User(registerData.firstName, registerData.lastName, registerData.email, Role.Researcher)
        db.writeUser(researcher)
        Redirect(routes.Application.dashboard)
      }
    )
  }

  def dashboard = Action  { implicit request =>
    val user = db.getCurrentUser
    Ok(views.html.dashboard(user))

  }



  def logout = Action { implicit request =>
    val user = db.getCurrentUser
    db.logoutUser(user)
    Redirect(routes.Application.index())
  }

}
