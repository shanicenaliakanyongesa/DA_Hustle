<div class="page-own-content">
    <div class="profile-bio-container">
        <div class="profile-bio-wrapper">
            <div class="profile-image-box">
                <div class="profile-image">
                    <img src="{{ asset('storage/assets/candidate_profile_pics/'.$candidate['profile_pic']) }}" alt="" class="profile-img">
                </div>
            </div>
            <div class="profile-bio">
                <h3>
                    {{ $candidate['fname'] }} {{ $candidate['lname'] }} {{ $candidate['surname'] }}

                    <a href="{{ route('candidate.profile.edit') }}" class="profile-edit-icon">
                        <span class="las la-edit"></span>
                    </a>
                </h3>
                <h5>
                    {{ $candidate['professional_title'] }}
                </h5>
                <p>
                    {{ $candidate['bio'] }}
                </p>
            </div>
        </div>
    </div>
    <div class="profile-bio-container">
        <div class="profile-bio-wrapper">
            <div class="profile-table-container">
                <table class="profile-table">
                    <tr>
                        <th>Personal</th>
                    </tr>
                    <tr>
                        <td>Birthday:</td>
                        <td>{{ $candidate['dob'] }}</td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td>{{ $candidate['gender'] }}</td>
                    </tr>
                    <tr>
                        <td>National ID No:</td>
                        <td>{{ $candidate['national_id_no'] }}</td>
                    </tr>
                    <tr>
                        <th>Contacts</th>
                    </tr>
                    <tr>
                        <td>Phone:</td>
                        <td>{{ $candidate['phone'] }}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{{ $candidate['email'] }}</td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td>{{ $candidate['address'] }}</td>
                    </tr>
                    <tr>
                        <th>SKills</th>
                    </tr>
                    <tr>
                        <td>Technical:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Others:</td>
                        <td></td>
                    </tr>

                </table>
            </div>
        </div>
    </div>
    <div class="profile-bio-container">
        <div class="profile-bio-wrapper">
            <div class="profile-cv-upload">
                <div class="profile-cv-upload-title">
                    <h4>My Files</h4>
                </div>
                <div class="profile-cv-upload-body">
                    <p>
                        Click to Upload a CV
                        <a href="{{ route('candidate.profile.cv.upload') }}" class="btn btn-blue2">Upload</a>
                    </p>

                </div>
                <div class="profile-cv-title">
                    <h4>Below is your latest CV:</h4>
                    <p class="text-italics t2">Uploaded: {{ $candidate['updated_at'] }}</p>
                </div>
                <div class="profile-cv-display">
                    <a href="{{ asset('storage/assets/candidate_pdf_files/'.$candidate['cv_upload']) }}" target="_blank">
                        <div class="profile-cv-box" >
                            <img src="{{ asset('assets/img/pdf_icons.png') }}" alt="" class="profile-cv-img">
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
