@extends('tenancy.layouts.app')

@section('content')
    <div id="device-dashboard" data-user="{{ Auth::user()->username }}">Devices</div>
@endsection
@section('javascript')
    <script src={{asset('js/deviceDashboard.js')}}></script>
@stop
