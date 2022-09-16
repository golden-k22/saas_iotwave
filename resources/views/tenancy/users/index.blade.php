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
            <th>Send Mail</th>
            <th>Send SMS</th>
            <th>Action</th>
        </tr>
        <?php $i = 0 ?>
        @foreach ($users as $product)
            <tr class="vertical-middle">
                <td>{{ ++$i }}</td>
                <td>{{ $product->name }}</td>
                <td>{{ $product->email }}</td>
                <td>
                    <img id="preview" src="{{ Voyager::image($product->avatar) . '?' . time() }}"
                         class="w-12 h-12 rounded-full " alt="{{$product->name}}"/>
                </td>
                <td class="text-center">
                    <div class="ps-0 form-check form-switch">
                        <label>
                            <input class="h4 mb-0 form-check-input" type="checkbox" role="switch"
                                   {{$product->mailable? 'checked' : ''}}  disabled/>
                        </label>
                    </div>
                </td>
                <td class="text-center">
                    <div class="ps-0 form-check form-switch">
                        <label>
                            <input class="h4 mb-0 form-check-input" type="checkbox" role="switch"
                                   {{$product->messagable? 'checked' : ''}} disabled/>
                        </label>
                    </div>
                </td>
                <td>

                    <a class="btn btn-success btn-sm"
                       href="{{ route('tenancy.users.show', ['tenant'=>tenant('id'), 'user'=>$product->id]) }}">View
                        Details</a>

                    <a class="btn btn-primary btn-sm"
                       href="{{ route('tenancy.users.edit', ['tenant'=>tenant('id'), 'user'=>$product->id]) }}">Edit</a>

                    <a href="#"
                       data-id="{{$product->id}}"
                       data-name="{{$product->name}}"
                       data-action-url="{{ route('tenancy.users.destroy',['tenant'=>tenant('id'), 'user'=>$product->id]) }}"
                       class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            </tr>
        @endforeach
    </table>

    <!-- Delete Warning Modal -->
    <div class="modal fade" id="deleteModal" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <form action="{{ route('tenancy.users.destroy',['tenant'=>tenant('id'), 'user'=>30]) }}"
                          method="post" id="deleteForm">
                        @csrf
                        @method('DELETE')
                        <label for="id"></label><input id="id" name="user" type="hidden" />
                        <h5 class="mb-4 text-center" id="confirm-text"></h5>
                        <div class="w-100 text-center mb-2">
                            <button type="button" class="btn btn-secondary btn-sm me-1" onclick="hideDeleteModal()">Cancel</button>
                            <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- End Delete Modal -->
@endsection

@section('javascript')
    <script src="/vendor/jquery.min.js"></script>
    <script src="/vendor/popper.min.js"></script>
    <script src="/vendor/bootstrap.min.js"></script>
    <script>
        $(document).on("click", ".delete", function(){
            $('#id').val($(this).attr('data-id'))
            $("#confirm-text").text("Are you sure to you want to delete " + $(this).attr('data-name') + "?")
            $("#deleteForm").attr("action", $(this).attr('data-action-url'))
            $('#deleteModal').modal("show")
        })

        function hideDeleteModal(){
            $('#deleteModal').modal("hide")
        }
    </script>
@stop