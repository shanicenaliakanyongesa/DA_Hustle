
<div class="sidebar-container">
    <div class="sidebar-wrapper">

        <div class="sidebar-logo-container">
            <div class="sidebar-logo-wrapper">
                <div class="logo-box">
                    <h4>DA_hustler</h4>
                </div>
            </div>
        </div>

        <div class="sidebar-menu-container">
            <div class="sidebar-menu-wrapper">
                <div class="menu-box">
                    <ul class="menu-ul">
                        <li class="menu-item">
                            <a href="{{ route('/') }}" class="menu-link">Home</a>
                        </li>
                        <li class="menu-item">
                            <a href="{{ route('company.dashboard') }}" class="menu-link">Dashboard</a>
                        </li>
                        <li class="menu-item">
                            <a href="{{ route('company.company-profile') }}" class="menu-link">Company Profile</a>
                        </li>
                        <li class="menu-item">
                            <a href="{{ route('company.post-jobs') }}" class="menu-link">Post Jobs</a>
                        </li>
                        <li class="menu-item">
                            <a href="{{ route('company.applications') }}" class="menu-link">Applications</a>
                        </li>
                        <li class="menu-item">
                            <form action="{{ route('company.logout') }}" method="POST">
                                @csrf
                                {{--  <button class="panel-logout-btn menu-link" type="submit">Logout</button>  --}}
                                <input class="panel-logout-btn menu-link" type="submit" value="Logout">
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</div>

