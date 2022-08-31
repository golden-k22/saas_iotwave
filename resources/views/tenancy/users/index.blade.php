@extends('tenancy.layouts.app')
 
@section('content')
    <div class="row pt-5">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="pull-left">
                <span class="section-title mb-row">User Management</span>
            </div>
            <div class="pull-right">
                <a class="btn btn-success btn-md" href="{{ route('tenancy.users.create', tenant('id')) }}"> Add</a>
            </div>
        </div>
    </div>

    @if ($message = Session::get('success'))
        <div class="alert alert-success">
            <p>{{ $message }}</p>
        </div>
    @endif

    <table class="table table-striped table-responsive shadow-sm">
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Avatar</th>
            <th>Created At</th>
            <th>Action</th>
        </tr>
        <?php $i = 0 ?>
        @foreach ($users as $product)
            <tr class="vertical-middle">
                <td>{{ ++$i }}</td>
                <td>{{ $product->name }}</td>
                <td>{{ $product->email }}</td>
                <td>
                    <img id="preview" src="{{ Voyager::image($product->avatar) . '?' . time() }}" class="w-12 h-12 rounded-full ">
                </td>
                <td>{{ $product->created_at }}</td>
                <td>
                    <form action="{{ route('tenancy.users.destroy',['tenant'=>tenant('id'), 'user'=>$product->id]) }}" method="POST">

                        <a class="btn btn-success btn-sm" href="{{ route('tenancy.users.show', ['tenant'=>tenant('id'), 'user'=>$product->id]) }}">View Details</a>

                        <a class="btn btn-primary btn-sm" href="{{ route('tenancy.users.edit', ['tenant'=>tenant('id'), 'user'=>$product->id]) }}">Edit</a>

                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </table>
@endsection