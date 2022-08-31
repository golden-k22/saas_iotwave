@extends('tenancy.layouts.app')

@section('content')
    <div id="gateway-dashboard"  data-user="{{ Auth::user()->username }}">Gateways</div>
@endsection
@section('javascript')
    <script src={{asset('js/gatewayDashboard.js')}}></script>
@stop