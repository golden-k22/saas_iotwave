<div x-show="mobileMenuOpen" x-transition:enter="duration-300 ease-out scale-100" x-transition:enter-start="opacity-50 scale-110" x-transition:enter-end="opacity-100 scale-100" x-transition:leave="transition duration-75 ease-in scale-100" x-transition:leave-start="opacity-100 scale-100" x-transition:leave-end="opacity-0 scale-100" class="absolute inset-x-0 top-0 transition origin-top transform md:hidden">
    <div class="rounded-lg shadow-lg">
        <div class="bg-white divide-y-2 rounded-lg shadow-xs divide-gray-50">
            <div class="px-8 pt-6 pb-8 space-y-6">
                <div class="flex items-center justify-between mt-1">
                    <div>
                        <svg viewBox="0 0 159 140" class="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient x1="27.743%" y1="20.907%" x2="82.132%" y2="59.652%" id="a">
                                    <stop stop-color="#0535AB" offset="0%" />
                                    <stop stop-color="#0539AE" stop-opacity=".93" offset="12%" />
                                    <stop stop-color="#0642B5" stop-opacity=".73" offset="35%" />
                                    <stop stop-color="#0752C1" stop-opacity=".42" offset="65%" />
                                    <stop stop-color="#0867D1" stop-opacity="0" offset="100%" />
                                </linearGradient>
                                <linearGradient x1="36.985%" y1="37.014%" x2="61.742%" y2="55.707%" id="b">
                                    <stop stop-color="#0867D1" offset="0%" />
                                    <stop stop-color="#096DD4" stop-opacity=".94" offset="10%" />
                                    <stop stop-color="#0B7CDB" stop-opacity=".78" offset="29%" />
                                    <stop stop-color="#0E96E6" stop-opacity=".52" offset="55%" />
                                    <stop stop-color="#12B8F6" stop-opacity=".17" offset="86%" />
                                    <stop stop-color="#14C9FE" stop-opacity="0" offset="100%" />
                                </linearGradient>
                            </defs>
                            <g fill-rule="nonzero" fill="none">
                                <path d="M86.24 56.02l3.49-3c30.11-25.54 60.59-31.2 66.26-12.82 5.76 30.19-38.94 34.48-69.75 15.82z" fill="#0535AB" />
                                <path d="M155.84 39.34c.06.29.11.59.15.88 4 27.35-36.74 29.53-69.76 15.78C43.53 38.21 46.8-17.51 21.94 6.13c0 0-15.19 15.15-20.3 40.44a74.25 74.25 0 001.15 32.77v.05c.07.29.14.57.22.86v.08c.6 2.31 1.32 4.58 2.13 6.82A79.07 79.07 0 00131.44 120c22.992-19.942 32.483-51.318 24.4-80.66z" fill="#0069FF" />
                                <path d="M157.48 74.06a78.71 78.71 0 01-26 45.94c-23.42 18.4-63.78.23-82.84-33.71C61.4 77.65 74.82 65.81 86.26 56c33.12 13.51 73.77 11.57 69.76-15.78 0-.28-.09-.57-.14-.85a78.62 78.62 0 011.6 34.69z" fill="url(#a)" />
                                <path d="M131.46 120.02A79.07 79.07 0 015.15 87.17c-.81-2.24-1.53-4.51-2.13-6.82v-.08c-.08-.29-.15-.57-.22-.86v-.07c-3.91-17.82 25.19-32.57 44.56 4.6.41.79.84 1.57 1.27 2.35 19.05 33.96 59.4 52.13 82.83 33.73z" fill="#14C9FE" />
                                <path d="M131.46 120.02A79.07 79.07 0 015.15 87.17c7.48 17.59 24.75 11.8 43.46-.86 19.07 33.94 59.43 52.11 82.85 33.71z" fill="url(#b)" opacity=".3" style="mix-blend-mode:multiply" />
                            </g>
                        </svg>
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
                        <a href="#" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Gateway Settings
                            </div>
                        </a>
                        <a href="#" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Group Settings
                            </div>
                        </a>
                        <a href="#" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Device Settings
                            </div>
                        </a>
                        <a href="#" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Real-time Monitoring
                            </div>
                        </a>
                        <a href="#" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Reports
                            </div>
                        </a>
                        <a href="#" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Temperature Alarms
                            </div>
                        </a>
                        <a href="#" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Humidity Alarms
                            </div>
                        </a>
                        <a href="#" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Voltage Alarms
                            </div>
                        </a>
                        <a href="#" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
                            <svg class="flex-shrink-0 w-6 h-6 ml-0.5 text-wave-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <div class="text-base font-medium leading-6 text-gray-900">
                                Security Alarms
                            </div>
                        </a>
                        <a href="#" class="flex items-center px-8 py-3 space-x-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50">
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
