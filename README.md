**What you have to do:**
1. Auth system
  * a. Sign up page with 3 inputs: dropdown with roles, email, password and
password confirmation.
  * b. Sign in page with 2 inputs: email, password.
  * c. All inputs are required.
2. Inputs validation
  * a. Password input: more than 8 symbols and less than 16, both numeric and
alphabetic symbols required.
  * b. Email input: standard email validation.
3. Save user to DB
  * a. After success “Sign up”: save user to the DB.
  * b. DB must be MySQL.
4. User session
  * a. After successful “Sign in” create a session token which has to expire in 1
hour.
  * b. Users must have access to other pages only by this session token.
5. Role system
  * a. 4 roles to choose on the Sign up page:
    * I. Guest
    * ii. User
    * iii. Supervisor
    * iv. Admin
  * b. On the main page, which will be shown to the user after success login, create
  * a menu on top of the page with 4 tabs. Please hard-code the content for
those tabs and send it from the back-end. For instance, on the guest tab,
please output “this is a guest tab”.
  * c. Guest role will have access only to the first tab page. User role will have
access to the first and the second tab. Supervisor will have access to the first,
the second page and the third page. Admin will have access to all the pages.
  * d. If the user doesn’t have access to the page, show a user-friendly message.
  * e. There must be no way for Guest to access other pages content and so on.
