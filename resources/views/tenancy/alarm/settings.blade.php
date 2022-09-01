@extends('tenancy.layouts.app')

@section('content')
    <div id="alarm-setting-dashboard" data-user="{{ Auth::user()->username }}">Alarm Settings</div>
@endsection
@section('javascript')
    <script src={{asset('js/alarmSettingDashboard.js')}}></script>
@stop
