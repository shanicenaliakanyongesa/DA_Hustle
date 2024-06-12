<div class="page-own-content">


<div class="page-row">
    <div class="page-title">
        <h3>
            <a href="{{ route('candidate.profile') }}" class="edit-link">back</a>
            Profile / Edit
        </h3>
        @if (session('success'))
        <div class="da-alert da-alert-success" role="alert">
            {{ session('success') }}
            <button type="button" class="da-close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        @endif
    </div>
</div>
{{--  <div class="page-content">
    <div class="page-row">
        <div class="page-col">
            <div class="page-content-title">
                <p>Manage your profile below</p>
            </div>
        </div>
    </div>
</div>  --}}
<div class="profile-bio-container">

    <div class="profile-bio-wrapper">
        <div class="profile-image-box">
            <div class="profile-image">
                <img src="{{ asset('storage/assets/candidate_profile_pics/'.$candidate['profile_pic']) }}" alt="" class="profile-img">
            </div>
            <div class="profile-image-link">
                <a href="{{ route('candidate.profile.pic.upload') }}">Change Photo</a>
            </div>
        </div>
        <div class="profile-bio">

            <form action="{{ route('candidate.profile.edit.submit') }}" method="POST">
                @csrf
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <h5>Personal Details</h5>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">First name</label>
                        <input type="text" class="profile-input" name="fname" value="{{ $candidate['fname'] }}">
                        <small class="form-error">
                            @error('fname')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Last name</label>
                        <input type="text" class="profile-input" name="lname" value="{{ $candidate['lname'] }}">
                        <small class="form-error">
                            @error('lname')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Surname</label>
                        <input type="text" class="profile-input" name="surname" value="{{ $candidate['surname'] }}">
                        <small class="form-error">
                            @error('surname')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>

                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Phone</label>
                        <input type="text" class="profile-input" name="phone" value="{{ $candidate['phone'] }}">
                        <small class="form-error">
                            @error('phone')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Proffesional Title</label>
                        <input type="text" class="profile-input" name="professional_title" value="{{ $candidate['professional_title'] }}">
                        <small class="form-error">
                            @error('professional_title')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Gender</label>
                        <select class="profile-select" name="gender">
                            <option>--Choose--</option>
                            {{ $candidate['gender'] }}
                            <option value="1" @if($candidate['gender'] == 1) selected @endif>Male</option>
                            <option value="2" @if($candidate['gender'] == 2) selected @endif>Female</option>
                        </select>
                        <small class="form-error">
                            @error('gender')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>

                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">D.O.B</label>
                        <input type="date" class="profile-input" name="dob" value="{{ $candidate['dob'] }}">
                        <small class="form-error">
                            <small class="form-error">
                                @error('dob')
                                    {{ $message }}
                                @enderror
                            </small>
                        </small>
                    </div>
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">National ID No.</label>
                        <input type="text" class="profile-input" name="national_id_no" value="{{ $candidate['national_id_no'] }}">
                        <small class="form-error">
                            @error('national_id_no')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Address</label>
                        <input type="text" class="profile-input" name="address" value="{{ $candidate['address'] }}">
                        <small class="form-error">
                            @error('address')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Bio</label>
                        <textarea class="profile-textarea" name="bio">{{ $candidate['bio'] }}</textarea>
                        <small class="form-error">
                            @error('bio')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <button class="btn btn-blue2">Update</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
</div>

<div class="profile-bio-container">
    <div class="profile-bio-wrapper">
        <div class="profile-bio">
            <form action="">
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <h5>Skills and Attributes</h5>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Technical Skills</label>
                        <select class="profile-select" name="technical_skills[]" id="technical_skills" multiple>
                            @foreach($skills as $id => $skill_name)
                                <option value="{{ $id }}">{{ $skill_name }}</option>
                            @endforeach
                        </select>
                        <small class="form-error">
                            @error('technical_skills')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Soft Skills</label>
                        <select class="profile-select" name="soft_skills[]" id="soft_skills" multiple>
                            @foreach($softskills as $id => $skill_name)
                                <option value="{{ $id }}">{{ $skill_name }}</option>
                            @endforeach
                        </select>
                        <small class="form-error">
                            @error('soft_skills')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Languages</label>
                        <select class="profile-select" name="languages[]" id="languages" multiple>
                            @foreach($languages as $id => $language)
                                <option value="{{ $id }}">{{ $language }}</option>
                            @endforeach
                        </select>
                        <small class="form-error">
                            @error('languages')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <button class="btn btn-blue2">Update</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</div>
<div class="profile-bio-container">
    <div class="profile-bio-wrapper">
        <div class="profile-bio">
            <form action="">
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <h5>Experience and Certifications</h5>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Work Experience 1</label>
                        <input type="text" class="profile-input" name="work_experience">
                        <small class="form-error">
                            @error('technical_skills')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Work Experience 2</label>
                        <input type="text" class="profile-input" name="work_experience">
                        <small class="form-error">
                            @error('technical_skills')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Certifications 1</label>
                        <input type="text" class="profile-input" name="certifications">
                        <small class="form-error">
                            @error('soft_skills')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Certifications 2</label>
                        <input type="text" class="profile-input" name="certifications">
                        <small class="form-error">
                            @error('soft_skills')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <button class="btn btn-blue2">Update</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="profile-bio-container">
    <div class="profile-bio-wrapper">
        <div class="profile-bio">
            <form action="">
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <h5>Education</h5>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Education 1</label>
                        <input type="text" class="profile-input" name="work_experience">
                        <small class="form-error">
                            @error('technical_skills')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <label for="" class="profile-label">Education 2</label>
                        <input type="text" class="profile-input" name="certifications">
                        <small class="form-error">
                            @error('soft_skills')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="profile-form-row">
                    <div class="profile-form-group-col">
                        <button class="btn btn-blue2">Update</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

</div>
