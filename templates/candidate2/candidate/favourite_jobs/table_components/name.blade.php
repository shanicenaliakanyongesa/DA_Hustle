<div class="d-flex align-items-center">
    <a>
        <div class="image image-circle image-mini me-3">
            <img src="{{$row->job->company->user->avatar}}" alt="user" class="user-img">
        </div>
    </a>
    <div class="d-flex flex-column">
        <a class="mb-1 text-decoration-none fs-6">
            {{$row->job->company->user->first_name}}
        </a>
        <span>{{$row->job->company->user->email}}</span>
    </div>
</div>
