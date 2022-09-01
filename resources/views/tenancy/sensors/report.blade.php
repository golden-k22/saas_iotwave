@extends('tenancy.layouts.app')

@section('content')
    <div id="report-dashboard" data-user="{{ Auth::user()->username }}">Real time monitoring</div>
@endsection
@section('javascript')
    <script src={{asset('js/reportDashboard.js')}}></script>
@stop
