<h1>This is the login page</h1>

<form action="{{ route('admin.login.submit') }}" method="POST">
    @csrf
    <input type="email" name="email" placeholder="Email" value="{{ old('email') }}"><br><br>
    <small>
        @if ($errors->has('email'))
            {{ $errors->first('email') }}
        @endif
    </small><br>
    <input type="password" name="password" placeholder="password"><br><br>
    <small>
        @if ($errors->has('password'))
            {{ $errors->first('password') }}
        @endif
    </small><br>
    <input type="submit" value="login">
</form>

<a href="/admin/register">Don't have an account? Click here</a>
