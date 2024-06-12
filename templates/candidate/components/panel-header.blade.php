<div class="content-container">
        <div class="content-container-overlay"></div>
            <div class="content-body-top">
                <div class="content-tools-menu">
                    <span class="las la-bars"></span>
                </div>
                <div class="content-page-title">
                    <span>Dashboard</span>
                </div>
                <div class="content-search-bar">
                    <form action="">
                        @csrf
                        <input type="text" name="search_input" placeholder="Search something here...">
                        <button class="content-search-bar-btn" type="submit">
                            <span class="las la-search"></span>
                        </button>
                    </form>
                </div>
                <div class="content-messages">
                    <a href="">
                        <span class="badge">6</span>
                        <span class="las la-comments"></span>
                        <span>Messages</span>
                    </a>
                </div>
                <div class="content-notifications">
                    <a href="">
                        <span class="badge">4</span>
                        <span class="las la-bell"></span>
                        <span>Notifications</span>
                    </a>
                </div>
                <div class="content-profile-pic">
                    <div class="content-profile-image">
                        <img src="{{ asset('storage/assets/candidate_profile_pics/'.$candidate['profile_pic']) }}" alt="">
                    </div>
                    <div class="content-name-title">
                        <span>{{ $candidate['fname'] }} {{ $candidate['surname'] }}</span>
                        <span>{{ $candidate['professional_title'] }}</span>
                    </div>
                    <a href="" class="content-drop-down">
                        <span class="las la-caret-down"></span>
                    </a>
                </div>
            </div>

