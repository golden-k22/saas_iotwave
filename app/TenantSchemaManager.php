<?php

namespace App;

use Stancl\Tenancy\Contracts\TenantWithDatabase;

class TenantSchemaManager extends \Stancl\Tenancy\TenantDatabaseManagers\PostgreSQLSchemaManager
{
    public function deleteDatabase(TenantWithDatabase $tenant): bool
    {
        return true;
    }
}