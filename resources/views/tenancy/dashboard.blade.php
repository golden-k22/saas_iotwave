@extends('tenancy.layouts.app')

@section('content')
    <div class="pt-5">
        <span class="flex items-center mb-6 font-mono text-sm font-bold text-gray-700">
            Tenancy ID: {{$tenancy}}
        </span>
    </div>

    <div class="">

        <h1>Hi, {{AUTH::user()->name}}! </h1>

    </div>
@endsection