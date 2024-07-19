@if(!empty($row->company->no_of_offices))
    {{$row->company->no_of_offices}}
@else
    {{__('messages.n/a')}}
@endif
