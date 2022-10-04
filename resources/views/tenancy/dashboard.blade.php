@extends('tenancy.layouts.app')

@section('content')
    <div class="-mx-5 px-3 pb-5">
        <div class="py-8 bg-white">
            <div class="tpx-4 mx-auto">
                <h2 class="text-2xl font-bold" contenteditable="false">Good Afternoon, {{auth()->user()->name}} 👋</h2>
                <div>
                    <p class="text-sm text-gray-500 font-medium">
                        <span>Last login:</span>
                        <span class="text-indigo-500">30 September, 2022, Friday, 2:15 PM</span>
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
                                                <p class="text-sm">Plan Name</p>
                                            </td>
                                            <td class="pr-6">
                                                <div class="flex">
                                                    <span class="inline-block py-1 px-2 ml-2 rounded-full text-xs text-white bg-indigo-500">Active</span>
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
                                                <p class="text-sm">20 September, 2022</p>

                                            </td>
                                            <td class="pr-6">
                                                <p class="mb-1 text-xs text-indigo-500 font-medium">Expires in 20 Days
                                                    (30/10/2022)</p>
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
                                fill="none"></path></svg></span>
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
                                            <p class="mb-1 text-xs text-indigo-500 font-medium">90% (900 credits)</p>
                                            <div class="flex">
                                                <div class="relative h-1 w-48 bg-indigo-50 rounded-full">
                                                    <div class="absolute top-0 left-0 h-full w-10/12 bg-indigo-500 rounded-full"></div>
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
                                            <p class="mb-1 text-xs text-indigo-500 font-medium">82% (820 credits)</p>
                                            <div class="flex">
                                                <div class="relative h-1 w-48 bg-indigo-50 rounded-full">
                                                    <div class="absolute top-0 left-0 h-full w-9/12 bg-indigo-500 rounded-full"></div>
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
                                            <span class="text-4xl font-bold">3</span>
                                            <span class="inline-block ml-2 py-1 px-2 bg-green-500 text-white text-xs rounded-full">100% active</span>
                                        </div>
                                        <div class="relative w-full h-1 mb-2 bg-gray-50 rounded">
                                            <div class="absolute top-0 left-0 h-full bg-purple-500 rounded w-full"></div>
                                        </div>
                                        <p class="text-xs text-gray-200">All slots occupied. Total 3 slots.</p>
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
                                            <span class="text-4xl font-bold">80</span>
                                            <span class="inline-block ml-2 py-1 px-2 bg-green-500 text-white text-xs rounded-full">100% active</span>
                                        </div>
                                        <div class="relative w-full h-1 mb-2 bg-gray-100 rounded">
                                            <div class="absolute top-0 left-0 h-full bg-purple-500 rounded w-4/5"></div>
                                        </div>
                                        <p class="text-xs text-gray-200">20 slots available. Total 100 slots.</p>
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
                                                <span class="text-xs">76</span>
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
                                                <span class="text-xs">2</span>
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
                                                <span class="text-xs">1</span>
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
                                                <span class="text-xs">49</span>
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
                                                <span class="text-xs">1</span>
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
                                                <span class="text-xs">$5.350</span>
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
                                                <span class="text-xs">78</span>
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
                                                <span class="text-xs">1</span>
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
                                                <span class="text-xs">1</span>
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
                    <div class="w-full lg:w-auto lg:ml-auto mb-2 lg:mb-0">
                        <div class="flex items-center lg:justify-end">
                            <label class="mr-3 text-sm text-gray-500" for="">From</label>
                            <div class="flex p-2 pl-4 pr-2 bg-white border rounded">
                                <span class="inline-block mr-2">
                <svg width="14" height="14" viewbox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path
                            d="M11.6666 1.66667H10.3333V1C10.3333 0.82319 10.263 0.65362 10.138 0.528596C10.013 0.403572 9.8434 0.333334 9.66659 0.333334C9.48977 0.333334 9.32021 0.403572 9.19518 0.528596C9.07016 0.65362 8.99992 0.82319 8.99992 1V1.66667H4.99992V1C4.99992 0.82319 4.92968 0.65362 4.80466 0.528596C4.67963 0.403572 4.51006 0.333334 4.33325 0.333334C4.15644 0.333334 3.98687 0.403572 3.86185 0.528596C3.73682 0.65362 3.66659 0.82319 3.66659 1V1.66667H2.33325C1.80282 1.66667 1.29411 1.87738 0.919038 2.25245C0.543966 2.62753 0.333252 3.13623 0.333252 3.66667V11.6667C0.333252 12.1971 0.543966 12.7058 0.919038 13.0809C1.29411 13.456 1.80282 13.6667 2.33325 13.6667H11.6666C12.197 13.6667 12.7057 13.456 13.0808 13.0809C13.4559 12.7058 13.6666 12.1971 13.6666 11.6667V3.66667C13.6666 3.13623 13.4559 2.62753 13.0808 2.25245C12.7057 1.87738 12.197 1.66667 11.6666 1.66667ZM12.3333 11.6667C12.3333 11.8435 12.263 12.013 12.138 12.1381C12.013 12.2631 11.8434 12.3333 11.6666 12.3333H2.33325C2.15644 12.3333 1.98687 12.2631 1.86185 12.1381C1.73682 12.013 1.66659 11.8435 1.66659 11.6667V7H12.3333V11.6667ZM12.3333 5.66667H1.66659V3.66667C1.66659 3.48986 1.73682 3.32029 1.86185 3.19526C1.98687 3.07024 2.15644 3 2.33325 3H3.66659V3.66667C3.66659 3.84348 3.73682 4.01305 3.86185 4.13807C3.98687 4.2631 4.15644 4.33333 4.33325 4.33333C4.51006 4.33333 4.67963 4.2631 4.80466 4.13807C4.92968 4.01305 4.99992 3.84348 4.99992 3.66667V3H8.99992V3.66667C8.99992 3.84348 9.07016 4.01305 9.19518 4.13807C9.32021 4.2631 9.48977 4.33333 9.66659 4.33333C9.8434 4.33333 10.013 4.2631 10.138 4.13807C10.263 4.01305 10.3333 3.84348 10.3333 3.66667V3H11.6666C11.8434 3 12.013 3.07024 12.138 3.19526C12.263 3.32029 12.3333 3.48986 12.3333 3.66667V5.66667Z"
                            fill="#E1E4E8"></path></svg></span>
                                <select class="w-full pr-2 text-xs text-gray-500" name="" id="">
                                    <option value="1">20/04/2021</option>
                                    <option value="1">20/04/2021</option>
                                    <option value="1">20/04/2021</option>
                                    <option value="1">20/04/2021</option>
                                </select>
                            </div>
                            <label class="mx-3 text-sm text-gray-500" for="">to</label>
                            <div class="flex mr-3 p-2 pl-4 pr-2 bg-white border rounded">
                                <span class="inline-block mr-2">
                <svg width="14" height="14" viewbox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path
                            d="M11.6666 1.66667H10.3333V1C10.3333 0.82319 10.263 0.65362 10.138 0.528596C10.013 0.403572 9.8434 0.333334 9.66659 0.333334C9.48977 0.333334 9.32021 0.403572 9.19518 0.528596C9.07016 0.65362 8.99992 0.82319 8.99992 1V1.66667H4.99992V1C4.99992 0.82319 4.92968 0.65362 4.80466 0.528596C4.67963 0.403572 4.51006 0.333334 4.33325 0.333334C4.15644 0.333334 3.98687 0.403572 3.86185 0.528596C3.73682 0.65362 3.66659 0.82319 3.66659 1V1.66667H2.33325C1.80282 1.66667 1.29411 1.87738 0.919038 2.25245C0.543966 2.62753 0.333252 3.13623 0.333252 3.66667V11.6667C0.333252 12.1971 0.543966 12.7058 0.919038 13.0809C1.29411 13.456 1.80282 13.6667 2.33325 13.6667H11.6666C12.197 13.6667 12.7057 13.456 13.0808 13.0809C13.4559 12.7058 13.6666 12.1971 13.6666 11.6667V3.66667C13.6666 3.13623 13.4559 2.62753 13.0808 2.25245C12.7057 1.87738 12.197 1.66667 11.6666 1.66667ZM12.3333 11.6667C12.3333 11.8435 12.263 12.013 12.138 12.1381C12.013 12.2631 11.8434 12.3333 11.6666 12.3333H2.33325C2.15644 12.3333 1.98687 12.2631 1.86185 12.1381C1.73682 12.013 1.66659 11.8435 1.66659 11.6667V7H12.3333V11.6667ZM12.3333 5.66667H1.66659V3.66667C1.66659 3.48986 1.73682 3.32029 1.86185 3.19526C1.98687 3.07024 2.15644 3 2.33325 3H3.66659V3.66667C3.66659 3.84348 3.73682 4.01305 3.86185 4.13807C3.98687 4.2631 4.15644 4.33333 4.33325 4.33333C4.51006 4.33333 4.67963 4.2631 4.80466 4.13807C4.92968 4.01305 4.99992 3.84348 4.99992 3.66667V3H8.99992V3.66667C8.99992 3.84348 9.07016 4.01305 9.19518 4.13807C9.32021 4.2631 9.48977 4.33333 9.66659 4.33333C9.8434 4.33333 10.013 4.2631 10.138 4.13807C10.263 4.01305 10.3333 3.84348 10.3333 3.66667V3H11.6666C11.8434 3 12.013 3.07024 12.138 3.19526C12.263 3.32029 12.3333 3.48986 12.3333 3.66667V5.66667Z"
                            fill="#E1E4E8"></path></svg></span>
                                <select class="w-full pr-2 text-xs text-gray-500" name="" id="">
                                    <option value="1">20/04/2021</option>
                                    <option value="1">20/04/2021</option>
                                    <option value="1">20/04/2021</option>
                                    <option value="1">20/04/2021</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <a class="flex items-center py-2 tpx-4 rounded bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium mb-2"
                       href="#">
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
            <div class=" tpx-4 mx-auto">
                <div class="tp-4 mb-6 bg-white shadow rounded overflow-x-auto">
                    <table class="table-auto w-full">
                        <thead>
                        <tr class="text-xs text-gray-500 text-left">
                            <th class="ps-4 pb-3 font-medium">Date Sent</th>
                            <th class="pb-3 font-medium ps-4">Type</th>
                            <th class="pb-3 font-medium">To</th>
                            <th class="pb-3 font-medium">Message</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-xs bg-gray-50">
                            <td class="tpy-5 px-6 font-medium">09/04/2021</td>
                            <td class="flex tpy-5 px-6">
                                <div>
                                    <p class="font-medium">Email</p>
                                </div>
                            </td>
                            <td class="font-medium">mousultom@protonmail.com</td>
                            <td class="font-medium">Critical(Device SN: 72210503)! Temperature is Low setting value:
                                30.0 current value: 28.8
                            </td>
                        </tr>
                        <tr class="text-xs">
                            <td class="tpy-5 px-6 font-medium">08/04/2021</td>
                            <td class="flex px-6 tpy-5">
                                <div>
                                    <p class="font-medium">Email</p>
                                </div>
                            </td>
                            <td class="font-medium">mousultom@protonmail.com</td>
                            <td class="font-medium">Critical(Device SN: 72210503)! Temperature is Low setting value:
                                30.0 current value: 28.8
                            </td>
                        </tr><!----><!----></tbody>
                    </table>
                </div>
                <div class="flex flex-wrap -mx-4 items-center justify-between">
                    <div class="w-full lg:w-1/3 tpx-4 flex items-center lg:mb-0">
                        <p class="text-xs text-gray-400 pt-2">Show</p>
                        <div class="mx-3 py-2 px-2 text-xs text-gray-500 bg-white border rounded">
                            <select name="" id="">
                                <option value="1">10</option>
                                <option value="1">25</option>
                                <option value="1">50</option>
                                <option value="1">100</option>
                            </select></div>
                        <p class="text-xs text-gray-400 pt-2">of 1200</p>
                    </div>
                    <div class="w-full lg:w-auto tpx-4 flex items-center justify-center">
                        <a class="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 bg-white hover:bg-indigo-50 rounded"
                           href="#">
                            <svg width="6" height="8" viewbox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.53335 3.99999L4.86668 1.66666C5.13335 1.39999 5.13335 0.999992 4.86668 0.733325C4.60002 0.466659 4.20002 0.466659 3.93335 0.733325L1.13335 3.53333C0.866683 3.79999 0.866683 4.19999 1.13335 4.46666L3.93335 7.26666C4.06668 7.39999 4.20002 7.46666 4.40002 7.46666C4.60002 7.46666 4.73335 7.39999 4.86668 7.26666C5.13335 6.99999 5.13335 6.59999 4.86668 6.33333L2.53335 3.99999Z"
                                      fill="#A4AFBB"></path>
                            </svg>
                        </a>
                        <a class="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 bg-white hover:bg-indigo-50 rounded"
                           href="#">1</a>
                        <span class="inline-block mr-3">
                        <svg class="h-3 w-3 text-gray-200" viewbox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path
                          d="M6 0.666687C5.26667 0.666687 4.66667 1.26669 4.66667 2.00002C4.66667 2.73335 5.26667 3.33335 6 3.33335C6.73333 3.33335 7.33333 2.73335 7.33333 2.00002C7.33333 1.26669 6.73333 0.666687 6 0.666687ZM1.33333 0.666687C0.6 0.666687 0 1.26669 0 2.00002C0 2.73335 0.6 3.33335 1.33333 3.33335C2.06667 3.33335 2.66667 2.73335 2.66667 2.00002C2.66667 1.26669 2.06667 0.666687 1.33333 0.666687ZM10.6667 0.666687C9.93333 0.666687 9.33333 1.26669 9.33333 2.00002C9.33333 2.73335 9.93333 3.33335 10.6667 3.33335C11.4 3.33335 12 2.73335 12 2.00002C12 1.26669 11.4 0.666687 10.6667 0.666687Z"
                          fill="currentColor"></path></svg></span>
                        <a class="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs text-white bg-indigo-500 rounded"
                           href="#">12</a><a
                                class="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 bg-white hover:bg-indigo-50 rounded"
                                href="#">13</a><a
                                class="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 bg-white hover:bg-indigo-50 rounded"
                                href="#">14</a>
                        <span class="inline-block mr-3">
                        <svg class="h-3 w-3 text-gray-200" viewbox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path
                          d="M6 0.666687C5.26667 0.666687 4.66667 1.26669 4.66667 2.00002C4.66667 2.73335 5.26667 3.33335 6 3.33335C6.73333 3.33335 7.33333 2.73335 7.33333 2.00002C7.33333 1.26669 6.73333 0.666687 6 0.666687ZM1.33333 0.666687C0.6 0.666687 0 1.26669 0 2.00002C0 2.73335 0.6 3.33335 1.33333 3.33335C2.06667 3.33335 2.66667 2.73335 2.66667 2.00002C2.66667 1.26669 2.06667 0.666687 1.33333 0.666687ZM10.6667 0.666687C9.93333 0.666687 9.33333 1.26669 9.33333 2.00002C9.33333 2.73335 9.93333 3.33335 10.6667 3.33335C11.4 3.33335 12 2.73335 12 2.00002C12 1.26669 11.4 0.666687 10.6667 0.666687Z"
                          fill="currentColor"></path></svg></span>
                        <a class="inline-flex mr-3 items-center justify-center w-8 h-8 text-xs border border-gray-300 bg-white hover:bg-indigo-50 rounded"
                           href="#">62</a>
                        <a class="inline-flex items-center justify-center w-8 h-8 text-xs text-gray-500 border border-gray-300 bg-white hover:bg-indigo-50 rounded"
                           href="#">
                            <svg width="6" height="8" viewbox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.88663 3.52667L2.05996 0.700006C1.99799 0.637521 1.92425 0.587925 1.84301 0.554079C1.76177 0.520233 1.67464 0.502808 1.58663 0.502808C1.49862 0.502808 1.41148 0.520233 1.33024 0.554079C1.249 0.587925 1.17527 0.637521 1.1133 0.700006C0.989128 0.824915 0.919434 0.993883 0.919434 1.17001C0.919434 1.34613 0.989128 1.5151 1.1133 1.64001L3.4733 4.00001L1.1133 6.36001C0.989128 6.48491 0.919434 6.65388 0.919434 6.83001C0.919434 7.00613 0.989128 7.1751 1.1133 7.30001C1.17559 7.36179 1.24947 7.41068 1.33069 7.44385C1.41192 7.47703 1.49889 7.49385 1.58663 7.49334C1.67437 7.49385 1.76134 7.47703 1.84257 7.44385C1.92379 7.41068 1.99767 7.36179 2.05996 7.30001L4.88663 4.47334C4.94911 4.41136 4.99871 4.33763 5.03256 4.25639C5.0664 4.17515 5.08383 4.08801 5.08383 4.00001C5.08383 3.912 5.0664 3.82486 5.03256 3.74362C4.99871 3.66238 4.94911 3.58865 4.88663 3.52667Z"
                                      fill="#A4AFBB"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection