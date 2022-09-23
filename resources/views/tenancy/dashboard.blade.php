@extends('tenancy.layouts.app')

@section('content')
    @if(AUTH::user()->tenant_id == tenant('id'))
        <div class="pt-5">
        <span class="flex items-center mb-6 font-mono text-sm font-bold text-gray-700">
            Tenancy ID: {{tenant('id')}}
        </span>
        </div>
        <div class="pt-5">
            <h1>Hi, {{AUTH::user()->name}}! </h1>
        </div>
    @else
        <section class="pt-4">
            <h3>Subscription Status</h3>
            <div class="row">
                <div class="col-sm-6 col-xs-12 my-2">
                    <div class="card">
                        <div class="card-body">
                            <h5>Gateway</h5>
                            <div class="d-flex justify-content-between">
                                <h6 class="fw-bold"></h6>
                                <h6>{{$gateway_added}} Added</h6>
                            </div>
                            <div class="progress">
                                <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" style="width: {{$gateway_added / $tenant->gateway *100}}%">{{$gateway_added / $tenant->gateway * 100}}%</div>
                            </div>
                            <p class="mt-50">{{$tenant->gateway - $gateway_added}} remaining / {{$tenant->gateway}} Gateways available</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xs-12 my-2">
                    <div class="card">
                        <div class="card-body">
                            <h5>Sensor</h5>
                            <div class="d-flex justify-content-between">
                                <h6 class="fw-bold"></h6>
                                <h6>{{$sensor_added}} Added</h6>
                            </div>
                            <div class="progress">
                                <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" style="width: {{$sensor_added/$tenant->sensor*100}}%">{{$sensor_added/$tenant->sensor*100}}%</div>
                            </div>
                            <p class="mt-50">{{$tenant->sensor - $sensor_added}} remaining / {{$tenant->sensor}} Sensors available</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xs-12 my-2">
                    <div class="card">
                        <div class="card-body">
                            <h5>Email</h5>
                            <div class="d-flex justify-content-between">
                                <h6 class="fw-bold"></h6>
                                <h6>{{$tenant->email_sent}} Sent</h6>
                            </div>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" style="width: {{$tenant->email_sent / $tenant->email_total * 100}}%">{{$tenant->email_sent / $tenant->email_total * 100}}%</div>
                            </div>
                            <p class="mt-50">{{$tenant->email_total - $tenant->email_sent}} remaining / {{$tenant->email_total}} Emails available</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-xs-12 my-2">
                    <div class="card">
                        <div class="card-body">
                            <h5>SMS</h5>
                            <div class="d-flex justify-content-between">
                                <h6 class="fw-bold"></h6>
                                <h6 class="">{{$tenant->sms_sent}} Sent</h6>
                            </div>
                            <div class="progress">
                                <div class="progress-bar bg-warning progress-bar-striped progress-bar-animated" style="width: {{$tenant->sms_sent / $tenant->sms_total * 100}}%">{{$tenant->sms_sent / $tenant->sms_total * 100}}%</div>
                            </div>
                            <p class="mt-50">{{$tenant->sms_total - $tenant->sms_sent}} remaining / {{$tenant->sms_total}} SMSes available</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="pt-4">
            <h3>Email & SMS Utilization Log</h3>
            <table class="table table-striped table-responsive shadow-sm">
                <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>To</th>
                    <th>Content</th>
                    <th>Created At</th>
                </tr>
                <?php $i = 0 ?>
                @foreach ($sms_utilization as $product)
                    <tr class="vertical-middle">
                        <td>{{ ++$i }}</td>
                        <td>{{ $product->type }}</td>
                        <td>{{ $product->to_address }}</td>
                        <td>
                            {{ $product->content }}
                        </td>
                        <td class="text-center">
                            {{ $product->created_at }}
                        </td>
                    </tr>
                @endforeach
            </table>
        </section>
    @endif
@endsection