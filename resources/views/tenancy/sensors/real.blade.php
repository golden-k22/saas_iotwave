@extends('tenancy.layouts.app')

@section('content')
    <div id="realtime-card-dashboard" data-user="{{ Auth::user()->username }}">Real time monitoring</div>
@endsection
@section('javascript')
    <script src={{asset('js/realtimeDashboard.js')}}></script>
@stop
