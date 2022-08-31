@extends('tenancy.layouts.app')
@section('content')
    <div class="row pt-5">
        <div class="mb-3 d-flex align-items-center justify-content-between">
            <div class="pull-left">
                <span class="section-title mb-row">{{ $user->name }}</span>
            </div>
            <div class="pull-right">
                <a class="btn btn-outline-dark" href="{{ route('tenancy.users.index', tenant('id')) }}"> Back</a>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="flex justify-start w-full mb-8 lg:w-3/12 xl:w-1/5 lg:m-b0">
            <div class="relative w-32 h-32 cursor-pointer group">
                <img id="preview" src="{{ Voyager::image($user->avatar) . '?' . time() }}" class="w-32 h-32 rounded-full ">
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <strong>Name:</strong>
                {{ $user->name }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group mt-3">
                <strong>Email:</strong>
                {{ $user->email }}
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group mt-3">
                <strong>Username:</strong>
                {{ $user->username }}
            </div>
        </div>
    </div>
@endsection