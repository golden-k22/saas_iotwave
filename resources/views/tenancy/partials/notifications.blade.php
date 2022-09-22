<div id="notification-list" class="relative flex items-center h-full" data-user="{{ Auth::user()->username }}" data-tenant="{{Auth::user()->tenant_id}}"></div>
{{-- Notifications --}}
<script src={{asset('js/notification.js')}}></script>
