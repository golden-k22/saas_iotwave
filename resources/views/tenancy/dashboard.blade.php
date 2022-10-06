@extends('tenancy.layouts.app')

@section('content')
    <div class="pb-5 -mx-4">
        <div class="py-8 bg-white">
            <div class="tpx-4 mx-auto">
                <h2 class="text-2xl font-bold" contenteditable="false">Good Afternoon, {{auth()->user()->name}} 👋</h2>
                <div>
                    <p class="text-sm text-gray-500 font-medium">
                        <span>Last login:</span>
                        <span class="text-indigo-500">{{isset(auth()->user()->last_log_in)? \Carbon\Carbon::createFromTimeString(auth()->user()->last_log_in)->format('d, F, Y h:m:s'): ''}}</span>
                    </p>
                </div>
            </div>
        </div>

        @if(auth()->user()->tenant_id != tenant('id'))
            <section class="py-4">
                <div class=" tpx-4 mx-auto">
                    <div class="flex flex-wrap -mx-4">
                        <div class="w-full lg:w-2/3 tpx-4 mb-8 lg:mb-0">
                            <div class="pt-4 bg-white shadow rounded">
                                <div class="px-6 border-b border-blue-50">
                                    <div class="flex flex-wrap items-center mb-4">
                                        <div>
                                            <h3 class="text-xl font-bold">My Account</h3>
                                            <p class="text-sm text-gray-500 font-medium">Plan &amp; subscription info</p>
                                        </div>
                                        <a class="ml-auto flex items-center py-2 px-3 text-xs text-white bg-indigo-500 hover:bg-indigo-600 rounded"
                                           href="{{ route('tenancy.profile', ['username'=>auth()->user()->username, 'tenant'=>tenant('id')]) }}">
                                        <span class="mr-1">
                                            <svg class="h-4 w-4 text-indigo-300" viewbox="0 0 18 18" fill="none"
                                                xmlns="http://www.w3.org/2000/svg"><path
                                                d="M11.3413 9.23329C11.8688 8.66683 12.166 7.92394 12.1747 7.14996C12.1747 6.31453 11.8428 5.51331 11.252 4.92257C10.6613 4.33183 9.86009 3.99996 9.02465 3.99996C8.18922 3.99996 7.38801 4.33183 6.79727 4.92257C6.20653 5.51331 5.87465 6.31453 5.87465 7.14996C5.88335 7.92394 6.18051 8.66683 6.70799 9.23329C5.97353 9.59902 5.3415 10.1416 4.86875 10.8122C4.396 11.4827 4.09734 12.2603 3.99965 13.075C3.97534 13.296 4.03982 13.5176 4.17891 13.6911C4.318 13.8645 4.52031 13.9756 4.74132 14C4.96233 14.0243 5.18395 13.9598 5.35743 13.8207C5.5309 13.6816 5.64201 13.4793 5.66632 13.2583C5.76577 12.4509 6.15703 11.7078 6.76639 11.1688C7.37576 10.6299 8.16117 10.3324 8.97466 10.3324C9.78814 10.3324 10.5735 10.6299 11.1829 11.1688C11.7923 11.7078 12.1835 12.4509 12.283 13.2583C12.3062 13.472 12.411 13.6684 12.5756 13.8066C12.7402 13.9448 12.9519 14.0141 13.1663 14H13.258C13.4764 13.9748 13.6761 13.8644 13.8135 13.6927C13.9508 13.521 14.0148 13.3019 13.9913 13.0833C13.9009 12.2729 13.6116 11.4975 13.1493 10.8258C12.687 10.1542 12.066 9.60713 11.3413 9.23329ZM8.99965 8.63329C8.70628 8.63329 8.41949 8.5463 8.17556 8.38331C7.93163 8.22031 7.7415 7.98865 7.62923 7.71761C7.51696 7.44656 7.48759 7.14831 7.54482 6.86058C7.60206 6.57284 7.74333 6.30853 7.95078 6.10108C8.15823 5.89364 8.42253 5.75236 8.71027 5.69513C8.99801 5.63789 9.29626 5.66727 9.5673 5.77954C9.83835 5.89181 10.07 6.08193 10.233 6.32586C10.396 6.5698 10.483 6.85658 10.483 7.14996C10.483 7.54336 10.3267 7.92066 10.0485 8.19883C9.77035 8.47701 9.39306 8.63329 8.99965 8.63329ZM14.833 0.666626H3.16632C2.50328 0.666626 1.86739 0.930018 1.39855 1.39886C0.929713 1.8677 0.666321 2.50358 0.666321 3.16663V14.8333C0.666321 15.4963 0.929713 16.1322 1.39855 16.6011C1.86739 17.0699 2.50328 17.3333 3.16632 17.3333H14.833C15.496 17.3333 16.1319 17.0699 16.6008 16.6011C17.0696 16.1322 17.333 15.4963 17.333 14.8333V3.16663C17.333 2.50358 17.0696 1.8677 16.6008 1.39886C16.1319 0.930018 15.496 0.666626 14.833 0.666626ZM15.6663 14.8333C15.6663 15.0543 15.5785 15.2663 15.4222 15.4225C15.266 15.5788 15.054 15.6666 14.833 15.6666H3.16632C2.94531 15.6666 2.73335 15.5788 2.57707 15.4225C2.42079 15.2663 2.33299 15.0543 2.33299 14.8333V3.16663C2.33299 2.94561 2.42079 2.73365 2.57707 2.57737C2.73335 2.42109 2.94531 2.33329 3.16632 2.33329H14.833C15.054 2.33329 15.266 2.42109 15.4222 2.57737C15.5785 2.73365 15.6663 2.94561 15.6663 3.16663V14.8333Z"
                                                fill="currentColor"></path></svg></span>
                                            <span>View Profile</span>
                                        </a>
                                    </div>

                                </div>
                                <div class="overflow-x-auto">
                                    <table class="table-auto w-full">
                                        <thead class="bg-gray-50">
                                        <tr class="text-xs text-gray-500 text-left"></tr>
                                        </thead>
                                        <tbody>
                                        <tr class="border-b border-blue-50">
                                            <td class="flex items-center px-6 font-medium py-1">
                                                <div class="flex tpx-4 py-3">
                                                    <div>
                                                        <p class="text-sm text-gray-500 font-medium">Currently on plan</p>

                                                    </div>
                                                </div>
                                            </td>
                                            <td class="font-medium">
                                                <p class="text-sm">{{ auth()->user()->role->display_name }}</p>
                                            </td>
                                            <td class="pr-6">
                                                <div class="flex">
                                                    <span class="inline-block py-1 px-2 ml-2 rounded-full text-xs text-white bg-indigo-500">{{isset(auth()->user()->subscription->status)? auth()->user()->subscription->status: 'Trial'}}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="border-b border-blue-50">
                                            <td class="flex items-center px-6 font-medium py-1">
                                                <div class="flex tpx-4 py-3">
                                                    <div>
                                                        <p class="text-sm text-gray-500 font-medium">Bill Date</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="font-medium">
                                                <p class="text-sm">{{isset(auth()->user()->subscription->updated_at)? \Carbon\Carbon::createFromTimeString(auth()->user()->subscription->updated_at)->toDateString(): ''}}</p>
                                            </td>
                                            <td class="pr-6">
                                                <p class="mb-1 text-xs text-indigo-500 font-medium">
                                                    {{isset(auth()->user()->subscription->updated_at)? 'Expires in '.\Carbon\Carbon::createFromTimeString(auth()->user()->subscription->updated_at)->addMonth(1)->diffInDays(\Carbon\Carbon::now()).' Days('.\Carbon\Carbon::createFromTimeString(auth()->user()->subscription->updated_at)->addMonth(1)->toDateString().')': ''}}</p>
                                                <div class="flex">
                                                    <a class="ml-auto" href="#">
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div class="text-center tpy-5">
                                        <a class="inline-flex items-center text-xs text-indigo-500 hover:text-blue-600 font-medium"
                                           href="{{ route('tenancy.settings', ['section'=>'invoices', tenant('id')]) }}">
                                            <span class="mr-1">
                                                <svg width="24" height="24" viewbox="0 0 24 24" fill="none" stroke-width="1.5" stroke="currentColor"
                                                    stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path
                                                    stroke="none" d="M0 0h24v24H0z" fill="none"></path><path
                                                    d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2"
                                                    fill="none"></path>
                                                </svg>
                                            </span>
                                            <span>View Bill</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/3 tpx-4">
                            <div class="py-4 bg-white rounded shadow">
                                <div class="border-b border-blue-50 px-6 pb-4">
                                    <h3 class="text-xl font-bold pt-2">Messaging Credits</h3>
                                </div>
                                <div class="border-b border-blue-50 tp-4">
                                    <div class="flex -mx-4">
                                        <div class="flex items-center w-1/2 tpx-4">
                                        <span class="mr-1">
                                            <svg width="24" height="24" viewbox="0 0 24 24" fill="none" stroke-width="1.5"
                           stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                           xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect
                                  x="3" y="5" width="18" height="14" rx="2"></rect><polyline
                                  points="3 7 12 13 21 7"></polyline></svg></span>
                                            <p class="text-sm font-medium">Emails</p>
                                        </div>
                                        <div class="w-1/2 tpx-4">
                                            <p class="mb-1 text-xs text-indigo-500 font-medium">{{$tenant->email_total == 0? 0 :round($tenant->email_sent/$tenant->email_total * 100, 2)}}% ({{$tenant->email_total}} credits)</p>
                                            <div class="flex">
                                                <div class="relative h-1 w-48 bg-indigo-50 rounded-full">
                                                    <div class="absolute top-0 left-0 h-full bg-indigo-500 rounded-full" style="width: {{$tenant->email_total == 0? 0 :$tenant->email_sent/$tenant->email_total * 100}}%"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="border-b border-blue-50 tp-4">
                                    <div class="flex -mx-4">
                                        <div class="flex items-center w-1/2 tpx-4">
                                        <span class="mr-1">
                                            <svg width="24" height="24" viewbox="0 0 24 24" fill="none" stroke-width="1.5"
                           stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                           xmlns="http://www.w3.org/2000/svg"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path
                                  d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3"></path><line
                                  x1="8" y1="9" x2="16" y2="9"></line><line x1="8" y1="13" x2="14" y2="13"></line></svg></span>
                                            <p class="text-sm font-medium">SMSes</p>
                                        </div>
                                        <div class="w-1/2 tpx-4">
                                            <p class="mb-1 text-xs text-indigo-500 font-medium">{{$tenant->sms_total == 0? 0 :round($tenant->sms_sent/$tenant->sms_total * 100, 2)}}% ({{$tenant->sms_total}} credits)</p>
                                            <div class="flex">
                                                <div class="relative h-1 w-48 bg-indigo-50 rounded-full">
                                                    <div class="absolute top-0 left-0 h-full bg-indigo-500 rounded-full" style="width: {{$tenant->sms_total == 0? 0 : $tenant->sms_sent/$tenant->sms_total * 100}}%"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="border-b border-white tp-4">
                                    <div class="flex -mx-4">
                                        <div class="flex items-center w-1/2 tpx-4">
                                            <span class="mr-1"><p class="text-sm font-medium"> </p></span>
                                        </div>
                                        <div class="w-1/2 tpx-4">
                                            <a class="md:w-auto flex items-center py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-normal text-xs"
                                               href="{{ route('tenancy.settings', ['section'=>'plans', tenant('id')]) }}">
                                                <div class="m-auto d-flex">
                                                <span class="inline-block mr-1">
                                                     <svg class="h-4 w-4 text-indigo-300" viewbox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg"><path
                                    d="M12.6667 1.33334H3.33333C2.19999 1.33334 1.33333 2.20001 1.33333 3.33334V12.6667C1.33333 13.8 2.19999 14.6667 3.33333 14.6667H12.6667C13.8 14.6667 14.6667 13.8 14.6667 12.6667V3.33334C14.6667 2.20001 13.8 1.33334 12.6667 1.33334ZM10.6667 8.66668H8.66666V10.6667C8.66666 11.0667 8.4 11.3333 8 11.3333C7.6 11.3333 7.33333 11.0667 7.33333 10.6667V8.66668H5.33333C4.93333 8.66668 4.66666 8.40001 4.66666 8.00001C4.66666 7.60001 4.93333 7.33334 5.33333 7.33334H7.33333V5.33334C7.33333 4.93334 7.6 4.66668 8 4.66668C8.4 4.66668 8.66666 4.93334 8.66666 5.33334V7.33334H10.6667C11.0667 7.33334 11.3333 7.60001 11.3333 8.00001C11.3333 8.40001 11.0667 8.66668 10.6667 8.66668Z"
                                    fill="currentColor"></path></svg></span>
                                                    <span>Top up credits</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        @endif

        <div class="py-4">
            <div class="tpx-4 mx-auto">
                <h2 class="text-2xl font-bold">Temperature Monitoring</h2>
            </div>
        </div>

        <div class=" tpx-4 mx-auto">
            <div class="flex flex-wrap -mx-4 -mb-4 md:mb-0">
                <div class="w-full md:w-1/2 tpx-4 mb-4 md:mb-0">
                    <section class="py-4">
                        <div class=" tpx-4 mx-auto">
                            <div class="flex flex-wrap -m-4">
                                <div class="w-full lg:w-1/2 tp-4">
                                    <div class="p-6 mb-4 bg-white shadow rounded">
                                        <div class="flex mb-3 items-center justify-between">
                                            <h3 class="text-gray-500">Gateways</h3>
                                            <button class="focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" class="h-4 w-4 text-gray-200"
                                                     viewbox="0 0 16 16">
                                                    <path d="m1.854 14.854 13-13a.5.5 0 0 0-.708-.708l-13 13a.5.5 0 0 0 .708.708ZM4 1a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 4 1Zm5 11a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 9 12Z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div class="flex items-center mb-3">
                                            <span class="text-4xl font-bold">{{$gateway_added}}</span>
                                            <span class="inline-block ml-2 py-1 px-2 bg-green-500 text-white text-xs rounded-full">100% active</span>
                                        </div>
                                        <div class="relative w-full h-1 mb-2 bg-gray-300 rounded">
                                            <div class="absolute top-0 left-0 h-full bg-purple-500 rounded" style="width: {{$tenant->gateway == 0? 0 :$gateway_added/$tenant->gateway*100}}%"></div>
                                        </div>
                                        <p class="text-xs text-gray-200">{{$tenant->gateway - $gateway_added == 0? 'All slots occupied.': $tenant->gateway - $gateway_added.' slots available.'}} Total {{$tenant->gateway}} slots.</p>
                                    </div>
                                </div>

                                <div class="w-full lg:w-1/2 tp-4">
                                    <div class="p-6 bg-white shadow rounded">
                                        <div class="flex mb-3 items-center justify-between">
                                            <h3 class="text-gray-500">Temperature Sensors</h3>
                                            <button class="focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" class="h-4 w-4 text-gray-200"
                                                     viewbox="0 0 16 16">
                                                    <path d="m1.854 14.854 13-13a.5.5 0 0 0-.708-.708l-13 13a.5.5 0 0 0 .708.708ZM4 1a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 4 1Zm5 11a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 9 12Z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div class="flex items-center mb-3">
                                            <span class="text-4xl font-bold">{{$sensor_added}}</span>
                                            <span class="inline-block ml-2 py-1 px-2 bg-green-500 text-white text-xs rounded-full">{{$sensor_added == 0? 0 : round(($sensor_added - $inactive_sensors)/$sensor_added*100, 2)}}% active</span>
                                        </div>
                                        <div class="relative w-full h-1 mb-2 bg-gray-300 rounded">
                                            <div class="absolute top-0 left-0 h-full bg-purple-500 rounded" style="width: {{$tenant->sensor == 0? 0 :$sensor_added/$tenant->sensor*100}}%"></div>
                                        </div>
                                        <p class="text-xs text-gray-200">{{$tenant->sensor - $sensor_added == 0? 'All slots occupied.': $tenant->sensor - $sensor_added.' slots available.'}}  Total {{$tenant->sensor}} slots.</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="w-full md:w-1/2 tpx-4 mb-4 md:mb-0">
                    <section class="py-4">
                        <div class=" tpx-4 mx-auto">
                            <div class="flex flex-wrap -mx-4">

                                <div class="w-full lg:w-1/3 px-4">
                                    <div class="pb-8 px-6 bg-white shadow rounded pt-4">
                                        <h3 class="font-bold mb-3 text-lg">Temperature Status</h3>
                                        <div class="flex items-center mb-3">
                                            <div class="flex items-center">
                                                <span class="mr-2">
                                                <svg class="text-green-500" width="16" height="16" viewbox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg"><path opacity="0.4"
                                                                  d="M8 16C12.4183 16 16 12.4183 16 8H8V16Z"
                                                                  fill="currentColor"></path><path
                                d="M0 8C0 12.4183 3.58172 16 8 16V0C3.58172 0 0 3.58172 0 8Z"
                                fill="currentColor"></path></svg></span>
                                                <span class="text-xs text-gray-500">Normal</span>
                                            </div>
                                            <div class="ml-auto">
                                                <span class="text-xs">{{$sensor_added - $temperature_status['critical'] - $temperature_status['warning']}}</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center mb-3">
                                            <div class="flex items-center">
                                                <span class="mr-2">
                                                <svg class="text-orange-400" width="16" height="16" viewbox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg"><path opacity="0.4"
                                                                  d="M8 16C12.4183 16 16 12.4183 16 8H8V16Z"
                                                                  fill="currentColor"></path><path
                                d="M0 8C0 12.4183 3.58172 16 8 16V0C3.58172 0 0 3.58172 0 8Z"
                                fill="currentColor"></path></svg></span>
                                                <span class="text-xs text-gray-500">Warning</span>
                                            </div>
                                            <div class="ml-auto">
                                                <span class="text-xs">{{$temperature_status['warning']}}</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center">
                                            <div class="flex items-center">
                                                <span class="mr-2">
                                                <svg class="text-red-500" width="16" height="16" viewbox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg"><path opacity="0.4"
                                                                  d="M8 16C12.4183 16 16 12.4183 16 8H8V16Z"
                                                                  fill="currentColor"></path><path
                                d="M0 8C0 12.4183 3.58172 16 8 16V0C3.58172 0 0 3.58172 0 8Z"
                                fill="currentColor"></path></svg></span>
                                                <span class="text-xs text-gray-500">Critical</span>
                                            </div>
                                            <div class="ml-auto">
                                                <span class="text-xs">{{$temperature_status['critical']}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full lg:w-1/3 px-4">
                                    <div class="pb-8 px-6 bg-white shadow rounded pt-4">
                                        <h3 class="font-bold mb-3 text-lg">Humidity Status</h3>
                                        <div class="flex items-center mb-3">
                                            <div class="flex items-center">
                                                <span class="mr-2">
                                                    <svg class="text-green-500" width="16" height="16" viewbox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg"><path opacity="0.4"
                                                                  d="M8 16C12.4183 16 16 12.4183 16 8H8V16Z"
                                                                  fill="currentColor"></path><path
                                d="M0 8C0 12.4183 3.58172 16 8 16V0C3.58172 0 0 3.58172 0 8Z"
                                fill="currentColor"></path></svg></span>
                                                <span class="text-xs text-gray-500">Normal</span>
                                            </div>
                                            <div class="ml-auto">
                                                <span class="text-xs">{{$sensor_added - $humidity_status['critical'] - $humidity_status['warning']}}</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center mb-3">
                                            <div class="flex items-center">
                                                <span class="mr-2">
                                                    <svg class="text-orange-400" width="16" height="16" viewbox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg"><path opacity="0.4"
                                                                  d="M8 16C12.4183 16 16 12.4183 16 8H8V16Z"
                                                                  fill="currentColor"></path><path
                                d="M0 8C0 12.4183 3.58172 16 8 16V0C3.58172 0 0 3.58172 0 8Z"
                                fill="currentColor"></path></svg></span>
                                                <span class="text-xs text-gray-500">Warning</span>
                                            </div>
                                            <div class="ml-auto">
                                                <span class="text-xs">{{$humidity_status['warning']}}</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center">
                                            <div class="flex items-center">
                                                <span class="mr-2">
                                                    <svg class="text-red-500" width="16" height="16" viewbox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg"><path opacity="0.4"
                                                                  d="M8 16C12.4183 16 16 12.4183 16 8H8V16Z"
                                                                  fill="currentColor"></path><path
                                d="M0 8C0 12.4183 3.58172 16 8 16V0C3.58172 0 0 3.58172 0 8Z"
                                fill="currentColor"></path></svg></span>
                                                <span class="text-xs text-gray-500">Critical</span>
                                            </div>
                                            <div class="ml-auto">
                                                <span class="text-xs">{{$humidity_status['critical']}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full lg:w-1/3 px-4">
                                    <div class="pb-8 px-6 bg-white shadow rounded pt-4">
                                        <h3 class="font-bold mb-3 text-lg">Battery Status</h3>
                                        <div class="flex items-center mb-3">
                                            <div class="flex items-center">
                                                <span class="mr-2">
                                                    <svg class="text-green-500" width="16" height="16" viewbox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg"><path opacity="0.4"
                                                                  d="M8 16C12.4183 16 16 12.4183 16 8H8V16Z"
                                                                  fill="currentColor"></path><path
                                d="M0 8C0 12.4183 3.58172 16 8 16V0C3.58172 0 0 3.58172 0 8Z"
                                fill="currentColor"></path></svg></span>
                                                <span class="text-xs text-gray-500">Good</span>
                                            </div>
                                            <div class="ml-auto">
                                                <span class="text-xs">{{$sensor_added - $voltage_status['critical'] - $voltage_status['warning']}}</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center mb-3">
                                            <div class="flex items-center">
                                                <span class="mr-2">
                                                    <svg class="text-lightGray-500" width="16" height="16" viewbox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg"><path opacity="0.4"
                                                                  d="M8 16C12.4183 16 16 12.4183 16 8H8V16Z"
                                                                  fill="currentColor"></path><path
                                d="M0 8C0 12.4183 3.58172 16 8 16V0C3.58172 0 0 3.58172 0 8Z"
                                fill="currentColor"></path></svg></span>
                                                <span class="text-xs text-gray-500">Low</span>
                                            </div>
                                            <div class="ml-auto">
                                                <span class="text-xs">{{$voltage_status['warning']}}</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center">
                                            <div class="flex items-center">
                                                <span class="mr-2">
                                                    <svg class="text-red-500" width="16" height="16" viewbox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg"><path opacity="0.4"
                                                                  d="M8 16C12.4183 16 16 12.4183 16 8H8V16Z"
                                                                  fill="currentColor"></path><path
                                d="M0 8C0 12.4183 3.58172 16 8 16V0C3.58172 0 0 3.58172 0 8Z"
                                fill="currentColor"></path></svg></span>
                                                <span class="text-xs text-gray-500">Offline</span>
                                            </div>
                                            <div class="ml-auto">
                                                <span class="text-xs">{{$voltage_status['critical']}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

        <div class="tpx-4 mx-auto">
            <section class="py-8 tpx-4 bg-white shadow rounded">
                <div class="flex flex-wrap items-center">
                    <div class="mb-2 lg:mb-0">
                        <h2 class="mb-1 text-2xl font-bold">Recent Alerts Log</h2>
                    </div>
                    <div class="w-full lg:w-auto lg:ml-auto mb-2 lg:mb-0 me-3">
                        <div class="flex items-center lg:justify-end">
                            <label class="mr-3 text-sm text-gray-500" for="from-date">From</label>
                            <input type="date" class="form-control" id="from-date" onchange="fetchLogData()"/>
                            <label class="mx-3 text-sm text-gray-500" for="to-date">to</label>
                            <input type="date" class="form-control" id="to-date" onchange="fetchLogData()"/>
                        </div>
                    </div>
                    <a class="flex items-center py-2 tpx-4 rounded bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium mb-2"
                       href="#" id="alert-log-table-export-csv">
                        <span class="inline-block mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="h-3 text-white w-4" viewbox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"></path>
                              </svg></span>
                        <span>Export CSV</span>
                    </a>
                </div>
            </section>
        </div>

        <section class="py-1 pb-8">
            <div class="tpx-4 mx-auto">
                <div class="tp-4 mb-6 bg-white shadow rounded overflow-x-auto">
                    <table class="table-auto w-full pt-3" id="alert-log-table">
                        <thead>
                        <tr class="text-xs text-gray-500 text-left">
                            <th class="ps-4 pb-3 font-medium" >Date Sent</th>
                            <th class="pb-3 font-medium ps-4">Type</th>
                            <th class="pb-3 font-medium">To</th>
                            <th class="pb-3 font-medium w-50">Message</th>
                        </tr>
                        </thead>
                        <tbody id="alert-log-table-body">
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
@endsection

@section('javascript')
    <script src="{{ asset('vendor/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/datatable/datatables.min.js') }}"></script>
    <script>
        var csvData = '';
        var tableData = '';

        function fetchLogData(){
            $.ajax({
                url: '{{env('MIX_IOT_APP_URL', '')}}/iot-service/v1/{{tenant('id')}}/utilizations?from=' + $("#from-date").val() + '&to=' + $("#to-date").val(),
                method: 'GET',
                success: function(res) {
                    csvData = '';
                    tableData = '';
                    $("#alert-log-table").dataTable().fnDestroy();
                    res.forEach(function (element) {
                        csvData += '\n' + element.created_at + ',' + element.type + ',' + element.to_address + ',' + element.content.replaceAll("\n", " ");
                        tableData += '<tr class="text-xs bg-gray-50">\
                                            <td class="tpy-5 px-6 font-medium">'+ element.created_at +'</td>\
                                            <td class="flex tpy-5 px-6 text-uppercase">\
                                                    '+ element.type +'\
                                            </td>\
                                            <td class="font-medium px-2">'+ element.to_address +'</td>\
                                            <td class="font-medium px-2">'+ element.content +'\
                                            </td>\
                                        </tr>';
                    });
                    $("#alert-log-table-body").html(tableData);
                    $("#alert-log-table").dataTable({
                        "bDestroy": true
                    });
                }
            });
        }

        function exportTableToCSV(filename) {
            // Grab text from table into CSV formatted string
            let header = "Date Sent, Type, To, Message";

            // Data URI
            const csvString = 'data:application/csv;charset=utf-8,' + encodeURIComponent(header + csvData) ;
            $(this).attr({ 'download': filename, 'href': csvString, 'target': '_blank' });
        }

        // This must be a hyperlink
        $("#alert-log-table-export-csv").on('click', function (e) {
            exportTableToCSV.apply(this, ['alert_logs.csv']);
        })

        $(document).ready(function(){
            // set date range for recent alarm logs
            let today = new Date();
            let start = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + '01';
            let end = today.getFullYear() + '-' + (today.getMonth() + 2) + '-' + '01';
            if(today.getMonth() === 11){
                end = (today.getFullYear() + 1) + '-' + '01' + '-' + '01';
            }
            $("#from-date").val(start);
            $("#to-date").val(end);

            fetchLogData();
        });
    </script>
@stop

@section('css')
    <link rel="stylesheet" href="{{ asset('vendor/datatable/datatables.min.css') }}">
@stop