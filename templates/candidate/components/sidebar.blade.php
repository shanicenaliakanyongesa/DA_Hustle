
    <div class="sidebar-container">
        <div class="sidebar-wrapper">

            <div class="sidebar-logo-container">
                <div class="sidebar-logo-wrapper">
                    <div class="logo-box">
                        <h4>DA Hustle</h4>
                    </div>
                </div>
            </div>

            <div class="sidebar-menu-container">
                <div class="sidebar-menu-wrapper">
                    <div class="side-menu-box">
                        <ul class="side-menu-list">
                            <li class="">

                                <a href="{{ route('/') }}" class="">
                                    <span class="las la-home"></span>
                                    <span> Home</span>
                                </a>
                            </li>
                            <li class="">

                                <a href="{{ route('candidate.dashboard') }}" class="{{ (request()->is('candidate/dashboard')) || (request()->is('candidate/main-job-search')) ? 'active' : ''}}">
                                    <span class="las la-grip-horizontal"></span>
                                    <span> Search</span>
                                </a>
                                <div class="{{ (request()->is('candidate/dashboard')) || (request()->is('candidate/main-job-search')) ? 'menu-link-overlay' : '' }}"></div>
                                <div class="{{ (request()->is('candidate/dashboard')) || (request()->is('candidate/main-job-search')) ? 'menu-link-overlay-b' : '' }}"></div>
                            </li>
                            <li class="">
                                <a href="{{ route('candidate.profile') }}" class="{{ (request()->is('candidate/profile')) || (request()->is('candidate/profile-edit')) ? 'active' : ''}}">
                                    <span class="las la-user-circle"></span>
                                    <span> Profile</span>
                                </a>
                                <div class="{{ (request()->is('candidate/profile'))|| (request()->is('candidate/profile-edit')) ? 'menu-link-overlay' : '' }}"></div>
                                <div class="{{ (request()->is('candidate/profile'))|| (request()->is('candidate/profile-edit')) ? 'menu-link-overlay-b' : '' }}"></div>
                            </li>
                            <li class="">
                                <a href="{{ route('candidate.applications') }}" class="{{ (request()->is('candidate/applications')) ? 'active' : ''}}">
                                    <span class="las la-envelope-open-text"></span>
                                    <span> Applications</span>
                                </a>
                                <div class="{{ (request()->is('candidate/applications')) ? 'menu-link-overlay' : '' }}"></div>
                                <div class="{{ (request()->is('candidate/applications')) ? 'menu-link-overlay-b' : '' }}"></div>
                            </li>
                            <li class="">
                                <a href="{{ route('candidate.settings') }}" class="{{ (request()->is('candidate/settings')) ? 'active' : ''}}">
                                    <span class="las la-users-cog"></span>
                                    <span> Settings</span>
                                </a>
                                <div class="{{ (request()->is('candidate/settings')) ? 'menu-link-overlay' : '' }}"></div>
                                <div class="{{ (request()->is('candidate/settings')) ? 'menu-link-overlay-b' : '' }}"></div>
                            </li>
                            <li class="">
                                <form action="{{ route('candidate.logout') }}" method="POST">
                                    @csrf
                                    {{--  <button class="panel-logout-btn " type="submit">Logout</button>  --}}
                                    <input class="panel-logout-btn menu-link" type="submit" value="Logout">
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>

