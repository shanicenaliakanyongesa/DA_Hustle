<div class="page-row">
    <div class="page-title">
        <h3>Post Jobs</h3>
    </div>
</div>
<div class="profile-bio-container">
    <div class="profile-bio-wrapper">
        <div class="post-jobs-form">
            <form action="{{ route('company.post-jobs.submit') }}" method="POST">
                @csrf
                <div class="post-jobs-form-row">
                    <div class="post-jobs-form-group">
                        <label class="post-jobs-label" for="">Job Title</label>
                        <input class="post-jobs-input" type="text" name="job_title" value="{{ old('job_title') }}">
                        <small class="form-error">
                            @error('job_title')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                    <div class="post-jobs-form-group">
                        <label class="post-jobs-label" for="">Location</label>
                        <select class="post-jobs-select" name="job_location_id" id="" >
                            <option value="">--Choose--</option>
                            @foreach ($location as $id => $location_name )
                                <option value="{{ $id }}">{{ $location_name }}</option>
                            @endforeach
                        </select>
                        <small class="form-error">
                            @error('job_location_id')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                    <div class="post-jobs-form-group">
                        <label class="post-jobs-label" for="">Job Type</label>
                        <select class="post-jobs-select" name="jobtype_id" id="">
                            <option>--Choose--</option>
                            @foreach ($jobtype as $id => $jobtype_name )
                            <option value="{{ $id }}">{{ $jobtype_name }}</option>
                            @endforeach
                        </select>
                        <small class="form-error">
                            @error('jobtype_id')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>

                    <div class="post-jobs-form-group">
                        <label class="post-jobs-label" for="">Salary Range</label>
                        <select class="post-jobs-select" name="salary_range_id" id="" >
                            <option value="">--Choose--</option>
                            @foreach ($salaryrange as $id => $salary_range )
                                <option value="{{ $id }}">{{ $salary_range }}</option>
                            @endforeach
                        </select>
                        <small class="form-error">
                            @error('salary_range_id')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="post-jobs-form-row">
                    <div class="post-jobs-form-group">
                        <label class="post-jobs-label" for="">Skills</label>
                        <select class="post-jobs-skills" name="job_skills[]" id="skills" multiple>
                            @foreach($skills as $id => $name)
                                <option value="{{ $id }}">{{ $name }}</option>
                            @endforeach
                        </select>
                        <small class="form-error">
                            @error('job_skills')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="post-jobs-form-row">
                    <div class="post-jobs-form-group">
                        <label class="post-jobs-label" for="" >Job Description</label>
                        <textarea class="post-jobs-textarea" name="job_description"></textarea>
                        <small class="form-error">
                            @error('job_description')
                                {{ $message }}
                            @enderror
                        </small>
                    </div>
                </div>
                <div class="post-jobs-form-row">
                    <div class="post-jobs-form-group">
                        <div class="post-jobs-add-btn">
                            <button class="btn btn-blue2">Post Job</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="profile-bio-container">
    <div class="profile-bio-wrapper">

        <div class="company-posted-jobs-list">
            <div class="company-posted-jobs-list-title">
                <h4>Jobs you have posted.</h4>
            </div>
            @foreach($postedjobs as $postedjob)

                <div class="company-posted-job">
                    <h5 class="company-posted-job-title">
                        {{ $postedjob->job_title }}
                    </h5>
                    <p class="company-posted-job-description">
                        {{ $postedjob->job_description }}
                    </p>
                </div>

            @endforeach

        </div>
    </div>
</div>

