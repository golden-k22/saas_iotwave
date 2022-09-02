@extends('tenancy.layouts.app')

@section('content')
    <div id="alarm-record-dashboard" data-user="{{ Auth::user()->username }}">Alarm Records</div>
@endsection
@section('javascript')
    <script src={{asset('js/alarmRecordDashboard.js')}}></script>
@stop
