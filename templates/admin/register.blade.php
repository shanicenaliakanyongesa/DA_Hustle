<h1>Admin Register</h1>

<form action="/admin/register" method="POST">
    @csrf
    <input type="text" name="fname" placeholder="first name" value=""><br>
    <small></small><br>
    <input type="text" name="lname" placeholder="last name" value=""><br>
    <small></small><br>
    <input type="text" name="surname" placeholder="surname" value=""><br>
    <small></small><br>
    <input type="email" name="email" placeholder="email" value=""><br>
    <small></small><br>
    <input type="password" name="password" placeholder="password"><br>
    <small></small><br>
    <input type="submit" value="Register">
</form>

<a href="/admin/login">Already have an account? Click here</a>
