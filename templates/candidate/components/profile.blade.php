@include("candidate/components/header")
@include("candidate/components/sidebar")
@include("candidate/components/content")




{{--  <form action="{{ route('candidate.logout') }}" method="POST">
    @csrf
    <button type="submit">Logout</button>
</form>  --}}


@include("candidate/components/footer")
