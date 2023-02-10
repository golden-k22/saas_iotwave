<div x-show="mobileMenuOpen" x-transition:enter="duration-300 ease-out scale-100" x-transition:enter-start="opacity-50 scale-110" x-transition:enter-end="opacity-100 scale-100" x-transition:leave="transition duration-75 ease-in scale-100" x-transition:leave-start="opacity-100 scale-100" x-transition:leave-end="opacity-0 scale-100" class="absolute inset-x-0 top-0 transition origin-top transform md:hidden">
    <div class="rounded-lg shadow-lg">
        <div class="bg-white divide-y-2 rounded-lg shadow-xs divide-gray-50">
            <div class="px-8 pt-6 pb-8 space-y-6">
                <div class="flex items-center justify-between mt-1">
                    <div>
                    @if(Voyager::image(theme('logo')))
                        <img class="h-9" src="{{ Voyager::image(theme('logo')) }}" alt="Company name">
					@endif
                    </div>
                    <div class="-mr-2">
                        <button @click="mobileMenuOpen = false" type="button" class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500">
                            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div>
                    <nav class="grid row-gap-8">
                        <a href="{{ route('tenancy.dashboard', tenant('id')) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Dashboard
                            </div>
                        </a>
                        <a href="{{ route('tenancy.users.index', tenant('id')) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Users
                            </div>
                        </a>
                        <a href="{{ route('tenancy.basic.gateway', tenant('id')) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Gateway Settings
                            </div>
                        </a>
                        <a href="{{ route('tenancy.basic.group', tenant('id')) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Group Settings
                            </div>
                        </a>
                        <a href="{{ route('tenancy.basic.device', tenant('id')) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Device Settings
                            </div>
                        </a>
                        <a href="{{ route('tenancy.sensors.real', tenant('id')) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Real-time Monitoring
                            </div>
                        </a>
                        <a href="{{ route('tenancy.sensors.report', tenant('id')) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Reports
                            </div>
                        </a>
                        <a href="{{ route('tenancy.alarm.setting', ['tenant'=>tenant('id'), 'section'=>'temperature']) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Temperature Alarms
                            </div>
                        </a>
                        <a href="{{ route('tenancy.alarm.setting', ['tenant'=>tenant('id'), 'section'=>'humidity']) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Humidity Alarms
                            </div>
                        </a>
                        <a href="{{ route('tenancy.alarm.setting', ['tenant'=>tenant('id'), 'section'=>'voltage']) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Voltage Alarms
                            </div>
                        </a>
                        <a href="{{ route('tenancy.alarm.setting', ['tenant'=>tenant('id'), 'section'=>'security']) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Security Alarms
                            </div>
                        </a>
                        <a href="{{ route('tenancy.alarm.record', ['tenant'=>tenant('id')]) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Records
                            </div>
                        </a>
                        <a href="{{ route('tenancy.settings', ['section'=>'plans', tenant('id')]) }}" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Billing
                            </div>
                        </a>
                    </nav>
                </div>
            </div>

        </div>
    </div>
</div>
