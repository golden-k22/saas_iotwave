@extends('tenancy.layouts.app')

@section('content')
    <div id="group-dashboard" data-user="{{ Auth::user()->username }}">Group</div>
@endsection
@section('javascript')
    <script src={{asset('js/groupDashboard.js')}}></script>
@stop
